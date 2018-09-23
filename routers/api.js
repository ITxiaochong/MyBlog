const express = require('express');
const User = require('../models/User');
let router = express.Router();

/**
 * register
 * 用户名密码不能为空 两次输入密码必须一致 
 */
//统一返回格式
let resData;
resData = {
		code:0,
		message:''
	};

router.post('/user',(req,res,next)=>{
	let user = req.body.user;
	let pass = req.body.pass;
	let repass = req.body.repass;
	//判断用户是否为空
	if(user == ''){
		resData.code =1;
		resData.message = '用户名不能为空'
		res.json(resData);
		return;
	}
	if(pass == ''){
		resData.code = 2;
		resData.message = '密码不能为空';
		res.json(resData);
		return;
	}
	if(repass == ''){
		resData.code = 4;
		resData.message = '请输入确认的密码,该项不能为空！'
		res.json(resData);
		return;
	}
	if(pass != repass){
		resData.code = 3;
		resData.message = '两次输入的密码不一致';
		res.json(resData);
		return;
	}
	User.findOne({
		username:user
	}).then(function(userInfo){
		if(userInfo){
			console.log(userInfo);
			resData.code = 6;
			resData.message = '用户名已经被注册';
			res.json(resData);
			return;
		}
			let user2 = new User({
				username:user,
				password:pass,
				_id:parseInt(Math.random()*999999)
			});
			return user2.save();
	}).then(function(userInfo2){
		res.json(userInfo2);
	});
});
router.post('/user/login',function(req,res){
	let username = req.body.user;
	let password = req.body.pass;
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
module.exports = router;