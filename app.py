from flask import Flask, render_template
from datetime import datetime
import os
import qianfan

app = Flask(__name__, static_folder="static", static_url_path='')
os.environ["QIANFAN_ACCESS_KEY"] = "55328311494648ecbf20356becf63090"
os.environ["QIANFAN_SECRET_KEY"] = "7ef1d5f9af0c4e2987c8793a2b4a899d"
chat_comp = qianfan.ChatCompletion()

def chat(content):
    resp = chat_comp.do(model="ERNIE-3.5-128K", messages=[{
        "role": "user",
        "content": content
    }])
    return resp["body"]

@app.route('/')
def hello_world():
    week_list = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
    
    data = {
        'dayOfWeek': week_list[datetime.now().weekday()]
    }
    return render_template('main.html', data=data)

@app.route('/map_view')
def map_view():
    print(111)
    return render_template('map.html')

# 通过 AJAX 获取当前时间的路由
@app.route('/get_time')
def get_time():
    current_time = datetime.now().strftime('%H:%M:%S')
    return {'time': current_time}


if __name__ == '__main__':
    app.run()
