var path = require("path");
var fs =require("fs");
/**
 * @title :文件工具类
 * @author hou
 * @version: 1.0
 * @since:   2017-08-14
 * @serial:
 */
function fileUtil(){};

module.exports = fileUtil;
/**
 * @title :创建文件目录-方法
 * @author hou
 * @param dirpath 文件路径
 * @param dirname 使用时第二个参数可以忽略
 */
fileUtil.mkdir = function(dirpath,dirname){
	//判断是否是第一次调用
	if(typeof dirname === "undefined"){ 
		if(fs.existsSync(dirpath)){
			return;
		}else{
			fileUtil.mkdir(dirpath,path.dirname(dirpath));
		}
	}else{
		//判断第二个参数是否正常，避免调用时传入错误参数
		if(dirname !== path.dirname(dirpath)){ 
			fileUtil.mkdir(dirpath);
			return;
		}
		if(fs.existsSync(dirname)){
			fs.mkdirSync(dirpath)
		}else{
			fileUtil.mkdir(dirname,path.dirname(dirname));
			fs.mkdirSync(dirpath);
		}
	}
};

/**
 * @title :删除单个文件-方法
 * @author hou
 * @param filepath 文件路径；例如：/a/b.txt
 * 
 */
fileUtil.removeFile = function(filepath){
	if(filepath===""||filepath==="undefined"||filepath===null) return false;
	if(fs.existsSync(filepath)){
		fs.unlinkSync(filepath);
		console.log("删除文件："+filepath + "成功！");
		return true;
	}else{
		console.error("文件："+filepath +"不存在!");
		return false;
	}
}

/**
 * @title :删除所有的文件(将所有文件夹置空)-方法
 * @author hou
 * @param dirpath 要删除的文件夹 url
 * 
 */
fileUtil.emptyFile = function(dirpath){
	if(dirpath==""||dirpath=="undefined"||dirpath==null) return false;
	var files = fs.readdirSync(dirpath);//读取该文件夹
    files.forEach(function(file){
        var stats = fs.statSync(dirpath+'/'+file);
        if(stats.isDirectory()){//如果是目录则递归
        	fileUtil.emptyFile(dirpath+'/'+file);
        }else{
            fs.unlinkSync(dirpath+'/'+file);
            console.log("删除文件："+dirpath+'/'+file+" 成功！");
        }
    });
    return true;
}
/**
 * @title 删除所有的空文件夹-方法
 * @author hou
 * @param dirpath 要删除的文件夹 url
 * 
 */
fileUtil.emptyDir = function(dirpath){
	if(dirpath==""||dirpath=="undefined"||dirpath==null) return false;
	 var files = fs.readdirSync(dirpath);
     if(files.length>0){
         var tempFile = 0;
         files.forEach(function(fileName)
         {
             tempFile++;
             emptyDir(dirpath+'/'+fileName);
         });
         if(tempFile==files.length){//删除母文件夹下的所有字空文件夹后，将母文件夹也删除
             fs.rmdirSync(dirpath);
             console.log('删除空文件夹：'+dirpath+' 成功！');
         }
     }else{
         fs.rmdirSync(dirpath);
         console.log('删除空文件夹：'+dirpath+' 成功！');
     }
	return true;
}
/**
 * @title 删除所有的文件与当前文件夹-方法
 * @author hou
 * @param dirpath 要删除的文件夹 url
 * 
 */
fileUtil.deleteFolder = function(dirpath){
	if(dirpath===""||dirpath==="undefined"||dirpath===null) return false;
	var files = [];
    if( fs.existsSync(dirpath) ) {
        files = fs.readdirSync(dirpath);
        files.forEach(function(file,index){
            var curPath = dirpath + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
            	fileUtil.deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                console.log('删除文件：'+curPath+' 成功！');
            }
        });
        fs.rmdirSync(dirpath);
        console.log('删除空文件夹：'+dirpath+' 成功！');
    }
	return true;
}



