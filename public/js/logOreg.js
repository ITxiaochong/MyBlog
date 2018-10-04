/**
 * Created by Itxiaochong 24/09/2018
 * Origin-version  1.0.0
 * Version 1.0.1	Modify on 26/09/2018
 * Description: 该文件是登录注册及验证的控制控制脚本
 */
/***************************************************/
var log_info = {};
var reg_info = {};
//正常情况下秘钥放数据库中并且加密 由服务器发送到客户端使用
//客户端可以留下解密方法方式,这里只是一个没有过程,都放在了客户端
var reg_model = {
	username:'?红红火火',
	password:'?恍恍惚惚',
	repassword:'我打!'
};
var log_model = {
	username:'?哼哼',
	password:'?哈哈',
	repassword:'我打!'
};
/*
 * [获取用户输入账号和密码内容]
 */
 myinfo_room0.reg_submit.on('click',function(e){
 	if(!this.getAttribute('data-period')) this.setAttribute('data-period',''+new Date().getTime());
 	else if(new Date().getTime() - this.getAttribute('data-period')<1000){
 		this.setAttribute('data-period',''+new Date().getTime());
 		return;
 	}
 	//简写数据
 	var window = myinfo_room0.pop_window;
 	var ep = myinfo_room0.pop_ep;
 	var text = myinfo_room0.pop_text;
 	var user = myinfo_room0.reg_username.val();
 	var pass = myinfo_room0.reg_password.val();
 	var repass = myinfo_room0.reg_repassword.val();
 	if(user&&pass&&repass&&pass.length>5&&user.match(/[a-zA-Z_!@#$%^&*\.]/)&&!V_space(user,pass,repass)&&pass == repass){
 		//	判断是否勾选了checkbox
 		if(false == myinfo_room0.reg_checkbox[0].checked) {
 			window.fadeIn(0);
 			text.html('<span style="font-size:24px;color:#4872a3;"> × </span>勾选欢迎你兄弟');
 			ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
 			window.fadeOut(700);
 			return;
 		}
 		//注册初步格式验证成功 记录数据
 		reg_info.username = encrypt(user,reg_model.username);
 		reg_info.password = encrypt(pass,reg_model.password);
 		reg_info.repassword = encrypt(repass,reg_model.repassword);
		console.log(' √ 请继续完成注册');
		//还原验证条样式
		lr_verify.success = false;
		lr_verify.btn.style.left = 0;
		lr_verify.bg.style.width = 0;
		lr_verify.text.innerHTML = '请拖动滑块进行验证';
		lr_verify.text.style.color = '#fff';
		lr_verify.btn.innerHTML = '| | |';
		lr_verify.btn.style.color = '#666';
		lr_verify.bg.style.background = '#8CDDF8';
		lr_verify.btn.onmousedown = verifyBar;
		//隐藏登录注册页面,显示验证页面
		lr_panel.hide(0)
		lr_panel[2].style.display = 'block';
		lr_panel[2].style.zIndex = '0';
		window.fadeIn(0);
		text.html('<span style="font-size:24px;color:#2BAD2B;"> √ </span>请继续完成注册');
		ep.removeClass('fa-frown-o info-blue').addClass('fa-smile-o info-green');
		window.fadeOut(800);
	}else{//优先提示邮箱格式不正确
		if(!user.match(/[a-zA-Z_!@#$%^&*\.]/)){
			console.log(' × 输入的邮箱格式不正确');
			window.fadeIn(0);
			text.html('<span style="font-size:24px;color:#4872a3;"> × </span>输入的邮箱格式不正确');
			ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
			window.fadeOut(700);
		}else{
			if(!user||!pass||!repass){
				console.log(' × 请填写完整的信息');
				window.fadeIn(0);
				text.html('<span style="font-size:24px;color:#4872a3;"> × </span>请填写完整的信息');
				ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
				window.fadeOut(1000);
			}else if(pass != repass){
				console.log('×两次输入密码必须一致');
				window.fadeIn(0);
				text.html('<span style="font-size:24px;color:#4872a3;"> × </span>两次输入密码必须一致');
				ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
				window.fadeOut(1000);
			}
			else if(pass.length<6){
				console.log('×密码长度至少6位');
				window.fadeIn(0);
				text.html('<span style="font-size:24px;color:#4872a3;">×</span>中等:蓝色 最佳:绿色');
				ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
				window.fadeOut(1300);
			}else if(V_space(pass,repass)){
				console.log(' × 输入的信息中含有空格');
				window.fadeIn(0);
				text.html('<span style="font-size:24px;color:#4872a3;"> × </span>输入的信息中含有空格');
				ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
				window.fadeOut(1000);
			}
		}
	}
 	this.setAttribute('data-period',''+new Date().getTime());
});
myinfo_room0.submit.click(function(e){
 	var window = myinfo_room0.pop_window;
	var ep = myinfo_room0.pop_ep;
	var text = myinfo_room0.pop_text;
 	var user = myinfo_room0.username.val();
 	var pass = myinfo_room0.password.val();
	log_info.username = encrypt(user,log_model.username);
	log_info.password = encrypt(pass,log_model.password);
	log_info.repassword = encrypt('',log_model.repassword);
	if(!user||!pass){
		window.fadeIn(0);
		text.html('<span style="font-size:24px;color:#4872a3;"> × </span>用户名或密码为空');
		ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
		window.fadeOut(1000);
		return;
	}else if(V_space(pass)){
		window.fadeIn(0);
		text.html('<span style="font-size:24px;color:#4872a3;"> × </span>密码中含有空格');
		ep.removeClass('fa-smile-o info-green').addClass('fa-frown-o info-blue');
		window.fadeOut(1000);
		return;
	}

	lr_verify.success = false;
	lr_verify.btn.style.left = 0;
	lr_verify.bg.style.width = 0;
	lr_verify.text.innerHTML = '请拖动滑块进行验证';
	lr_verify.text.style.color = '#fff';
	lr_verify.btn.innerHTML = '| | |';
	lr_verify.btn.style.color = '#666';
	lr_verify.bg.style.background = '#8CDDF8';
  	lr_verify.btn.onmousedown = verifyBar;
  	lr_panel.hide(0)
  	lr_panel[2].style.display = 'block';
  	lr_panel[2].style.zIndex = '0';
});
