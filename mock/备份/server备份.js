let http = require('http')
let fs = require('fs')
let url = require('url')
let MongoClient = require('mongodb').MongoClient
let dbURL = 'mongodb://localhost:27017/runoob'

// 连接数据库
function connectDatabase (cb, collection) {
  MongoClient.connect(dbURL, function (err, db) {
    if (err) throw err
    let dbo = db.db('lost_found_platform')
    dbo.collection(collection).find({}).toArray(function (err, result) { // 返回集合中所有数据
      if (err) throw err
      cb(result)
      db.close()
    })
  })
}

// 读取json文件
function read (filepath, cb) {
  fs.readFile(`${filepath}`, 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    } else if (data.length === 0) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X -Requested - Width')
  res.setHeader('Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', ' 3.2.1')
  if (res.method === 'OPTIONS') return res.end()
  let {pathname, query} = url.parse(req.url, true)
  if (pathname === '/publish') {
    switch (req.method) {
      case 'GET':
        let Dynamics = ''
        let collection = 'lf_users'
        connectDatabase(function (e) {
          Dynamics = e
          MongoClient.connect(dbURL, function (err, db) {
            if (err) throw err
            let dbo = db.db('lost_found_platform')
            let publishLists = []
            for (let i = 0; i < Dynamics.length; i++) {
              if (!Dynamics[i].goods_ids) {
                continue
              } else if (Dynamics[i].goods_ids) {
                let whereStr = {'_id': Dynamics[i].goods_ids[0]} // 查询条件
                dbo.collection('lf_goods').find(whereStr).toArray(function (err, result) {
                  if (err) throw err
                  Dynamics[i]['goods'] = result[0]
                  publishLists.push(Dynamics[i])
                  db.close()
                })
              }
            }
            console.log(publishLists)
            res.end(JSON.stringify(publishLists))
          })
        }, collection)
        break
      case 'POST':
        break
      case 'PUT':
        break
    }
  }
  if (pathname === '/userInfo') {
    connectDatabase(function (userInfos) {
      return res.end(JSON.stringify(userInfos))
    })
  }
}).listen(3000)
