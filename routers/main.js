const express = require('express');
let router = express.Router();
router.get('/',(req,res,next)=>{
	res.render('main/index',{
		name : 3
	});
});
router.get('/user',(req,res,next)=>{
	res.render('main/index',{
		hide:1
	});
});
module.exports = router;