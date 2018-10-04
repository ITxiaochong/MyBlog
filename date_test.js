// let status = 0;
// if(0)
// 	if(0)
// 		status = 3;
// 	else
// 		status = 1;
// else
// 	status = 2;
// console.log(status);
// console.log(new Date().toLocaleString());
//
//测试生成账号算法的速度
// default: 15394.410ms
// [Finished in 15.6s]
// function n_id(){
// 	let data = '';
// 	for(let j = 0;j<7;j++)
// 		data+=Math.random()*10|0;
// 	return data;
// }
// console.time();
// for(let i=0;i<100000000;i++){
// 	n_id();
// }
// console.timeEnd();


//ES6结构赋值测试
// let d = {a:123,b:4556,c:123};
// let {a,b} = d;
// console.log(a);
//
function generateId(Exists){
	let exists = Exists||new Set();
	let data;
	do{
		data = '1';
		for(let i = 0;i<6;i++)
			data += Math.random()*10 | 0;
	}while(exists.has(data));
	exists.add(data);
	return data;
}
console.time();

// !async function game(){
// 	await setTimeout(function(){console.log(123);},0);
// 	console.log(456);
// }();
var a = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('a')
    }, 1000)
  })
}


function _ids(User,Sets){
	if(!(User&&Sets)) return null;
	User.find({},'_id',function(err,doc){
		if(err) return null;
		Sets = new Set(doc.map(item => item._id));
	});
}
// 异步函数b
var b = function (data) {
  return new Promise(function (resolve, reject) {
    resolve(data + 'b')
  })
}

// 异步函数c
var c = function (data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(data + 'c')
    }, 500)
  })
}
//链式调用
// a()
//   .then(function (data) {
//     return b(data)
//   })
//   .then(function (data) {
//     return c(data)
//   })
//   .then(function (data) {
//     console.log(data)// abc
//   })

// console.timeEnd();
// let a = new Set();
// console.log(a.size == a.add(123).size);
//
//
//
// const 引用测试
// const obj = new Set();
// let test = obj;
// test.add(123);
// console.log(test = null,obj); //仍然生一个obj引用该Set, 结果:Set { 123 }
// // 小结 const 一旦设置就是强制固定引用 就是保证这个引用不会被delete,不会被赋新值
//
// 如果正在运行函数被赋予null,不会停止
// setTimeout(function(){clearInterval(a);},3000);
const asd = setInterval(function(){console.log(123);},1000);

setTimeout(clearInterval,3000,asd);//执行两次这个延迟执行的时间是从开始运行程序计算的
// some();