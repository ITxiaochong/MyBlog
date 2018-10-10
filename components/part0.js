//一个玩具版加密解密方法
function encrypt(str,model){
	let back = new Buffer.from(`${model}=${str}=${model}`);
	return back.toString('base64');
}
function decrypt(str,model){
	let got = new Buffer.from(str+'','base64').toString();
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
	if(!db) return;		 //查找符合条件: [1.未注销 2.未验证 3.注册时间超时] 的用户
	db.updateMany({reg_end:0,ver_time:0,reg_begin:{$lte:Date.now()-18000000}},{$set:{reg_end:Date.now()}},function(err,Sets){
		//更新过程中出错
		if(err) {
			console.log(`setClear Done...  --${new Date().toLocaleTimeString()}`);
			return;
		}else if(Sets.ok) {
			if(!Sets.n){//查询成功,更新0条 Sets <=> { ok: 1, nModified: 0, n: 0 }
				console.log(`setClear no modify...  --${new Date().toLocaleTimeString()}`);
				return;
			}
			console.log(`setClear Successfully [${Sets.n}] be modified--${new Date().toLocaleTimeString()}`);
		}
	});

}
function userDrop(db){
	if(!db) return;		 //查找符合条件: [1.未验证 2.已注销 ] 的用户
	db.deleteMany({reg_end:{$ne:0},ver_time:0},function(err,Sets){
		//更新过程中出错
		if(err) {
			console.log(`userDrop Done...  --${new Date().toLocaleTimeString()}`);
			return;
		}else if(Sets.ok) {
			if(!Sets.n){	//查询成功,更新0条 Sets <=> { ok: 1, nModified: 0, n: 0 }
				console.log(`userDrop no remove...  --${new Date().toLocaleTimeString()}`);
				return;
			}
			console.log(`userDrop Successfully [${Sets.n}] be removed--${new Date().toLocaleTimeString()}`);
		}
	});

}
module.exports = {
	encrypt,
	decrypt,
	generateId,
	setClear,
	userDrop
};
