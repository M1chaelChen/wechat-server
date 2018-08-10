const express = require('express')
const wechat  = require('./wechat/wechat');
const config = require('./config');
const app = express()

const wechatApp = new wechat(config);

app.get('/',function(req,res){
    wechatApp.auth(req,res);
});

//用于请求获取 access_token
app.get('/getAccessToken',function(req,res){
    wechatApp.getAccessToken().then(function(data){
        res.send(data);
    });    
});

//用于处理所有进入 3000 端口 post 的连接请求
app.post('/',function(req,res){
    wechatApp.handleMsg(req,res);
});

const port = 80;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
