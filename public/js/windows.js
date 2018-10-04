/***************************************************
 * Created by Itxiaochong 24/09/2018
 * Origin-version  1.0.0
 * Updated 2times
 * Version 1.0.1	Modify on 26/09/2018
 * Description: 该文件是Client的窗口控制脚本
 */
/***************************************************/


/**
 * [公共数据 命名空间]
 * @type {[type]}
 */
var lr_icon = $('.lr-panel-icon>span');
var lr_panel = $('.lr-panel');
var myinfo_room0 ={};
var Re_email = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
myinfo_room0.lr_panelBody = $('.lr-panel0-body,.lr-panel1-body,.lr-panel2-body');
myinfo_room0.lr_panel0 = $('.lr-panel0');
myinfo_room0.lr_panel1 = $('.lr-panel1');
myinfo_room0.lr_panel2 = $('.lr-panel2');
myinfo_room0.username = $('#username');
myinfo_room0.password = $('#password');
myinfo_room0.reg_username = $('#reg-username');
myinfo_room0.reg_password = $('#reg-password');
myinfo_room0.reg_repassword = $('input[name="repassword"]');
//reg-body icon
myinfo_room0.reg_right_icon0 = $('.right-icon0');
myinfo_room0.reg_right_icon1 = $('.right-icon1');
myinfo_room0.reg_right_icon2 = $('.right-icon2');
//buttons
myinfo_room0.reg_submit = $('#reg-submit');
myinfo_room0.submit = $('#submit');
myinfo_room0.reg_clear = $('#reg-clear');
myinfo_room0.reg_checkbox = $('input[name="register"]');
myinfo_room0.checkbox = $('input[name="login"]');

//pop-window
myinfo_room0.pop_window = $('#pop-window');
myinfo_room0.pop_ep = $('.pop-ep');
myinfo_room0.pop_text = $('.pop-text');

//lr-verify1/2 拖动/条形验证条
var lr_verify = {};
lr_verify.box2 = document.querySelector('#lr-verify2');
lr_verify.bg = document.querySelector('.slide-bg');
lr_verify.text = document.querySelector('.slide-text');
lr_verify.btn = document.querySelector('.slide-btn');
lr_verify.success = false;
lr_verify.distance = lr_verify.box2.offsetWidth-lr_verify.btn.offsetWidth;

/**
 * [公共数据 命名空间]
 * []
 */



/***************************************************/
/**
 * [logOreg登陆面板头部icon控制]
 */
lr_icon.each(function(index,e){
	e.onclick = function(ev){
		if(e.getAttribute('data-react') == 0){
			if(index == 0) {
				e.classList.add('lr-icon-move0');
				lr_icon[index+1].classList.remove('lr-icon-move1');
			}else{
			 	e.classList.add('lr-icon-move1');
				lr_icon[index-1].classList.remove('lr-icon-move0');
			}
			lr_icon.attr('data-react',0);
			lr_icon.removeClass('lr-icon-click');
			lr_panel.hide(0);
			lr_panel[index].style.display = 'block';
			if(myinfo_room0.reg_username.val()) myinfo_room0.reg_right_icon0.hide();
			index == 0?myinfo_room0.username.focus():myinfo_room0.reg_username.focus();
			e.classList.add('lr-icon-click');
			ev.target.setAttribute('data-react',1);
		}
	};
});

/**
 * [logOreg面板打开/关闭控制]
 */
$('.lr-panel-close').click(function(){
	lr_icon[0].setAttribute('data-react',0);
	lr_panel[0].setAttribute('data-react',0);
	lr_icon[1].setAttribute('data-react',0);
	lr_panel[1].setAttribute('data-react',0);
	$('.windows-myinfo').hide();
	$('.myinfo-mask').hide();
});

/**
 * [mask存在时禁止禁止搜索]
 */
document.querySelector('#search-all').onfocus = function(e){
	if($('.myinfo-mask').css('display') == 'block'){
		this.blur();
	}
};

/**
 * [全体头部登入和注册控制]
 */
$('.log').click(function(){
	if(lr_icon[0].getAttribute('data-react') == 0){
		lr_icon[0].setAttribute('data-react',1);
		lr_panel[0].setAttribute('data-react',1);
		lr_icon[1].setAttribute('data-react',0);
		lr_panel[1].setAttribute('data-react',0);
		lr_icon.removeClass('lr-icon-click');
		lr_icon[1].classList.remove('lr-icon-move0');
		lr_icon[0].classList.add('lr-icon-click','lr-icon-move0');
		lr_panel.hide(0);
		lr_panel[0].style.display = 'block';
		myinfo_room0.username.focus();
		$('.myinfo-mask').show(0);
		$('.windows-myinfo').show(0);
	}else{
		lr_icon[0].setAttribute('data-react',0);
		lr_panel[0].setAttribute('data-react',0);
		lr_icon[1].setAttribute('data-react',0);
		lr_panel[1].setAttribute('data-react',0);
		$('.windows-myinfo').hide(0);
		$('.myinfo-mask').hide(0);
	}
});
$('.register').click(function(){
	if(lr_icon[1].getAttribute('data-react') == 0){
		lr_icon[1].setAttribute('data-react',1);
		lr_panel[1].setAttribute('data-react',1);
		lr_icon[0].setAttribute('data-react',0);
		lr_panel[0].setAttribute('data-react',0);
		lr_icon.removeClass('lr-icon-click');
		lr_icon[0].classList.remove('lr-icon-move0');
		lr_icon[1].classList.add('lr-icon-click','lr-icon-move1');
		lr_panel.hide(0);
		lr_panel[1].style.display = 'block';
		if(myinfo_room0.reg_username.val()) myinfo_room0.reg_right_icon0.hide();
		myinfo_room0.reg_username.focus();
		$('.windows-myinfo').show(0);
		$('.myinfo-mask').show(0);
	}else{
		lr_icon[0].setAttribute('data-react',0);
		lr_panel[0].setAttribute('data-react',0);
		lr_icon[1].setAttribute('data-react',0);
		lr_panel[1].setAttribute('data-react',0);
		$('.windows-myinfo').hide(0);
		$('.myinfo-mask').hide(0);
	}
});

/**
 * 录入密码和账号时按键的监听
 */
myinfo_room0.password.keydown(function(e){
	if(e.keyCode == 9){
		e.preventDefault();
		myinfo_room0.username[0].focus();
	}
});
myinfo_room0.username.keydown(function(e){
	if(e.keyCode == 18) e.preventDefault();
	this.value = this.value.replace(/[^\w@\_\.]|/g,'');
});
myinfo_room0.username.keyup(function(e){
	this.value = this.value.replace(/[^\w@\_\.]|/g,'');
});
myinfo_room0.username.blur(function(e){
	this.value = this.value.replace(/[^\w@\_.]|/g,'');
});
myinfo_room0.lr_panelBody.on('contextmenu',e=>false);

/**
 * [注册服务]
 */
/**
 * [注册服务中的 动态监听]
 */
myinfo_room0.reg_repassword.keydown(function(e){
	if(e.keyCode == 9){
		e.preventDefault();
		document.getElementById('reg-username').focus();
	}
});
myinfo_room0.reg_username.on('blur',function(e){
	if(this.value == ''){
		myinfo_room0.reg_right_icon0.css({'display':'block','color':'grey'});
	}else if(Re_email.test(this.value)){
		myinfo_room0.reg_right_icon0.css({'color':'green','display':'block',"transition":'all 1s ease-in-out'});
	}else{
		myinfo_room0.reg_right_icon0.show(0);
	}
});
myinfo_room0.reg_username.on('input',function(e){
	if(Re_email.test(this.value)){
		myinfo_room0.reg_right_icon0.css({'color':'green'});
		myinfo_room0.reg_right_icon0.show(200);
	}else{
		myinfo_room0.reg_right_icon0.css('display','none');
	}
});
myinfo_room0.reg_password.on('input',function(e){
	if(this.value.match(/\`|\'|\"|\;|\<|\>|\s/)){
		myinfo_room0.reg_right_icon1[0].style.color = '#B72323';
		myinfo_room0.reg_right_icon2[0].style.color = '#B72323';
	}else if(this.value.length>5){
		myinfo_room0.reg_right_icon1[0].style.color = '#372BEC';
		if(this.value.match(/[a-zA-Z_!@#$%^&*\.]/))
			myinfo_room0.reg_right_icon1[0].style.color = 'green';
	}else
		myinfo_room0.reg_right_icon1[0].style.color = 'grey';
	if(this.value && this.value == myinfo_room0.reg_repassword[0].value)
		myinfo_room0.reg_right_icon2[0].style.color = 'green';
	else if(!this.value&&this.value == myinfo_room0.reg_repassword.val())
		myinfo_room0.reg_right_icon2[0].style.color = 'grey';
	else
		myinfo_room0.reg_right_icon2[0].style.color = '#B72323';
});
myinfo_room0.reg_repassword.on('input',function(e){
	if(this.value != myinfo_room0.reg_password[0].value||this.value.match(/\`|\'|\"|\;|\<|\>|\s/)){
		myinfo_room0.reg_right_icon2[0].style.color = '#B72323';
	}else if(this.value){
		myinfo_room0.reg_right_icon2[0].style.color = 'green';
	}else{
		myinfo_room0.reg_right_icon2[0].style.color = 'grey';
	}
});
myinfo_room0.reg_repassword.on('keypress',function(e){
	if(e.keyCode == 13)
		myinfo_room0.reg_submit[0].click();
});
myinfo_room0.password.on('keypress',function(e){
	if(e.keyCode == 13)
		myinfo_room0.submit[0].click();
})


// 按钮reset清空数据
myinfo_room0.reg_clear.click(function(e){
	if(!(myinfo_room0.reg_username[0].value||myinfo_room0.reg_password[0].value||myinfo_room0.reg_repassword[0].value)) {
		myinfo_room0.reg_username.focus();
		return;
	}
	myinfo_room0.reg_right_icon0.css({'color':'grey','display':'block'});
	myinfo_room0.reg_right_icon1.css({'color':'grey','display':'block'});
	myinfo_room0.reg_right_icon2.css({'color':'grey','display':'block'});
	myinfo_room0.reg_checkbox[0].checked = false;
	myinfo_room0.reg_username[0].value = myinfo_room0.reg_password[0].value = myinfo_room0.reg_repassword[0].value = '';
	myinfo_room0.reg_password.blur(e=>false);
	myinfo_room0.reg_repassword.blur(e=>false);
	myinfo_room0.reg_username.focus();
});

/**
 * 验证框监听处理
 */

//滑块条验证
lr_verify.btn.onmousedown = verifyBar;
