const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const swig = require('swig');
const mongoose = require('mongoose');

// 启动服务器后的数据记录具体事务需要引用的模块
const User = require('./models/User');
const {setClear,userDrop}= require('./components/part0');

//创建web Server
let server = express();

// 设置静态文件托管
server.use('/public',express.static(__dirname+'/public'));

/**
 * 连接 MongoDB 数据库 3 个参数
 * 'mongodb://localhost:27017/blog',
 * {useNewUrlParser: true},
 * callback(err)
 */
// 连接数据库 3 个参数  // mongoose.disconnect(); 断开数据库连接
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true},(err)=>{if(err) console.log(`Connection error... --${new Date()}`);
	else{console.log(`DataBase has connected... --${new Date()}`);
		new Promise((resolve)=>{((User,Sets)=>{if(!(User&&Sets)) return null;
				User.find({},'_id',function(err,doc){if(err) return null;
					Sets = new Set(doc.map(item => item._id));
					resolve(Sets);
				});
			})(User,new Set())}).then(function(data){
			server.listen(8081,()=>{
				console.log('The Plog is running on [port : 8081]...');
			});
			module.exports = data;
			userDrop(User);
			setClear(User);
		});
	}
});

// 配置应用模板


// 定义当前应用所使用的模板引擎 第一个参数表示模板引擎的名称 也是模本引擎的后缀
// 第二个参数是解析处理模板文件的解析函数
server.engine('html',swig.renderFile);
// 第一个参数是 express 的 表示视图层的意思
server.set('views','./views');
// 第二个参数是解析处理模板文件的解析函数参数要与定义的模板引擎的名称一致 第一个参数必须是 view engine
// 你这个引擎模板，想以什么样的方式让用户看到你，回答是我选择 html
server.set('view engine','html');

// 开发时取消缓存,发送错误显示在网页和node中 但不会中断node进程,如果为true则会引发错误中断进程
// autoescape:true/false/js true为html安全转义,js 为js安全转义 false不转义 -非常不建议
swig.setDefaults({cache:false,allowErrors:false,autoescape:true});

// 设置 body-parser 中间件
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true,strict:false}));

//使用session Middleware
server.use(session({
	secret:'secret', //对seesion id 相关的cookies进行签名
	resave:true,
	saveUninitialized:false,	//不保存未初始化的session
	cookie:{
		maxAge:18000000,		//session的有效时间为300分钟
	}
}));

/**
 * 根据不同的功能划分模块
 */
server.use('/admin',require('./routers/admin'));
server.use('/api',require('./routers/api').router);
server.use('/email',require('./routers/email'));
server.use('/',require('./routers/main'));

