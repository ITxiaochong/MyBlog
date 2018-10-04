const express = require('express');
const parse = require('url').parse;
const users = require('./api').Verify_user;
const {decrypt,encrypt} = require('../components/part0');

let router = express.Router();

let status = 2;	//	1超时 2不存在待验证用户 3成功
let strVal = "var str=document.getElementsByTagName(\"div\")[0].innerHTML.toString(),i=0;document.getElementsByTagName(\"div\")[0].innerHTML=\"\";setTimeout(function(){var a=setInterval(function(){i++;document.getElementsByTagName(\"div\")[0].innerHTML=str.slice(0,i)+\"|\";i==str.length&&(clearInterval(a),document.getElementsByTagName(\"div\")[0].innerHTML=str)},10)},0);\n";

router.use(function(req,res,next){
	let param = parse(req.url,true).query;
	if(req.url == '/') status = 4;//不可能,这辈子都不可能访问嘞 非法进入 status为4
	let email =	param.email;
	let deadline = param.eid;
	try{
		if(users.has(decrypt(email,'Welcome')))
			if(decrypt(deadline,'to U')>new Date().getTime())
				status = 3;
			else
				status = 1;
		else
			status = 2;
	}catch(e){
		status = 4;//非法进入 status为4
	}
	next();
});
router.get('/',function(req,res){
	console.log(status);
	res.render('main/register',{
		status,
		strVal:encrypt(strVal,'Game')
	});
});

module.exports = router;