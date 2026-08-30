import { pickRandom } from "./data.js";

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = String(value);
}

export function createClock(element) {
  let clock = new Date();

  const render = () => {
    element.textContent = clock.toLocaleTimeString("zh-CN", { hour12: false });
  };

  const synchronize = async () => {
    try {
      const response = await fetch("/get_time", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const { time } = await response.json();
      const [hours, minutes, seconds] = time.split(":").map(Number);
      clock = new Date();
      clock.setHours(hours, minutes, seconds, 0);
      render();
    } catch (error) {
      console.warn("服务器时间同步失败，使用浏览器时间", error);
      clock = new Date();
    }
  };

  synchronize();
  const tickTimer = window.setInterval(() => {
    clock = new Date(clock.getTime() + 1000);
    render();
  }, 1000);
  const syncTimer = window.setInterval(synchronize, 60000);

  return () => {
    window.clearInterval(tickTimer);
    window.clearInterval(syncTimer);
  };
}

export function createMetrics(initialState) {
  const state = { ...initialState };
  const render = () => {
    setText("totalNum", state.total);
    setText("highRiskNum", state.high);
    setText("mediumRiskNum", state.medium);
    setText("lowRiskNum", state.low);
  };

  const increment = (key, amount = 1) => {
    if (!(key in state)) return;
    state[key] += amount;
    render();
  };

  render();
  const timers = [
    window.setInterval(() => increment("total"), 1200),
    window.setInterval(() => Math.random() < 0.35 && increment("low"), 1800),
  ];

  return {
    increment,
    dispose() { timers.forEach((timer) => window.clearInterval(timer)); },
  };
}

function iconButton(icon, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "event-action";
  button.setAttribute("aria-label", label);

  const image = document.createElement("img");
  image.src = icon;
  image.alt = "";
  button.append(image);
  return button;
}

function createEventCard(pool) {
  const vehicle = pickRandom(pool.vehicles);
  const event = pickRandom(pool.events);
  const location = pickRandom(pool.locations);
  const snapshot = pickRandom(pool.images);

  const card = document.createElement("article");
  card.className = `event-card event-card--${event.level} event-card--enter`;
  card.dataset.level = event.level;

  const header = document.createElement("header");
  header.className = "event-card__header";

  const vehicleMeta = document.createElement("div");
  vehicleMeta.className = "event-card__vehicle";
  const vehicleImage = document.createElement("img");
  vehicleImage.src = vehicle.image;
  vehicleImage.alt = "";
  vehicleImage.style.backgroundColor = vehicle.color;
  const vehicleName = document.createElement("span");
  vehicleName.textContent = vehicle.name;
  vehicleMeta.append(vehicleImage, vehicleName);

  const actions = document.createElement("div");
  actions.className = "event-card__actions";
  actions.append(
    iconButton("/pic/location.png", "定位事件"),
    iconButton("/pic/save.png", "保存事件"),
    iconButton("/pic/jump.png", "查看详情"),
  );
  header.append(vehicleMeta, actions);

  const body = document.createElement("div");
  body.className = "event-card__body";
  const image = document.createElement("img");
  image.className = "event-card__snapshot";
  image.src = snapshot;
  image.alt = `${event.title}抓拍画面`;

  const copy = document.createElement("div");
  copy.className = "event-card__copy";
  const level = document.createElement("span");
  level.className = "event-card__level";
  level.textContent = event.label;
  const title = document.createElement("strong");
  title.textContent = event.title;
  const place = document.createElement("p");
  place.textContent = location;
  const time = document.createElement("time");
  time.textContent = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  copy.append(level, title, place, time);
  body.append(image, copy);
  card.append(header, body);

  return { card, level: event.level };
}

export function createEventFeed(container, pool, metrics) {
  const addEvent = (animate = true) => {
    const { card, level } = createEventCard(pool);
    if (!animate) card.classList.remove("event-card--enter");
    container.prepend(card);

    if (animate) {
      window.requestAnimationFrame(() => card.classList.remove("event-card--enter"));
      metrics.increment(level);
    }

    const cards = [...container.querySelectorAll(".event-card")];
    cards.slice(6).forEach((oldCard) => {
      oldCard.classList.add("event-card--leave");
      window.setTimeout(() => oldCard.remove(), 300);
    });
  };

  for (let index = 0; index < 4; index += 1) addEvent(false);
  const timer = window.setInterval(() => addEvent(true), 3000);

  return { dispose() { window.clearInterval(timer); } };
}

export function createCameraController({ select, video, title, description, badge, cameras }) {
  const cameraById = new Map(cameras.map((camera) => [camera.id, camera]));
  let selectedId = null;

  const selectCamera = (cameraId, { risk = false } = {}) => {
    const camera = cameraById.get(cameraId);
    if (!camera) return;

    if (selectedId !== cameraId) {
      selectedId = cameraId;
      select.value = cameraId;
      video.src = camera.video;
      video.load();
      video.play().catch(() => {});
    }

    title.textContent = risk ? `${camera.title} · 高风险` : camera.title;
    title.classList.toggle("camera-title--risk", risk);
    description.textContent = camera.description;
    badge.src = camera.badge;
    badge.alt = `${camera.code} 路段标识`;
  };

  const onChange = () => selectCamera(select.value);
  select.addEventListener("change", onChange);
  selectCamera(cameras[0].id);

  return {
    select: selectCamera,
    markRisk(cameraId) { selectCamera(cameraId, { risk: true }); },
    dispose() { select.removeEventListener("change", onChange); },
  };
}
