const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	//覆盖系统_id
	_id:Number,
	//用户名
	username:String,
	//密码
	password:String,
	//验证状态码
	reg_status:{type:Number,default:0},
	//验证完成时间
	ver_time:{type:String,default:'0'},
	//注册时间
	reg_begin:String,
	//注销账号时间
	reg_end:String
},{strict:true});
