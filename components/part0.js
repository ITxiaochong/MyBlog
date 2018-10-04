//一个玩具版加密解密方法
function encrypt(str,model){
	let back = new Buffer.from(`${model}=${str}=${model}`);
	return back.toString('base64');
}
function decrypt(str,model){
	let got = new Buffer.from(str,'base64').toString();
	return got.substring(model.length+1,got.length-model.length-1);
}
//生成user _id字段方法 接收一个Set 默认为空
function generateId(Exists){
	let exists = Exists||new Set();
	let data;
	do{
		data = '1';
		for(let i = 0;i<6;i++)
			data += Math.random()*10 | 0;
	}while(exists.has(data));
	exists.add(data);
	// exists = null;	//干完活就取消引用 只保留原来的固定引用
	return data;
}
//由于时间很长,所以用setInerval操作 只需要清除一次就OK
function setClear(db){
	if(!db) return;
	db.updateMany({reg_status:0,},{$set:{reg_end:new Date().toLocaleString()}},function(err){
		if(err) console.log('setClear Error...'+new Date().tolocaleString());
		else	console.log('setClear Successfully...');
	});
}

module.exports = {
	encrypt,
	decrypt,
	generateId,
	setClear,
};
