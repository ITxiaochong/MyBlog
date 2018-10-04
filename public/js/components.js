/************************************
 * Created by Itxiaochong 23/09/2018
 * Origin-version 1.0.0
 * Updated 2times
 * Version 1.0.1	Modify on 26/09/2018
 * Description: 该文件是用来封装函数的
 ************************************/

/**
 * [事件绑定函数]
 */
/**
 * [verifyBar Function] 次函数用来绑定验证条拖动事件
 * @param  {Function} e [event]
 * @return {undefined}   [undefined]
 */
function verifyBar(e){
	lr_verify.btn.style.transition = '';
	lr_verify.bg.style.transition = '';
	var downX = e.clientX;
	document.onmousemove = function(ev){
		var moveX = ev.clientX;
		var offsetX = moveX - downX;
		if(offsetX > lr_verify.distance){
			offsetX = lr_verify.distance;
		}else if(offsetX < 0){
			offsetX = 0;
		}
		lr_verify.btn.style.left = offsetX+'px';
		lr_verify.bg.style.width = offsetX+'px';
		if(offsetX == lr_verify.distance){
			lr_verify.text.innerHTML = '验证通过';
			lr_verify.text.style.color = '#fff';
			lr_verify.btn.innerHTML = '&radic;';
			lr_verify.btn.style.color = 'green';
			lr_verify.bg.style.background = '#37D230';
			lr_verify.success = true;
			lr_verify.btn.onmousedown = null;
			document.onmousemove = null;
			setTimeout(function(){
				console.log('验证通过');
				//注册发送
				if(myinfo_room0.reg_username.val()){
					console.log('api/user');
					if(reg_info.username){
						for(var index in reg_info)
							reg_info[index] = decrypt(reg_info[index],reg_model[index]);
						sendXhr('post','api/user',reg_info);
						//清空注册框
						reg_info = {};
						myinfo_room0.reg_clear.click();

					}
				}else{
						console.log('api/user/login');
						for(var index in log_info)
							log_info[index] = decrypt(log_info[index],log_model[index]);
						sendXhr('post','api/user/login/',log_info);
						//清空注册框
						log_info = {};
						myinfo_room0.reg_clear.click();
					}
			},100);
		}
	};
	document.onmouseup = function(e){
			if(lr_verify.success) return;
			else{
				lr_verify.btn.style.left = -1+'px';
				lr_verify.bg.style.width = 0;
				lr_verify.btn.style.transition = 'left .6s ease';
				lr_verify.bg.style.transition = 'width .6s ease';
			}
			document.onmousemove = null;
			document.onmouseup = null;
	}
};


/**
 * [sendXhr Function]
 * @param  {String}  method ['post'/'true'字母大小写不敏感]
 * @param  {String}  url    [指定要发送的address]
 * @param  {json}  data   [非标准json]
 * @param  {[Boolean]} async  [默认异步]
 * @return {undefined}         [undefined]
 */
function sendXhr(method,url,data,async=true){
	var data1 = '';
	for(var index in data){
		if(data[index] != null || data[index] != undefined)
			data1 += index+'='+data[index]+'&';
	}
	data1 = data1.substring(0,data1.length-1);
	var xhr = new XMLHttpRequest();
	xhr.timeout = 2000;
	if(method.toLowerCase() == 'post'){
		xhr.open('POST',url,true);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify(data));
	}else{
		console.log(JSON.stringify(data1));
		xhr.open('GET',url+'?'+data1,true);
		xhr.send(null);
	}
	xhr.onreadystatechange = function(event){
		if(this.readyState == 4&&(this.status>=200&&this.status<300||this.status == 304)){
			var window = myinfo_room0.pop_window;
			var ep = myinfo_room0.pop_ep;
			var text = myinfo_room0.pop_text;
			var data = JSON.parse(this.responseText);
			console.log(data);
			// if(data.message)
			window.fadeIn(0);
			text.html('<span style="font-size:24px;color:#2BAD2B;"> √ </span>请继续完成注册');
			ep.removeClass('fa-frown-o info-blue').addClass('fa-smile-o info-green');
			window.fadeOut(800);
		}
	}
}

/**
 * [encrypt decrypt]
 * @param  {String} str   [需要加密-解密的字符串]
 * @param  {String} model [需要加密-解密的模式]
 * @return {String}       [加密后的字符串]
 */
function encrypt(str,model){
	if(!model) var model = '';
	var str = model+'='+str+'='+model;
	return btoa(encodeURIComponent(str));
}
function decrypt(str,model){
	if(!model) var model = '';
	var str = atob(str);
	str = decodeURIComponent(str);
	return str.substring(model.length+1,str.length-model.length-1);
}
/**
 * [V_space Function]
 * 传入任意个字符串,当全部参数都是字符串并且字符串中至少一个含有空格该函数返回true
 * 否者返回false
 */
function V_space(){
	if(arguments.length == 0) return false;
	for(let i = 0;i<arguments.length;i++){
		let res = typeof arguments[i]=='string'?/\s/g.test(arguments[i]):false;
		if(res == true) return true;
	}
	return false;
}
