// ================= ECharts 初始化与配置 =================
var chart1 = echarts.init(document.getElementById('carTypeChart'));
var option1 = {
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#bcc9d4' } },
  series: [
    {
      type: 'pie',
      radius: ['50%', '80%'],
      center: ['35%', '50%'], // 偏左放置，给图例留空间
      avoidLabelOverlap: false,
      itemStyle: { borderColor: '#030f26', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' } },
      labelLine: { show: false },
      data: [
        {value: 1048, name: '厢式货车'}, {value: 735, name: '栏板式'},
        {value: 580, name: '平板货车'}, {value: 484, name: '罐车'},
        {value: 300, name: '公共汽车'}, {value: 1300, name: '小汽车'}
      ]
    }
  ]
};
chart1.setOption(option1);

var chart2 = echarts.init(document.getElementById('riskCountChart'));
var option2 = {
  color: ['#fdf035', '#75b798'],
  tooltip: { trigger: 'axis' },
  grid: { top: 20, bottom: 20, left: 30, right: 10 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ["一", "二", "三", "四", "五", "六", "日"],
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
    axisLabel: { color: '#bcc9d4', fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)', type: 'dashed' } },
    axisLabel: { color: '#bcc9d4', fontSize: 10 }
  },
  series: [
    { name: '平板式', type: 'line', smooth: true, data: [20, 32, 10, 34, 90, 30, 10], areaStyle: { opacity: 0.1 } },
    { name: '栏板式', type: 'line', smooth: true, data: [20, 82, 91, 24, 65, 6, 44], areaStyle: { opacity: 0.1 } }
  ]
};
chart2.setOption(option2);

var chart3 = echarts.init(document.getElementById('myChart3'));
var option3 = {
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  series: [
    {
      type: 'pie',
      radius: [0, '45%'],
      label: { position: 'inner', fontSize: 10, color: '#fff' },
      data: [
        {value: 2, name: '车辆'}, {value: 3, name: '篷布'},
        {value: 1, name: '道路'}, {value: 1, name: '气候'}
      ]
    },
    {
      type: 'pie',
      radius: ['55%', '85%'],
      label: { color: '#bcc9d4', fontSize: 10 },
      data: [
        {value: 0.6, name: '平板'}, {value: 0.6, name: '仓栅'}, {value: 0.8, name: '其他'},
        {value: 0.6, name: '无盖货多'}, {value: 0.9, name: '无盖适中'}, {value: 0.6, name: '无盖少'},
        {value: 0.9, name: '覆盖篷布'}, {value: 1, name: '道路环境'}, {value: 1, name: '气候条件'}
      ]
    }
  ]
};
chart3.setOption(option3);

// 监听窗口大小变化，让所有图表自适应缩放 (重要优化！)
window.addEventListener('resize', function() {
    chart1.resize();
    chart2.resize();
    chart3.resize();
});


// ================= 百度地图 GL 初始化 =================
var map = new BMapGL.Map("map");
map.enableScrollWheelZoom(true);
// 改为使用百度官方预设的高级暗色科技主题 midnight (更契合大屏)
map.setMapStyleV2({ styleJson: [{"featureType":"water","elementType":"all","stylers":{"color":"#021019"}},{"featureType":"highway","elementType":"geometry.fill","stylers":{"color":"#000000"}},{"featureType":"highway","elementType":"geometry.stroke","stylers":{"color":"#147a92"}},{"featureType":"arterial","elementType":"geometry.fill","stylers":{"color":"#000000"}},{"featureType":"arterial","elementType":"geometry.stroke","stylers":{"color":"#0b3d51"}},{"featureType":"local","elementType":"geometry","stylers":{"color":"#000000"}},{"featureType":"land","elementType":"all","stylers":{"color":"#08304b"}},{"featureType":"railway","elementType":"geometry.fill","stylers":{"color":"#000000"}},{"featureType":"railway","elementType":"geometry.stroke","stylers":{"color":"#08304b"}},{"featureType":"subway","elementType":"geometry","stylers":{"lightness":-70}},{"featureType":"building","elementType":"geometry.fill","stylers":{"color":"#000000"}},{"featureType":"all","elementType":"labels.text.fill","stylers":{"color":"#857f7f"}},{"featureType":"all","elementType":"labels.text.stroke","stylers":{"color":"#000000"}},{"featureType":"building","elementType":"geometry","stylers":{"color":"#022338"}},{"featureType":"green","elementType":"geometry","stylers":{"color":"#062032"}},{"featureType":"boundary","elementType":"all","stylers":{"color":"#1e1c1c"}},{"featureType":"manmade","elementType":"geometry","stylers":{"color":"#022338"}}] });

var point = new BMapGL.Point(103.939975, 30.682317);
map.centerAndZoom(point, 14);

// 点位初始化 (精简循环代码)
var point_blue = new BMapGL.Icon("pic/point_blue.png", new BMapGL.Size(32, 32));
var point_red = new BMapGL.Icon("pic/point_red.png", new BMapGL.Size(32, 32));

var BASEDATA = [
  [103.937352, 30.698559], [104.045149, 30.695081], [103.907636, 30.701695],
  [104.0394, 30.592922], [103.958912, 30.614804], [104.117876, 30.575014],
  [104.138573, 30.61008], [104.247232, 30.749968], [104.192327, 30.771423],
  [104.112702, 30.690678], [104.030201, 30.650104]
];

BASEDATA.forEach(coord => {
  map.addOverlay(new BMapGL.Marker(new BMapGL.Point(coord[0], coord[1]), {icon: point_blue}));
});

// 模拟事件：7.5秒后变成红点
var dynamicMarker = new BMapGL.Marker(new BMapGL.Point(103.94055, 30.682441), {icon: point_blue});
map.addOverlay(dynamicMarker);
setTimeout(function () {
  map.removeOverlay(dynamicMarker);
  map.addOverlay(new BMapGL.Marker(new BMapGL.Point(103.94055, 30.682441), {icon: point_red}));

  // 模拟线图层变红
  $('#videoTitle').text('G4202成都绕城高速(高风险)').removeClass('text-white').addClass('text-danger fw-bold');
}, 7500);

// 【重要修正】：监听窗口尺寸变化，防止 Echarts 在弹性布局中比例失调
window.addEventListener('resize', function() {
  if(myChart) myChart.resize();
  if(myChart2) myChart2.resize();
  if(myChart3) myChart3.resize();
});