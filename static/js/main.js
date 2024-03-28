//  echarts      #########################################################################
var myChart = echarts.init(document.getElementById('carTypeChart'));
var option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: 0,
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '90%'],
      right: 100,
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 10,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {value: 1048, name: '厢式货车'},
        {value: 735, name: '栏板式货车'},
        {value: 580, name: '平板货车'},
        {value: 484, name: '罐车'},
        {value: 300, name: '公共汽车'},
        {value: 1300, name: '小汽车'}
      ]
    }
  ]
};
option && myChart.setOption(option);

var myChart2 = echarts.init(document.getElementById('riskCountChart'));
var option2 = {
  color: ['#fdf035', '#75b798'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: false,
    data: ['平板式', '栏板式']
  },
  grid: {
    top: 10,
    bottom: 20
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    axisLine: {
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      fontSize: 10
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      fontSize: 10
    }
  },
  series: [
    {
      name: '平板式',
      type: 'line',
      data: [20, 32, 10, 34, 90, 30, 10]
    },
    {
      name: '栏板式',
      type: 'line',
      data: [20, 82, 91, 24, 65, 6, 44]
    }
  ]
};
option2 && myChart2.setOption(option2);


var myChart3 = echarts.init(document.getElementById('myChart3'));
var option3 = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    data: [
      'Direct',
      'Marketing',
      'Search Engine',
      'Email',
      'Union Ads',
      'Video Ads',
      'Baidu',
      'Google',
      'Bing',
      'Others'
    ],
    show: false
  },
  series: [
    {
      type: 'pie',
      radius: [0, '70%'],
      label: {
        position: 'inner',
        fontSize: 9,
      },
      data: [
        {value: 2, name: '车辆类型'},
        {value: 3, name: '篷布条件'},
        {value: 1, name: '道路环境'},
        {value: 1, name: '气候条件'}
      ]
    },
    {
      type: 'pie',
      radius: ['70%', '100%'],
      labelLine: {
        length: 5
      },
      label: {
        formatter: '{b|{b}：}{d}%',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        padding: [1, 1],
        rich: {
          b: {
            color: '#4C5058',
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 15
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [1, 0, 1, 1],
            borderRadius: 4
          }
        }
      },
      data: [
        {value: 0.6, name: '平板式'},
        {value: 0.6, name: '仓栅式'},
        {value: 0.8, name: '其他'},
        {value: 0.6, name: '未覆盖且货物多'},
        {value: 0.9, name: '未覆盖且货物适中'},
        {value: 0.6, name: '未覆盖且货物少'},
        {value: 0.9, name: '覆盖篷布'},
        {value: 1, name: '道路环境'},
        {value: 1, name: '气候条件'}
      ]
    }
  ]
};
option3 && myChart3.setOption(option3);


//   百度地图     #########################################################################
var map = new BMap.Map("map");
map.setMapStyle({style: 'hardedge'})   //地图样式  高端灰风格(grayscale) 强边界风格(hardedge)
map.enableScrollWheelZoom(true);
var point = new BMap.Point(104.081826, 30.664519);
// 浏览器定位
// var geolocation = new BMap.Geolocation();
// geolocation.getCurrentPosition(function (r) {
//     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//         var mk = new BMap.Marker(r.point);
//         map.addOverlay(mk);
//         map.panTo(r.point);
//         point = r.point;
//         // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
//     }
// })

map.centerAndZoom(point, 12);

var traffic = new BMap.TrafficLayer();        // 创建交通流量图层实例
map.addTileLayer(traffic);
var markers = [];
var BASEDATA = [{
  lnglat: [103.937352, 30.698559],
  name: 'G5（京昆高速）成绵段K1768+500（路段）'
}, {
  lnglat: [104.045149, 30.695081],
  name: '四川-SA2-成都二绕东段-三岔湖服务区内4号'
}, {
  lnglat: [104.096891, 30.626241],
  name: 'G4217(蓉昌高速)四川成都蓉昌高速成灌段成都高速运营管理有限公司K14+950上行'
}, {
  lnglat: [104.0394, 30.592922],
  name: ''
}, {
  lnglat: [103.958912, 30.614804],
  name: ''
}, {
  lnglat: [104.117876, 30.575014],
  name: ''
}, {
  lnglat: [104.138573, 30.61008],
  name: ''
}, {
  lnglat: [104.247232, 30.749968],
  name: ''
}, {
  lnglat: [104.192327, 30.771423],
  name: ''
}, {
  lnglat: [104.112702, 30.690678],
  name: ''
}, {
  lnglat: [104.030201, 30.650104],
  name: ''
}
]

BASEDATA.forEach((item, index) => {
  var point1 = new BMap.Point(item.lnglat[0], item.lnglat[1]);
  var point_red = new BMap.Icon("pic/point_red.png", new BMap.Size(32, 32));
  var point_yellow = new BMap.Icon("pic/point_yellow.png", new BMap.Size(32, 32));
  var point_blue = new BMap.Icon("pic/point_blue.png", new BMap.Size(32, 32));
  let r = Math.random();
  if (r <= 0.5) {
    markers.push(new BMap.Marker(point1, {icon: point_blue}));
  } else {
    if (0.5 < r <= 0.8) {
      markers.push(new BMap.Marker(point1, {icon: point_yellow}));
    } else {
      if (r > 0.8) {
        markers.push(new BMap.Marker(point1, {icon: point_red}));
      }
    }
  }
});

var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
