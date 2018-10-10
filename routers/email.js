const express = require('express');
const parse = require('url').parse;
const User = require('../models/User');
const users = require('./api').Verify_user;
const {decrypt,encrypt} = require('../components/part0');

let router = express.Router();

const finished = new Set();
let status = 2;	//	1超时 2不存在待验证用户 3成功 4非法访问
let strVal = "var str=document.getElementsByTagName(\"div\")[0].innerHTML.toString(),i=0;document.getElementsByTagName(\"div\")[0].innerHTML=\"\";setTimeout(function(){var a=setInterval(function(){i++;document.getElementsByTagName(\"div\")[0].innerHTML=str.slice(0,i)+\"|\";i==str.length&&(clearInterval(a),document.getElementsByTagName(\"div\")[0].innerHTML=str)},10)},0);\n";
router.use(function(req,res,next){
	let param = parse(req.url,true).query;
	let email =	decrypt(param.email,'Welcome');
	let deadline = param.eid;
	try{
		if(req.url == '/')  status = 4;
		else if(finished.has(email)){
			status = 2;
		}else if(users.has(email)){
			if(decrypt(deadline,'to U')>new Date().getTime()){
				status = 3;
				users.delete(email);
				finished.add(email);
				User.updateOne({username:email,ver_time:0},{$set:{ver_time:Date.now(),reg_status:1}},function(err,Sets){
					if(Sets.ok&&Sets.n) console.log(`${email} be Verified Successfully --${new Date().toLocaleString()}`);
				});
			}else {status = 1;}
		}else{
			//存在用户 未验证 未失效
			User.findOne({username:email,ver_time:0,reg_end:0}).then(function(userInfo){
					if(userInfo && userInfo.reg_begin>Date.now()-18000000) return status = 3;
					else if(userInfo) return status = 1;
					else return status = 2;
			}).then(function(status){
				if(status == 3){
					User.updateOne({username:email,ver_time:0},{$set:{ver_time:Date.now(),reg_status:1}},function(err,Sets){
						if(Sets.ok&&Sets.n) console.log(`${email} be Verified Successfully --${new Date().toLocaleString()}`);
					});
				}
			});
		}
	}catch(e){
		status = 4;
	}
	next();
});

//路径处理
router.get('/',function(req,res){
	setTimeout(()=>{
		res.render(	'main/Everify',{
			status,
			strVal:encrypt(strVal,'Game')
		});
	},100);
});

// 非法路径处理
router.get(/^[\\/]*.+$/,function(req,res){
	res.render(	'main/Everify',{
			status:4,
			strVal:encrypt(strVal,'Game')
	});
});
module.exports = router;