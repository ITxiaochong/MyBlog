const express = require('express');
const Cookies = require('cookies');
const bodyParser = require('body-parser');
const swig = require('swig');
const mongoose = require('mongoose');

let server = express();

//设置静态文件托管
server.use('/public',express.static(__dirname+'/public'));


// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true },(err)=>{
	if(err) {
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
		server.listen(8081);
	}
});

//配置应用模板


//定义当前应用所使用的模板引擎 第一个参数表示模板引擎的名称 也是模本引擎的后缀
//第二个参数是解析处理模板文件的解析函数
server.engine('html',swig.renderFile);
//第一个参数是express的 表示视图层的意思
server.set('views','./views');
//第二个参数是解析处理模板文件的解析函数参数要与定义的模板引擎的名称一致 第一个参数必须是view engine
//你这个引擎模板，想以什么样的方式让用户看到你，回答是我选择html
server.set('view engine','html');

//开发时取消缓存
swig.setDefaults({cache:false});

//设置body-parser中间件
server.use(bodyParser.urlencoded({extended:true}));
//设置cookies
server.use(function(req,res,next){
	req.cookies = new Cookies(req,res);
	// req.userInfo = {};
	// if(req.cookies.get('userInfo')){
	// 	try{
	// 		req.userInfo = JSON.parse(req.cookies.get('userInfo'));
	// 	}catch(e){}
	// }
	
	next();
});
/**
 * 根据不同的功能划分模块
 */
server.use('/admin',require('./routers/admin'));
server.use('/api',require('./routers/api'));
server.use('/',require('./routers/main'));

