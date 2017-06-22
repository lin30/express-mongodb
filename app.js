import express from 'express';
import db from './mongodb/db.js';
import config from 'config-lite';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import history from 'connect-history-api-fallback';
var bodyParser = require('body-parser');

const app = express();

app.all('*', (req, res, next) => {
	// res.header -- aliased as res.set
	// res.header("Access-Control-Allow-Origin", req.headers.origin);
	// res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	// res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	// res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	// res.header("X-Powered-By", 'do not expose yourself!hahaha')
	res.set({
		"Access-Control-Allow-Origin": req.headers.origin,
		"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
		"Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
		"Access-Control-Allow-Credentials": true,
		"X-Powered-By": "don't expose yourself!hahaha",
		"X-Total-Count": "10"
	})
	if (req.method == 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});
// 连接 mongodb
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	name: config.session.name,
	secret: config.session.secret,
	resave: true, // 每次请求都重新设置session cookie
	saveUninitialized: false,
	cookie: config.session.cookie,
	store: new MongoStore({
		url: config.url
	})
}))
// app.use(function (req, res, next) {
// 		var session = req.session
// 		res.cookie('SID', Math.random().toString(36).substr(2), config.session.cookie)
// 		console.log(req.session)
//     next();
// });
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
// 成功打印信息在路由前生效
// app.use(expressWinston.logger({
// 	transports: [
// 		new(winston.transports.Console)({
// 			json: true,
// 			colorize: true
// 		}),
// 		new winston.transports.File({
// 			filename: 'logs/success.log'
// 		})
// 	]
// }));
router(app);
// 错误打印信息在路由后生效
app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true
		}),
		new winston.transports.File({
			filename: 'logs/error.log'
		})
	]
}));


app.use(history());
app.use('/static', express.static('./public'));
app.use((req, res, next) => {
	res.status(404).send('未找到当前路由');
});


app.listen(config.port);