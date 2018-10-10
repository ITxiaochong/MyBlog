const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	//_id
	_id:Number,
	//用户名
	username:String,
	//密码
	password:String,
	//验证完成时间	默认0值未注册
	ver_time:{type:Number,default:0},
	//验证状态码 	默认0值未验证,1表示已经验证
	reg_status:{type:Number,default:0},
	//注销账号时间
	reg_end: {type:Number,default:0},
	//注册时间
	reg_begin:{type:Number,default:Date.now()},
	//登录状态 		默认0值未登录,1表示已经登录
	log_status:{type:Number,default:0},
},{strict:true});
