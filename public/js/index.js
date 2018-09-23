// 全体头部控制换页功能
const inputs = document.getElementsByTagName('input');
const scrollContent = document.getElementsByClassName('scroll-content')[0];
for(let i = 0;i<inputs.length;i++){
	inputs[i].onclick = function(){
		if(inputs[i].checked == true){
			scrollContent.style.top = -i*88+"%";
			console.log(scrollContent.style.top);
		}
	}
}