var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'user'
});
var fs = require("fs");


router.get('/', function(req, res){
    fs.readFile("./views/welcome.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.get('/my', function(req, res){
    fs.readFile("./views/my.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.get('/getblogdata', function(req, res){
   connection.query('select * from blog limit 20',function(error,results,fields){
    if (error) {
        console.log(error);
        return res.send({msg: "登录失败，请重新登录", status: false});
    }else{

    }
   })
});

router.get('/log', function(req, res){
    fs.readFile("./views/log.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.get('/regi', function(req, res){
    fs.readFile("./views/regi.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.get('/search', function(req, res){
    fs.readFile("./views/search.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.get('/showblog', function(req, res){
    fs.readFile("./views/blogtext.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.get('/blogmain', function(req, res){
    fs.readFile("./views/blogmain.html", 'utf8', function(error, data){
        if(error){
            return console.log("文件读取失败");
        }else{
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

router.post("/register", function(req, res){
    connection.query("SELECT * FROM `userinfo` WHERE phonenumber=" + req.body.phonenumber, function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.send({msg:"注册失败", status: false});
        } else {
            if(results.length !== 0){
                res.send("该用户已注册");
            }else{
                let newUser = {
                    phonenumber: req.body.phonenumber,
                    password: req.body.password,
                    username:req.body.username
                }
                connection.query("INSERT INTO `userinfo` SET ?", [newUser], function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        return res.send({msg:"注册失败", status: false});
                    } else {
                        res.send({msg:"注册成功", status: true});
                    }
                });
            }
        }
    });
});

router.post('/login', function(req, res){
    console.log(req.body.phonenumber)
    connection.query("SELECT password,username FROM `userinfo` WHERE phonenumber="+req.body.phonenumber, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.send({msg: "登录失败，请重新登录", status: false});
        } else {
            if(results[0].password === req.body.password){
                //delete results[0].password;
                res.send({msg:"登录成功", status: true, userinfo: results[0],phonenumber:req.body.phonenumber});
            }else{
                res.send({msg:"账号或密码不正确", status:false});
            }
        }
    });
   
});

router.post('/uploadblog', function(req, res){
    console.log(req.body)
    connection.query("INSERT INTO blog (username,phonenumber,blogmain,blogtitle) VALUES ("+"'"+req.body.username+"'"+','+"'"+req.body.phonenumber+"'"+','+"'"+req.body.blogmain+"'"+","+"'"+req.body.blogtitle+"'"+")", function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.send({msg: "请重新输入", status: false});
        } else {
            return res.send({msg:"发布成功",status:true})
        }
    });
});

router.post('/getmyblog', function(req, res){
    console.log(req.body)
    connection.query("SELECT * FROM `blog` WHERE phonenumber="+req.body.phonenumber, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.send({msg: "请重新输入", status: false});
        } else {
            return res.send({msg:"发布成功",status:true,results:results})
        }
    });
});

router.get('/getblog', function(req, res){
    console.log(req.body)
    connection.query("SELECT * FROM `blog`", function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.send({msg: "请重新输入", status: false});
        } else {
            return res.send({msg:"发布成功",status:true,results:results})
        }
    });
});


router.post('/deletemyblog', function(req, res){
    console.log(req.body)
    connection.query("DELETE FROM blog WHERE phonenumber="+req.body.phonenumber+" "+"AND"+" "+"blogtitle="+"'"+req.body.blogtitle+"'", function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.send({msg: "删除失败", status: false});
        } else {
            return res.send({msg: "删除成功", status: true});
        }
    });
});




router.post('/searchblog', function(req, res){
    console.log(req.body)
    connection.query("SELECT * FROM blog WHERE username="+"'"+req.body.input+"' "+"OR"+" "+"blogtitle="+"'"+req.body.input+"'", function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.send({msg: "请重新输入", status: false});
        } else {
            return res.send({msg:"发布成功",status:true,results:results})
        }
    });
});









module.exports = router;