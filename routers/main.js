const express = require('express');
let router = express.Router();
router.get('/',(req,res,next)=>{
	if(req.session.userName){
		res.render('main/index',{
			logon:1,
			none:'none',
		});
	}else{
		res.render('main/index',{
			logon:0,
			none:'block',
			name : 3
		});
	}
});
router.get(/[^email]/,(req,res,next)=>{
	res.render('main/Everify',{
		status:4
	});
});
module.exports = router;