var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.sina.com',
    port: 465,
    auth: {
        user: '', //刚才注册的邮箱账号
        pass: ''  //新浪邮箱填邮箱密码，其他邮箱有授权码，请填写授权码
    }
};

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

var options = {
    from           : '"发送者姓名" <发送者邮箱>',
    to             : '"接收者姓名" <接收者邮箱>,"接收者姓名1" <接收者邮箱1>',//可一个或多个以,区分
    subject        : '-账户激活（PS:请添加本邮箱到联系人）',
    text           : '-账户激活（PS:请添加本邮箱到联系人）',
    html           : '<h1>你好，这是一封来自的邮件！</h1><a href=http://www.baidu.com target=_blank>baidu</a>',
    attachments    :
        [
            {
                filename: 'img1.png',            // 改成你的附件名
                path: '../../public/images/1.jpg',  // 改成你的附件路径
                cid : '00000001'                 // cid可被邮件使用
            }
        ]
};
transporter.sendMail(options, function(error, info){
    if(error) {
        return console.log(error);
    }
    console.log('mail sent:', info.response);
});
