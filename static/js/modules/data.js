export const INITIAL_METRICS = Object.freeze({
  total: 1913,
  high: 17,
  medium: 45,
  low: 72,
});

export const CHART_DATA = Object.freeze({
  vehicleTypes: [
    { value: 1048, name: "厢式货车" },
    { value: 735, name: "栏板式" },
    { value: 580, name: "平板货车" },
    { value: 484, name: "罐车" },
    { value: 300, name: "公共汽车" },
    { value: 1300, name: "小汽车" },
  ],
  weeklyRisk: {
    labels: ["一", "二", "三", "四", "五", "六", "日"],
    flatbed: [20, 32, 10, 34, 90, 30, 10],
    railed: [20, 82, 91, 24, 65, 6, 44],
  },
  riskFactors: {
    summary: [
      { value: 2, name: "车辆" },
      { value: 3, name: "篷布" },
      { value: 1, name: "道路" },
      { value: 1, name: "气候" },
    ],
    detail: [
      { value: 0.6, name: "平板" },
      { value: 0.6, name: "仓栅" },
      { value: 0.8, name: "其他" },
      { value: 0.6, name: "无盖货多" },
      { value: 0.9, name: "无盖适中" },
      { value: 0.6, name: "无盖少" },
      { value: 0.9, name: "覆盖篷布" },
      { value: 1, name: "道路环境" },
      { value: 1, name: "气候条件" },
    ],
  },
});

export const CAMERAS = Object.freeze([
  {
    id: "g4202",
    code: "G4202",
    title: "G4202 成都绕城高速",
    description: "成都绕城高速西段 K57+350 演示摄像头",
    video: "/pic/test2.mp4",
    badge: "/pic/G4202.png",
    coord: [103.94055, 30.682441],
  },
  {
    id: "g76",
    code: "G76",
    title: "G76 厦蓉高速",
    description: "厦蓉高速成都段演示摄像头",
    video: "/pic/test1.mp4",
    badge: "/pic/G4202.png",
    coord: [104.045149, 30.695081],
  },
  {
    id: "g85",
    code: "G85",
    title: "G85 银昆高速",
    description: "银昆高速成都段演示摄像头",
    video: "/pic/test0.mp4",
    badge: "/pic/G4202.png",
    coord: [103.937352, 30.698559],
  },
]);

export const MAP_POINTS = Object.freeze([
  { coord: [103.937352, 30.698559], cameraId: "g85" },
  { coord: [104.045149, 30.695081], cameraId: "g76" },
  { coord: [103.907636, 30.701695] },
  { coord: [104.0394, 30.592922] },
  { coord: [103.958912, 30.614804] },
  { coord: [104.117876, 30.575014] },
  { coord: [104.138573, 30.61008] },
  { coord: [104.247232, 30.749968] },
  { coord: [104.192327, 30.771423] },
  { coord: [104.112702, 30.690678] },
  { coord: [104.030201, 30.650104] },
]);

export const EVENT_POOL = Object.freeze({
  vehicles: [
    { name: "平板式", image: "/pic/Flatbed.png", color: "#75b798" },
    { name: "栏板式", image: "/pic/Railed.png", color: "#fdf035" },
    { name: "厢式货车", image: "/pic/Flatbed.png", color: "#6fb3e0" },
    { name: "危化品车", image: "/pic/Railed.png", color: "#d15b47" },
  ],
  events: [
    { title: "货车未遮盖篷布", level: "high", label: "高风险" },
    { title: "货物散落 / 抛洒预警", level: "high", label: "高风险" },
    { title: "应急车道违规停车", level: "medium", label: "中风险" },
    { title: "车辆超速行驶", level: "medium", label: "中风险" },
    { title: "非机动车 / 行人误入", level: "high", label: "高风险" },
    { title: "异常低速 / 拥堵预警", level: "low", label: "低风险" },
  ],
  locations: [
    "G4202 成都绕城高速东段 K30+800",
    "G4215 成自泸高速潮河门架",
    "S8 成名高速成温邛段 K33+667",
    "G5 京昆高速成绵段 K1768+500",
    "S2 成巴高速金堂段 K45+200",
    "G42 沪蓉高速成南段 K198+100",
  ],
  images: ["/pic/crop1.jpg", "/pic/crop2.jpg", "/pic/crop3.jpg"],
});

export function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}
