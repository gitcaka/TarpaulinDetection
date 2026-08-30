# 高速云眼抛洒风险监测平台

[🚀 在线演示](https://gitcaka.github.io/HighwayVisionDashboard/) · [📦 GitHub 仓库](https://github.com/gitcaka/HighwayVisionDashboard)

一个基于 Flask、原生 ES Modules、ECharts 与百度地图 GL 的智慧交通可视化大屏。项目展示车辆流量、车型分布、风险趋势、道路点位、监控视频和动态风险事件。

> 当前仓库是前端大屏与模拟数据演示，不包含 YOLO/OpenCV 检测模型、视频推理流水线、数据库或真实告警接口。接入真实检测服务时，可用后端 API 或 WebSocket 替换 `static/js/modules/data.js` 和模拟定时器。

## 主要功能

- 三栏自适应监测大屏，支持宽屏、平板和窄屏布局。
- ECharts 车型占比、七日风险趋势和风险因素图表。
- 百度地图 GL 风险点位与摄像头联动；未配置地图 AK 时提供明确降级界面。
- 三路本地演示视频切换，地图点位可联动摄像头。
- 原生 DOM 风险事件流，无 jQuery 和内联业务脚本。
- Flask 应用工厂与环境变量配置，后端保持轻量、无外部 AI 服务依赖。

## 架构

```text
HighwayVisionDashboard/
├── app.py                         # Flask 应用工厂与页面路由
├── templates/
│   ├── main.html                  # 监测大屏语义结构
│   └── map.html                   # 独立全屏地图
├── static/
│   ├── css/main.css               # 设计变量、组件和响应式布局
│   ├── js/main.js                 # 大屏组合入口与生命周期管理
│   ├── js/map-view.js             # 全屏地图入口
│   └── js/modules/
│       ├── data.js                # 演示数据和静态配置
│       ├── dashboard.js           # 时钟、指标、事件流与视频控制器
│       ├── charts.js              # ECharts 创建、缩放与销毁
│       └── map.js                 # 地图点位、降级和事件联动
├── .env.example                   # 环境变量模板
├── .gitignore
├── requirements.txt
└── LICENSE
```

## 本地运行

要求 Python 3.9 或更高版本。

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

打开 [http://127.0.0.1:5000/](http://127.0.0.1:5000/)。

不配置 `.env` 也可以查看除在线地图外的完整演示页面；地图区域会显示配置提示。

## 环境变量

| 变量 | 必填场景 | 说明 |
| --- | --- | --- |
| `BAIDU_MAP_AK` | 使用在线地图 | 百度地图浏览器端 AK，应配置域名白名单 |
真实 `.env` 已被 `.gitignore` 排除。不要把任何访问凭据写入源码、模板或提交记录。

## 后端路由

| 路由 | 说明 |
| --- | --- |
| `/` | 主监测大屏 |
| `/map_view` | 独立全屏地图 |
| `/get_time` | 返回服务器当前时间 |

## 开发说明

- `main.js` 只负责组合模块；各模块通过 `dispose()` 释放定时器、监听器和图表实例。
- 图表使用 `ResizeObserver` 统一响应容器变化，不依赖未声明的全局变量。
- 风险事件卡片使用 DOM API 构造，避免把动态内容拼接为 HTML。
- 演示视频和事件数据来自 `static/pic` 与 `data.js`，不能作为真实检测结果使用。

## GitHub Pages

仓库包含 `.github/workflows/pages.yml`，推送到 `master` 后会自动：

1. 安装 Flask 构建依赖；
2. 使用 `scripts/build_pages.py` 将两个 Jinja 页面导出为静态 HTML；
3. 适配项目站点子路径并上传 Pages 构建产物；
4. 部署到 `https://gitcaka.github.io/HighwayVisionDashboard/`。

在线地图的浏览器 AK 通过仓库 Actions Secret `BAIDU_MAP_AK` 注入。GitHub Pages 只发布静态演示，服务器时间接口会自动切换为浏览器本地时间；本地 Flask 运行方式不变。

## 安全提示

如果密钥曾被提交到 Git，单纯从当前文件删除并不能让旧密钥恢复安全：必须在对应平台控制台撤销或轮换密钥，并视仓库公开范围决定是否清理 Git 历史。

## License

[MIT](LICENSE)
