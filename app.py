from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__, static_folder="static", static_url_path='')

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
