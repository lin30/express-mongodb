'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';
mongoose.connect(config.url, {server:{auto_reconnect:true}});
mongoose.Promise = global.Promise; // 使用自身 Promise 库
const db = mongoose.connection;
mongoose.set('debug', true);
db.once('open' ,() => {
	console.log('连接数据成功')
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
