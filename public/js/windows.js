/**
 * Created by Itxiaochong 24/09/2018
 * Description: 该文件是Client的窗口控制脚本
 */
/***************************************************/

// 窗口公共数据
const lr_icon = $('.lr-panel-icon>span');
const lr_panel = $('.lr-panel');

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
 * [注册服务]
 */