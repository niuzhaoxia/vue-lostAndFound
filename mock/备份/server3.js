let http = require('http')
let fs = require('fs')
let url = require('url')
let MongoClient = require('mongodb').MongoClient
let dbURL = 'mongodb://localhost:27017/lost_found_platform'

// select
let connectDB = new Promise((resolve, reject) => {
  MongoClient.connect(dbURL, function (err, db) {
    if (err) throw err
    let dbo = db.db('lost_found_platform')
    let dbArr = [dbo, db]
    // dbo.collection('lf_goods').find({}).toArray(function (err, result) {
    //   if (err) throw err
    //   console.log(result)
    //   db.close()
    // })
    resolve(dbArr)
  })
})

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
        let pro = new Promise((resolve, reject) => {
          connectDB.then((res) => {
            res[0].collection('lf_goods').find({}).toArray(function (err, result) { // 返回lf_goods集合中所有数据
              if (err) throw err
              resolve(result)// 物品table
              res[1].close()
            })
          })
        })
        pro.then((res) => {
          console.log(res)
          let publisherList = []
          for (let i = 0; i < res.length; i++) {
            publisherList.push({'userId': res[i].userId})// 获取 userId 数组
          }
          for (let i = 0; i < publisherList.length; i++) {
            let usersPro = new Promise((resolve, reject) => {
              connectDB.then((res) => {
                let whereStr = {'userId': publisherList[i].userId}
                console.log(whereStr)
                res[0].collection('lf_users').find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
                  if (err) throw err
                  resolve(result)
                  res[1].close()
                })
              })
            })
            usersPro.then((res) => {
              console.log(res)
            })
          }// 遍历对应useId用户
        })
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
