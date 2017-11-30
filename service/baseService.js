
/**
 * 服务层实现类
 * Created by hou on 2017/8/15.
 */
const async = require("async");
const ObjectID = require('mongodb').ObjectID;
const mongodb = require('./db');

function baseService(){};
module.exports = baseService;
/**
 * @title :保存数据-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}data 集合对象-json or array
 * @param {function(err,data)}callback 回调函数-function
 */
baseService.prototype.insert = function(collectionName,data,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(data===""||data===null||data===undefined) return callback(data+"数据不能为空!");
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //将文档插入 指定 集合
            col.insert(data,{safe:true},function(err,doc){
                cb(err,doc);//保存成功返回保存记录
            });
        }
    ], function (err,doc) {
        mongodb.close();
        callback(err,doc);
    });
}

/**
 * @title :保存or更新数据（自定义id递增）-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}data 集合对象-json or array
 * @param {function(err,datas)}callback 回调函数-function(err,doc)
 */
baseService.prototype.save = function(collectionName,data,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(data===""||data===null||data===undefined) return callback(data+"数据不能为空!");

    baseService.count(collectionName,null,function(err,n){
        if(Array.isArray(data)){
            for(var i = 0; i < data.length;i++){
                data[i]._id = n+i+1;
            }
        }else{
            data._id = n+1;
        }
        async.waterfall([
            function (cb) {
                mongodb.open(function(err , db){
                    cb(err , db);
                });
            },
            function(db,cb){
                db.collection(collectionName,function(err , col){
                    cb(err , col);
                })
            },
            function(col,cb){
                //将文档插入 指定 集合
                col.save(data,function(err,doc){
                    cb(err,doc);//保存成功返回保存记录
                });
            }
        ], function (err,doc) {
            mongodb.close();
            callback(err,doc);
        });
    })
}
/**
 * @title :保存or更新数据（自定义id递增）-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {String}_id 自定义ID-String
 * @param {Object}data 集合对象-json or array
 * @param {function(err,data)}callback 回调函数-function
 */
baseService.prototype.saveSetId = function(collectionName,_id,data,callback){
	if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
	if(data===""||data===null||data===undefined) return callback(data+"数据不能为空!");

    baseService.count(collectionName,null,function(err,n){
        if(Array.isArray(data)){
            for(var i = 0; i < data.length;i++){
                data[i]._id = n+i+1;
            }
        }else{
            data._id = _id;
        }
        async.waterfall([
            function (cb) {
                mongodb.open(function(err , db){
                    cb(err , db);
                });
            },
            function(db,cb){
                db.collection(collectionName,function(err , col){
                    cb(err , col);
                })
            },
            function(col,cb){
                //将文档插入 指定 集合
                col.save(data,function(err,doc){
                    cb(err,doc);//保存成功返回保存记录
                });
            }
        ], function (err,doc) {
            mongodb.close();
            callback(err,doc);
        });
    })
}

/**
 * @title :更新数据-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}query 条件过滤集合对象-json
 * @param {Object}data 集合对象-json
 * @param {function(err)}callback 回调函数-function
 */
baseService.prototype.update = function(collectionName,query,data,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(query===""||query===null||query===undefined){
        query = {};
    };
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询更新数据
            col.update(query,data,function (err) {
                cb(err);//成功！返回查询的信息
            });
        }
    ], function (err) {
        mongodb.close();
        callback(err);
    });
}
/**
 * @title :更新数据(根据系统ID)-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {String}id 主键条件过滤-String
 * @param {Object}data 集合对象-json
 * @param {function(err)}callback 回调函数-function
 */
baseService.prototype.updateById = function(collectionName,id,data,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(id===""||id===null||id===undefined){
        return callback(id+"ID不存在!");
    };
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询更新数据
            col.update({_id: new ObjectID(id)},data,function (err) {
                cb(err);//成功！返回查询的信息
            });
        }
    ], function (err) {
        mongodb.close();
        callback(err);
    });
}
/**
 * @title :删除数据-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}query 条件集合-json
 * @param {function(err)}callback 回调函数-function
 */
baseService.prototype.remove = function(collectionName,query,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(query===""||query===null||query===undefined){
        return callback("请输入过滤条件!");
    };
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询更新数据
            col.remove(query,function (err) {
                cb(err);//成功！返回查询的信息
            });
        }
    ], function (err) {
        mongodb.close();
        callback(err);
    });
}
/**
 * @title :删除数据(根据系统ID只删除一条记录)-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {String}id 主键条件过滤-String
 * @param {function(err)}callback 回调函数-function
 */
baseService.prototype.removeById = function(collectionName,id,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(id===""||id===null||id===undefined){
        return callback(id+"ID不存在!");
    };
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询更新数据
            col.remove({_id: new ObjectID(id)},{w:1},function (err) {
                cb(err);//成功！返回查询的信息
            });
        }
    ], function (err) {
        mongodb.close();
        callback(err);
    });
}
/**
 * @title :查询统计记录-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}query 条件集合对象-json
 * @param {function(err,num)}callback 回调函数-function
 */
baseService.count = function(collectionName,query,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(query===""||query===null||query===undefined) {
        query = {};
    }
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询数据
            col.find(query).count( function (err, num) {
                cb(err, num);//成功！返回查询的信息
            });
        }
    ], function (err, num) {
        mongodb.close();
        if(err){
            console.log('err => ' + err);
            callback(err);
        }
        callback(err, num);
    });
}

/**
 * @title :查询单条记录-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}query 条件集合对象-json
 * @param {function(err,data)}callback 回调函数-function
 */
baseService.findOne = function(collectionName,query,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(query===""||query===null||query===undefined) {
        query = {};
    }
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询数据
            col.findOne(query, function (err, doc) {
                cb(err, doc);//成功！返回查询的信息
            });
        }
    ], function (err, doc) {
        mongodb.close();
        if(err){
            console.log('err => ' + err);
            callback(err);
        }
        callback(err, doc);
    });
}
/**
 * @title :根据ID（系统主键）查询单条记录-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {String}id 主键条件过滤-String
 * @param {function(err,data)}callback 回调函数-function
 */
baseService.findOneById = function(collectionName,id,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
    if(id===""||id===null||id===undefined) {
        return callback(id+"ID不存在!");
    }
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            //根据 query 对象查询数据
            col.findOne({_id:new ObjectID(id)}, function (err, doc) {
                cb(err, doc);//成功！返回查询的信息
            });
        }
    ], function (err, doc) {
        mongodb.close();
        if(err){
            console.log('err => ' + err);
            callback(err);
        }
        callback(err, doc);
    });
}
/**
 * @title :查询多条记录-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}query 条件集合对象-json
 * @param {Object}fields 指定字段集合对象-json{field:1, field:0}
 * @param {function(err,datas)}callback 回调函数-function
 */
baseService.findArray = function(collectionName,query,fields,callback){
    if(collectionName===""||collectionName===null||collectionName===undefined){
        return callback(collectionName+"集合不存在!");
    }
    if(query===""||query===null||query===undefined) {
        query = {};
    }
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            if(fields===""||fields===null||fields===undefined) {
                //根据 query 对象查询数据
                col.find(query).toArray(function (err, docs) {
                    cb(err, docs);//成功！返回查询的信息
                });
            }else{
                //根据 query 对象查询数据
                col.find(query,fields).toArray(function (err, docs) {
                    cb(err, docs);//成功！返回查询的信息
                });
            }
        }
    ], function (err, docs) {
        mongodb.close();
        if(err){
            console.log('err => ' + err);
            callback(err);
        }
        callback(err, docs);
    });
}
/**
 * @title :查询多条记录（排序）-方法
 * @author hou
 * @param {String}collectionName 数据库表名称-String
 * @param {Object}query 条件集合对象-json
 * @param {Object}fields 指定字段集合对象-json{field:1, field:0}
 * @param {Object}sortCol 指定字段排序集合对象-json{field:1, field:-1}
 * @param {function(err,datas)}callback 回调函数-function(err,datas)
 */
baseService.findArraySort = function(collectionName,query,fields,sortCol,callback){
	if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
	if(query===""||query===null||query===undefined) {
		query = {};
	}
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            if(fields===""||fields===null||fields===undefined) {
                //根据 query 对象查询数据
                col.find(query).sort(sortCol).toArray(function (err, docs) {
                    cb(err, docs);//成功！返回查询的信息
                });
            }else{
                //根据 query 对象查询数据
                col.find(query,fields).sort(sortCol).toArray(function (err, docs) {
                    cb(err, docs);//成功！返回查询的信息
                });
            }
        }
    ], function (err, docs) {
        mongodb.close();
        if(err){
            console.log('err => ' + err);
            callback(err);
        }
        callback(err, docs);
    });
}

/**
 * @title :查询多条记录（分页、排序）-方法
 * @author hou
 * @param {String} collectionName 数据库表名称-String
 * @param {Object}query 条件集合对象-json
 * @param {Object}fields 指定字段集合对象-json{field:1, field:0}
 * @param {Object}sortCol 指定字段排序集合对象-json{field:1, field:-1}
 * @param {number}page 当前页数-number
 * @param {number}rownum 行数-number（默认10条）
 * @param {function(err,datas,total)}callback 回调函数-function(err,datas,total)
 */
baseService.findArrayLimit = function(collectionName,query,fields,sortCol, page,rownum, callback) {
	if(collectionName===""||collectionName===null||collectionName===undefined) return callback(collectionName+"集合不存在!");
	if(query==""||query===null||query===undefined) {
		query = {};
	}
	if(page==""||page===null||page===undefined) {
        page = 1;
	}else{
        page = parseFloat(page);
	}
    if(rownum==""||rownum===null||rownum===undefined) {
        rownum = 10;
    }else{
        rownum = parseFloat(rownum);
    }
    async.waterfall([
        function (cb) {
            mongodb.open(function(err , db){
                cb(err , db);
            });
        },
        function(db,cb){
            db.collection(collectionName,function(err , col){
                cb(err , col);
            })
        },
        function(col,cb){
            if(fields===""||fields===null||fields===undefined) {//不存在指定返回字段
                //使用 count 返回特定查询的文档数 total
                col.count(query, function (err, total) {
                    if(sortCol===""||sortCol===null||sortCol===undefined) {//不存在排序条件
                        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                        col.find(query, {
                            skip: (page - 1) * 10,
                            limit: rownum
                        }).toArray(function (err, docs) {
                            cb(err, docs, total);
                        });
                    }else{//存在排序
                        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                        col.find(query, {
                            skip: (page - 1) * 10,
                            limit: rownum
                        }).sort(sortCol).toArray(function (err, docs) {
                            cb(err, docs, total);
                        });
                    }
                });
            }else{//存在指定返回字段
                //使用 count 返回特定查询的文档数 total
                col.count(query, function (err, total) {
                    if(sortCol===""||sortCol===null||sortCol===undefined) {//不存在排序条件
                        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                        col.find(query,fields, {
                            skip: (page - 1) * 10,
                            limit: rownum
                        }).toArray(function (err, docs) {
                            cb(err, docs, total);
                        });
                    }else{//存在排序条件
                        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                        col.find(query,fields, {
                            skip: (page - 1) * 10,
                            limit: rownum
                        }).sort(sortCol).toArray(function (err, docs) {
                            cb(err, docs, total);
                        });
                    }
                });
            }
        }
    ], function (err, docs,total) {
        mongodb.close();
        if(err){
            console.log('err => ' + err);
            callback(err);
        }else{
            callback(err, docs,total);
        }
    });
};
