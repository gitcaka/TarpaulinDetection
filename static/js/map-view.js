import { CAMERAS, MAP_POINTS } from "./modules/data.js";
import { createRoadMap } from "./modules/map.js";

const roadMap = createRoadMap({
  containerId: "map",
  fallbackId: "mapFallback",
  points: MAP_POINTS,
  cameras: CAMERAS,
});

window.addEventListener("beforeunload", () => roadMap.dispose(), { once: true });
