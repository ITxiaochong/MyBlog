const nodemailer = require('nodemailer');
const decrypt = require('./part0').decrypt;

const sendEmail = [];
//验证发送邮箱

//发送附件额为配置
// attachments:
// [
//     {
//             filename: 'timg.jpg',            // 改成你的附件名
//             path: 'public/images/timg.jpg',  // 改成你的附件路径
//             cid : '00000001'                 // cid可被邮件使用
//     }
// ]
function sendEmail0(user){
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port:465,
        secure:true,
        auth:{
            user: '1061393710@qq.com',//你的163/qq邮箱账号
            pass: 'hdfhosuciitdbdee'//你的163/qq邮箱密码/授权码
        }
    });
    let mailOptions = {
        from: '"Plog.administrator.register"<1061393710@qq.com>', // sender address
        to:decrypt(user.email,'Welcome'), // list of receivers
        subject: '注册验证', // Subject line
        text: 'Plog的注册验证服务', // plaintext body
        html:`<h2 style="color:#333;margin:10px auto;">亲爱的道友</h2>
        <p style="color:grey;font-size:26px;">您于近期注册了Plog帐号${decrypt(user.email,'Welcome')}, 请在5小时内<a href='http://localhost:8081/email?email=${user.email}&eid=${user.eid}'>点击验证</a>完成注册.</p>`,
    };
    transporter.sendMail(mailOptions, function(error, info){
        //info 和 error 都是String类型的消息
        if(!error){
            console.log('Send Successfully...');
        }else{
            console.log('Send Bad address Syntax...');
        }
    });
}
function sendEmail1(user){
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port:465,
        secure:true,
        auth:{
            user: 'fc1532397@163.com',//你的163/qq...邮箱账号
            pass: 'aa1532397'//你的163/qq...邮箱密码/授权码
        }
    });
    let mailOptions = {
        from: '"Plog.administrator.register"<fc1532397@163.com>', // sender address
        to:decrypt(user.email,'Welcome'), // list of receivers
        subject: '注册验证', // Subject line
        text: 'Plog的注册验证服务', // plaintext body
        html:`<h2 style="color:#333;margin:10px auto;">亲爱的道友</h2>
        <p style="color:grey;font-size:26px;">您于近期注册了Plog帐号${decrypt(user.email,'Welcome')}, 请在5小时内<a href='http://localhost:8081/email?email=${user.email}&eid=${user.eid}'>点击验证</a>完成注册.</p>`,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(!error){
            console.log('Send Successfully...');
        }else{
            console.log('Send Bad address Syntax...');
        }
    });
}
function sendEmail2(user){
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port:465,
        secure:true,
        auth:{
            user: '1715857864@qq.com',//你的163/qq邮箱账号
            pass: 'yqvhasozsqkxcaej'//你的163/qq邮箱密码/授权码
        }
    });
    let mailOptions = {
        from: '"Plog.administrator.register"<1715857864@qq.com>', // sender address
        to:decrypt(user.email,'Welcome'), // list of receivers
        subject: '注册验证', // Subject line
        text: 'Plog的注册验证服务', // plaintext body
        html:`<h2 style="color:#333;margin:10px auto;">亲爱的道友</h2>
        <p style="color:grey;font-size:26px;">您于近期注册了Plog帐号${decrypt(user.email,'Welcome')}, 请在5小时内<a href='http://localhost:8081/email?email=${user.email}&eid=${user.eid}'>点击验证</a>完成注册.</p>`,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(!error){
            console.log('Send Successfully...');
        }else{
            console.log('Send Bad address Syntax...');
        }
    });
}
sendEmail.push(sendEmail0,sendEmail1,sendEmail2);
module.exports = sendEmail;
