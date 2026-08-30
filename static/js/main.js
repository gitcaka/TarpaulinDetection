import { CAMERAS, CHART_DATA, EVENT_POOL, INITIAL_METRICS, MAP_POINTS } from "./modules/data.js";
import { createCharts } from "./modules/charts.js";
import { createRoadMap } from "./modules/map.js";
import {
  createCameraController,
  createClock,
  createEventFeed,
  createMetrics,
} from "./modules/dashboard.js";

function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) throw new Error(`页面元素不存在: #${id}`);
  return element;
}

function setRuntimeStatus(mapReady) {
  const label = requireElement("runtimeStatusLabel");
  const mapLabel = requireElement("mapStatusLabel");
  label.textContent = "演示数据运行中";
  mapLabel.textContent = mapReady ? "地图在线" : "地图待配置";
  mapLabel.classList.toggle("status-chip--warning", !mapReady);
}

function bootstrapDashboard() {
  const disposables = [];
  const metrics = createMetrics(INITIAL_METRICS);
  disposables.push(metrics);

  disposables.push({
    dispose: createClock(
      requireElement("currentTime"),
      document.body.dataset.timeEndpoint || "",
    ),
  });

  const camera = createCameraController({
    select: requireElement("cameraSelect"),
    video: requireElement("roadVideo"),
    title: requireElement("videoTitle"),
    description: requireElement("videoDescription"),
    badge: requireElement("videoBadge"),
    cameras: CAMERAS,
  });
  disposables.push(camera);

  const feed = createEventFeed(requireElement("riskEvent"), EVENT_POOL, metrics);
  disposables.push(feed);

  const charts = createCharts(CHART_DATA);
  disposables.push(charts);

  const roadMap = createRoadMap({
    containerId: "map",
    fallbackId: "mapFallback",
    points: MAP_POINTS,
    cameras: CAMERAS,
    onCameraSelect: camera.select,
    onRiskRaised(cameraId) {
      camera.markRisk(cameraId);
      metrics.increment("high");
    },
  });
  disposables.push(roadMap);

  setRuntimeStatus(roadMap.ready);
  document.body.classList.add("dashboard-ready");

  window.addEventListener("beforeunload", () => {
    disposables.reverse().forEach((item) => item.dispose());
  }, { once: true });
}

try {
  bootstrapDashboard();
} catch (error) {
  console.error("大屏初始化失败", error);
  const label = document.getElementById("runtimeStatusLabel");
  if (label) label.textContent = "页面初始化异常";
}
