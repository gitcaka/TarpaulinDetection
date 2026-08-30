const MAP_STYLE = [
  { featureType: "water", elementType: "all", stylers: { color: "#061321" } },
  { featureType: "land", elementType: "all", stylers: { color: "#0a2035" } },
  { featureType: "highway", elementType: "geometry.fill", stylers: { color: "#0e3851" } },
  { featureType: "highway", elementType: "geometry.stroke", stylers: { color: "#2f9fbd" } },
  { featureType: "arterial", elementType: "geometry", stylers: { color: "#12334a" } },
  { featureType: "local", elementType: "geometry", stylers: { color: "#10283b" } },
  { featureType: "building", elementType: "geometry", stylers: { color: "#0b1d2e" } },
  { featureType: "green", elementType: "geometry", stylers: { color: "#0d2a2c" } },
  { featureType: "all", elementType: "labels.text.fill", stylers: { color: "#7fa4b8" } },
  { featureType: "all", elementType: "labels.text.stroke", stylers: { color: "#07111d" } },
];

function showFallback(element, message) {
  if (!element) return;
  element.textContent = message;
  element.hidden = false;
}

export function createRoadMap({
  containerId,
  fallbackId,
  points,
  cameras,
  onCameraSelect = () => {},
  onRiskRaised = () => {},
}) {
  const container = document.getElementById(containerId);
  const fallback = document.getElementById(fallbackId);

  if (!container) {
    throw new Error(`地图容器不存在: #${containerId}`);
  }

  if (!window.BMapGL) {
    showFallback(fallback, "地图服务未配置，请在 .env 中设置 BAIDU_MAP_AK");
    return { ready: false, dispose() {} };
  }

  try {
    const map = new window.BMapGL.Map(containerId);
    map.centerAndZoom(new window.BMapGL.Point(103.98, 30.68), 12);
    map.enableScrollWheelZoom(true);
    map.setMapStyleV2({ styleJson: MAP_STYLE });

    const blueIcon = new window.BMapGL.Icon("/pic/point_blue.png", new window.BMapGL.Size(32, 32));
    const redIcon = new window.BMapGL.Icon("/pic/point_red.png", new window.BMapGL.Size(32, 32));

    points.forEach(({ coord, cameraId }) => {
      const marker = new window.BMapGL.Marker(
        new window.BMapGL.Point(coord[0], coord[1]),
        { icon: blueIcon },
      );
      if (cameraId) {
        marker.addEventListener("click", () => onCameraSelect(cameraId));
      }
      map.addOverlay(marker);
    });

    const primaryCamera = cameras[0];
    const riskPoint = new window.BMapGL.Point(primaryCamera.coord[0], primaryCamera.coord[1]);
    let dynamicMarker = new window.BMapGL.Marker(riskPoint, { icon: blueIcon });
    map.addOverlay(dynamicMarker);

    const riskTimer = window.setTimeout(() => {
      map.removeOverlay(dynamicMarker);
      dynamicMarker = new window.BMapGL.Marker(riskPoint, { icon: redIcon });
      map.addOverlay(dynamicMarker);
      onRiskRaised(primaryCamera.id);
    }, 7500);

    if (fallback) fallback.hidden = true;

    return {
      ready: true,
      dispose() {
        window.clearTimeout(riskTimer);
        map.clearOverlays();
      },
    };
  } catch (error) {
    console.error("地图初始化失败", error);
    showFallback(fallback, "地图初始化失败，请检查百度地图 AK 与域名白名单");
    return { ready: false, dispose() {} };
  }
}
