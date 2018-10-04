const express = require('express');
const User = require('../models/User');
const {encrypt,generateId,setClear}= require('../components/part0');
const _ids = require('../server');	//server启动时拿到的已注册的_id [集合]
const sendEmail = require('../components/mail');


let router = express.Router();	//设置express路由

const Verify_user = new Set();	//每个用户注册后加入待验证
let resData						//统一返回格式
   ,sendNum = [0,0,0]		    //邮箱发送次数计数数组
   ,SEND_MAX = 1;				//单个邮箱的最大发件次数

//间隔3分钟,设置未验证邮箱的注册用户reg_end
const stopClear = setInterval(setClear,180000,User);

//每个用户访问api路由后分配的消息对象
router.use(function(req,res,next){
	resData = {
		code:0,
		message:''
	};
	next();
});

/**
 * register
 */
router.post('/user',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	let repassword = req.body.repassword;
	User.findOne({
		username:username,
		reg_end:0
	}).then(function(userInfo){
		// console.log(userInfo);
		if(userInfo){
			resData.code = 1;
			resData.message = '用户名已经注册';
			res.json(resData);
			return;
		}
		//没有此用户,为其注册
		let user = new User({
			_id:generateId(_ids),
			username:username,
			password:password,
			reg_begin:new Date().toLocaleString(),
			reg_end:0
		});
		return user.save();
	}).then(function(userInfo){
		if(!userInfo) return;
		else{
			resData.code = 0;
			resData.message = '注册成功,请在5小时内进行邮件验证';
			try{
				//选择合适的sender进行发送
				for(let i = 0;i<sendEmail.length;i++){
					if(sendNum[i]<SEND_MAX){
						sendEmail[i]({
							email:encrypt(userInfo.username,'Welcome'),
							eid:encrypt(new Date().getTime()+18000000,'to U')
						});
						sendNum[i]++;
						break;
					}else {
						//今天的sender次数到了,不允许再注册
						if(sendNum[sendEmail.length-1] >= SEND_MAX){
							resData.code = 10;
							resData.message = 'Sorry,今天的注册数达到上限';
						}
						continue;
					}
				}
				//记录等待邮箱验证的用户
				Verify_user.add(userInfo.username);
			}catch(e){
				resData.code = 11,
				resData.message = 'Sorry,验证邮件发送服务失败'
			}
			res.json(resData);
		}
	});
});
router.post('/user/login',function(req,res){
	let username = req.body.username;
	let password = req.body.password;
	console.log(username,password);
	console.log('I coming in');
	if(username==''||password==''){
		resData.code = 1;
		resData.message = '用户名或密码不能为空';
		res.json(resData);
		return;
	}
	//从数据库中查询
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		if(!userInfo){
			resData.code = 2;
			resData.message = '用户名或密码错误';
			res.json(resData);
			return;
		}
		//登录成功
		resData.code =0;
		resData.message = '登录成功';
		res.json(resData);
		return;
	});
});
module.exports = {
	router,
	Verify_user
}