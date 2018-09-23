const express = require('express');
let router = express.Router();
router.get('/',(req,res,next)=>{
	res.render('main/index',{
		name : 1
	});
});
router.get('/user',(req,res,next)=>{
	res.render('test/user')
});
module.exports = router;