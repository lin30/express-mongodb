# express + mongodb
## 启动 mongo

```
sudo mkdir -p /data/db
sudo mongod

```

## 连接mongo

```
cd usr/local/bin

(sudo) ./mongo

```

## mongodb 查看命令
```
use elm

show collections

db.sessions.find()

```
## 查看接口

```
http://localhost:8001/users
```

## 接口定义

### GET 
通过 req.query  或者 req.params 获取参数
### POST 

需使用body-parser解析前端传来 Json 参数,此时前端需设置header:
```
  "Content-Type": "application/json"
```
通过 req.body 获取入参