/**
 * 文件上传类
 * Created by hou on 2017/8/31.
 */
const sysParam = require("../common/sysParam.js");
const fileUtil =require("../utils/fileUtil.js");
const fs =require("fs");
module.exports = {
    /**
     *上传页面跳转方法
     * @param req
     * @param res
     */
    uploadPage : function(req , res){
        res.render('upload', { title: '文件上传',error: req.flash('error').toString() });
    },

    /**
     *上传方法
     * @param req
     * @param res
     */
    upload : function(req, res, next){
        var file = req.file;
        console.log(file);

        var url = sysParam.PHOTO_URL;
        //var url = "/usr/local/microblog/public/20170814/";
        var is = fs.createReadStream(file.path);
        if(!fs.existsSync(url)){
            fileUtil.mkdir(url);//不存在则创建该目录
        }
        console.log(url+file.originalName);

        var os = fs.createWriteStream(url+file.originalName);
        is.pipe(os);
        is.on('end', function () {

            if(fs.existsSync(file.path)){//存在则删除
                //fs.unlinkSync(url+"world.png");
                fileUtil.removeFile(file.path);
            }

        });

        var html = "<img src='"+req.protocol+"://"+req.host+"/20170815/"+file.originalName+"'>";

        res.send(html);
        //res.send(req.file);
    }
}