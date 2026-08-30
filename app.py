"""Flask application factory for the traffic-risk dashboard."""

from __future__ import annotations

import os
from datetime import datetime
from typing import Optional

from dotenv import load_dotenv
from flask import Flask, render_template


WEEKDAYS = ("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日")


def create_app(test_config: Optional[dict] = None) -> Flask:
    """Create and configure the Flask application.

    Secrets are loaded from the process environment (or a local, ignored
    ``.env`` file) and are never assigned in source code.
    """

    load_dotenv()

    app = Flask(__name__, static_folder="static", static_url_path="")
    app.config.from_mapping(
        BAIDU_MAP_AK=os.getenv("BAIDU_MAP_AK", "").strip(),
    )

    if test_config:
        app.config.update(test_config)

    @app.get("/")
    def dashboard():
        return render_template(
            "main.html",
            data={"dayOfWeek": WEEKDAYS[datetime.now().weekday()]},
            baidu_map_ak=app.config["BAIDU_MAP_AK"],
        )

    @app.get("/map_view")
    def map_view():
        return render_template(
            "map.html",
            baidu_map_ak=app.config["BAIDU_MAP_AK"],
        )

    @app.get("/get_time")
    def get_time():
        return {"time": datetime.now().strftime("%H:%M:%S")}

    return app


app = create_app()


if __name__ == "__main__":
    app.run()
