FROM brucezylin/python:1.0
WORKDIR /root/passenger
COPY . .
RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
CMD python3 app.py
