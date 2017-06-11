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