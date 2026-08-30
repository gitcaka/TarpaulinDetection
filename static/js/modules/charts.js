const TEXT_COLOR = "#a9bdd4";
const GRID_COLOR = "rgba(111, 211, 255, 0.12)";

function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`图表容器不存在: #${id}`);
  }
  return element;
}

function vehicleTypeOption(data) {
  return {
    color: ["#58e6ff", "#58a6ff", "#8b7dff", "#43d39e", "#ffc857", "#ef6f9a"],
    tooltip: { trigger: "item" },
    legend: {
      orient: "vertical",
      right: 4,
      top: "center",
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: TEXT_COLOR, fontSize: 11 },
    },
    series: [{
      name: "车型",
      type: "pie",
      radius: ["52%", "78%"],
      center: ["34%", "52%"],
      itemStyle: { borderColor: "#071426", borderWidth: 3 },
      label: { show: false },
      emphasis: {
        scaleSize: 6,
        label: { show: true, color: "#ffffff", fontWeight: 700 },
      },
      data,
    }],
  };
}

function weeklyRiskOption(data) {
  const seriesBase = {
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 5,
    areaStyle: { opacity: 0.08 },
  };

  return {
    color: ["#ffc857", "#4de1c1"],
    tooltip: { trigger: "axis" },
    legend: {
      top: 0,
      right: 2,
      itemWidth: 14,
      textStyle: { color: TEXT_COLOR, fontSize: 10 },
    },
    grid: { top: 28, bottom: 22, left: 34, right: 12 },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.labels,
      axisLine: { lineStyle: { color: GRID_COLOR } },
      axisLabel: { color: TEXT_COLOR, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: GRID_COLOR, type: "dashed" } },
      axisLabel: { color: TEXT_COLOR, fontSize: 10 },
    },
    series: [
      { ...seriesBase, name: "平板式", data: data.flatbed },
      { ...seriesBase, name: "栏板式", data: data.railed },
    ],
  };
}

function riskFactorOption(data) {
  return {
    color: ["#f45b69", "#ffc857", "#43d39e", "#58a6ff", "#8b7dff"],
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    series: [
      {
        name: "风险来源",
        type: "pie",
        radius: [0, "43%"],
        label: { position: "inner", color: "#ffffff", fontSize: 10 },
        itemStyle: { borderColor: "#071426", borderWidth: 2 },
        data: data.summary,
      },
      {
        name: "风险细分",
        type: "pie",
        radius: ["55%", "80%"],
        label: { color: TEXT_COLOR, fontSize: 9 },
        labelLine: { length: 7, length2: 4 },
        itemStyle: { borderColor: "#071426", borderWidth: 1 },
        data: data.detail,
      },
    ],
  };
}

export function createCharts(chartData) {
  if (!window.echarts) {
    throw new Error("ECharts 未加载")
  }

  const definitions = [
    ["carTypeChart", vehicleTypeOption(chartData.vehicleTypes)],
    ["riskCountChart", weeklyRiskOption(chartData.weeklyRisk)],
    ["riskFactorChart", riskFactorOption(chartData.riskFactors)],
  ];

  const charts = definitions.map(([id, option]) => {
    const container = requireElement(id);
    const chart = window.echarts.init(container);
    chart.setOption(option);
    return { chart, container };
  });

  const resize = () => charts.forEach(({ chart }) => chart.resize());
  let observer = null;

  if ("ResizeObserver" in window) {
    observer = new ResizeObserver(resize);
    charts.forEach(({ container }) => observer.observe(container));
  } else {
    window.addEventListener("resize", resize);
  }

  return {
    resize,
    dispose() {
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      charts.forEach(({ chart }) => chart.dispose());
    },
  };
}
