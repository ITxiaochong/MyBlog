const express = require('express');
const User = require('../models/User');
const {encrypt,generateId,setClear,userDrop}= require('../components/part0');
const sendEmail = require('../components/mail');

let router = express.Router();	//设置express路由

// 启动Server后,延迟获取已存在用户_id Set
let _ids;
setTimeout(function(){_ids = require('../server');},5000);
const Verify_user = new Set();	//每个用户注册后加入待验证
let resData						//统一返回格式
   ,sendNum = [0,0,0]		    //邮箱发送次数计数数组
   ,SEND_MAX = 20;				//单个邮箱的最大发件次数
setInterval(function(){sendNum = [0,0,0];SEND_MAX = 20;},86400000);

//间隔3分钟,设置未验证邮箱的注册用户reg_end
const stopClear = setInterval(setClear,180000,User);
//间隔1 天,删除未验证已注销的用户
const stopUserDrop = setInterval(userDrop,180000,User);

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
	//用户注册判断
	if(username||password||repassword){
		if(!username){
			resData.code = 1;
			resData.message = '用户名不能为空';
			res.json(resData);
			return;
		}else if(!password){
			resData.code = 2;
			resData.message = '密码项不能为空';
			res.json(resData);
			return;
		}else if(password != repassword){
			resData.code = 3;
			resData.message = '密码信息不一致';
			res.json(resData);
			return;
		}
	}else{
		resData.code = 4;
		resData.message = '请填写完整信息';
		res.json(resData);
		return;
	}
	User.findOne({
		username:username,
	}).then(function(userInfo){
		if(userInfo){
			resData.code = 5;
			resData.message = '用户名已经注册';
			res.json(resData);
		return;					//返回undefined --> then(userInfo)
		}
		//没有此用户,为其注册
		let user = new User({
			_id:generateId(_ids),
			username:username,
			password:password,
		});
		return user.save();			//保存用户document,返回Promised对象
	}).then(function(userInfo){
		if(!userInfo) return;
		else{
			resData.code = 0;
			resData.message = '邮件已发送,请于5小时内验证';
			try{
				//选择合适的sender进行发送
				for(let i = 0;i<sendEmail.length;i++){
					if(sendNum[i]<SEND_MAX){
						sendEmail[i]({
							email:encrypt(userInfo.username,'Welcome'),
							eid:encrypt(Date.now()+18000000,'to U')
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
router.post('/user/login',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	if(username==''||password==''){
		resData.code = 1;
		resData.message = '用户名或密码不能为空';
		res.json(resData);
		return;
	}
	//从数据库中查询
	if(username && username.indexOf('@') == -1 && !/[^0-9]+/.test(username)){
		User.findOne({
			_id:username,
			password:password,
		}).then(function(userInfo){
			if(!userInfo){
				//用户不存在
				resData.code = 6;
				resData.message = '用户名或密码错误';
				res.json(resData);
				return;
			}else if(userInfo.reg_status&&!userInfo.reg_end){
				//用户已验证,切且未注销
				resData.code = 7;
				resData.message = '登录 成功';
				User.updateOne({username:username,log_status:0},{$set:{log_status:1}},(err,Sets)=>{
					if(err) console.log(`${username} Login Error --${new Date().toLocaleTimeString()}`);
					else if(Sets.ok&&Sets.n) console.log(`${username} Login --${new Date().toLocaleTimeString()}`);
				});
				//用户登录 成功,为其设置session
				req.session.userName = username;
				res.json(resData);
				return;
			}else if(userInfo.reg_end){
				resData.code = 8;
				resData.message = '此账号已注销'
				res.json(resData);
				return;
			}else{
				resData.code = 9;
				resData.message = '您未进行验证';
				res.json(resData);
				return;
			}

		});
	}else{
		User.findOne({
			username:username,
			password:password,
		}).then(function(userInfo){
			if(!userInfo){
			//用户不存在
			resData.code = 6;
			resData.message = '用户名或密码错误';
			res.json(resData);
			return;
		}else if(userInfo.reg_status&&!userInfo.reg_end){
			//用户已验证,切且未注销
			resData.code = 7;
			resData.message = '登录 成功';
			User.updateOne({username:username,log_status:0},{$set:{log_status:1}},(err,Sets)=>{
					if(err) console.log(`${username} Login Error --${new Date().toLocaleTimeString()}`);
					else if(Sets.ok&&Sets.n) console.log(`${username} Login --${new Date().toLocaleTimeString()}`);
				});
			req.session.userName = username;
			res.json(resData);
			return;
		}else if(userInfo.reg_end){
			resData.code = 8;
			resData.message = '此账号已注销'
			res.json(resData);
			return;
		}else{
			resData.code = 9;
			resData.message = '您未进行验证';
			res.json(resData);
			return;
		}
	});
	}
});
module.exports = {
	router,
	Verify_user
}