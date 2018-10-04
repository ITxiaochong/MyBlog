/**
 * Created by Itxiaochong 23/09/2018
 * Description: 该文件是Client的主要控制脚本
 */

/**
 * [全局的变量和常量]
 */
var inputs = document.getElementsByClassName('h-title');
var scrollContent = document.getElementsByClassName('scroll-content')[0];
var pages = $('.content');
var music = $('#header-music');
var lis = $('.content0-lists>li');

/*****************************************************************************/
/**
 * [页面切换js]
 */

for(let i = 0;i<inputs.length;i++){
	inputs[i].onclick = function(){
		if(inputs[i].checked == true && pages[i].getAttribute('data-react') == 0){
			//data-react防止多次点击每次都触发已经切换好的页面
			pages.attr('data-react',0);
			pages[i].setAttribute('data-react',1);
			//页面动画加载效果
			pages[i].style.display = 'none';
			if(i == 0)
				$('.content'+i).slideDown(400);
			else if(i == 1)
				$('.content'+i).fadeIn(500);
			else
				$('.content'+i).show(500);
			scrollContent.style.top = -i*90.1+"%";
		}
	}
}

/**
 * Myinfo界面左侧li标签focus/hover时样式
 */
lis.mousedown(function(e){
	if(e.target.getAttribute('data-react') == 0){
		lis.attr('data-react',0);
		lis.css({"background":"#fff","font-size":"21px"});
		e.target.setAttribute('data-react',1);
		e.target.style.background = "#D6D121";
		e.target.style.fontSize = '22px';
	}
});
lis.mouseenter(function(ev1){
	if(ev1.target.getAttribute('data-react') != 1)
		ev1.target.style.background = '#f56c6c';
});
lis.mouseleave(function(ev2){
	if(ev2.target.getAttribute('data-react') != 1)
		ev2.target.style.background = "#fff";
});

/*
 * [头部电子表js]
 */ 
setInterval(function Mytime(){
	var time = new Date();
	var hh = time.getHours();
	var mm = time.getMinutes();
	if(mm<10) mm = '0'+mm;
	var res = hh+' : '+mm;
	$('.time-clock').text(res);
},1000);

/**
 * [头部音乐播放]
 */
