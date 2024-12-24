## python 项目启动

### 使用 HTTP 请求交互

windows:

```shell
waitress-serve --port=6174 --threads=3 index:app
```

Mac:

```shell
gunicorn --workers 2 --threads 2 --bind 0.0.0.0:6174 index:app
```
