"""Build a GitHub Pages-compatible static snapshot of the Flask dashboard."""

from __future__ import annotations

import os
import shutil
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = PROJECT_ROOT / "dist"
sys.path.insert(0, str(PROJECT_ROOT))

from app import create_app  # noqa: E402


def _reset_output_directory() -> None:
    """Recreate only the project-local generated ``dist`` directory."""

    if OUTPUT_DIR.parent != PROJECT_ROOT or OUTPUT_DIR.name != "dist":
        raise RuntimeError("Refusing to reset an unexpected output directory")
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir()


def _render(client, route: str, output: Path, script_name: str) -> None:
    response = client.get(route, environ_overrides={"SCRIPT_NAME": script_name})
    if response.status_code != 200:
        raise RuntimeError(f"Static export failed for {route}: HTTP {response.status_code}")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(response.data)


def build() -> None:
    repository_name = os.getenv("PAGES_BASE_PATH", "HighwayVisionDashboard").strip("/")
    script_name = f"/{repository_name}" if repository_name else ""

    app = create_app(
        {
            "TESTING": True,
            "STATIC_EXPORT": True,
            "BAIDU_MAP_AK": os.getenv("BAIDU_MAP_AK", "").strip(),
        }
    )
    client = app.test_client()

    _reset_output_directory()
    shutil.copytree(PROJECT_ROOT / "static", OUTPUT_DIR, dirs_exist_ok=True)
    _render(client, "/", OUTPUT_DIR / "index.html", script_name)
    _render(client, "/map_view", OUTPUT_DIR / "map_view" / "index.html", script_name)
    (OUTPUT_DIR / ".nojekyll").write_text("", encoding="utf-8")

    print(f"Built GitHub Pages artifact: {OUTPUT_DIR}")
    print(f"Pages base path: {script_name or '/'}")


if __name__ == "__main__":
    build()
