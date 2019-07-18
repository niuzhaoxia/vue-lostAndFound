let http = require('http')
let fs = require('fs')
let url = require('url')

let MongoClient = require('mongodb').MongoClient
let dbURL = 'mongodb://localhost:27017/lost_found_platform'
// let {readFile, writeFile} = require('')

// 将userId写入userIdBuffer.json
function connectDatabase () {
  MongoClient.connect(dbURL, function (err, db) {
    if (err) throw err
    var dbo = db.db('lost_found_platform')

    function getId (cb) {
      dbo.collection('lf_goods').find({}).toArray(function (err, r) { // 返回lf_goods集合中所有数据
        if (err) throw err
        r = r.map((item) => {
          return item
        })
        cb(r)
        r = JSON.stringify(r)
        // 将result写入文件
        fs.writeFile('./mock/userIdBuffer.json', r, 'utf-8', (err) => {
          if (err) {
            console.log(`写入失败`)
          } else {
            console.log(`写入成功`)
          }
        })
        db.close()
        // 过滤
      })
    }

    getId((filterId) => {
      dbo.collection('lf_users').find({}).toArray(function (err, result) {
        if (err) throw err
        for (let i = 0; i < filterId.length; i++) {
          result = result.filter((item) => {
            return item.userId === filterId[i].userId
          })
        }
        result = JSON.stringify(result)
        fs.writeFile('./mock/publishMesg.json', result, 'utf-8', (err) => {
          if (err) {
            console.log(`写入失败`)
          } else {
            console.log(`1写入成功`)
          }
        })
        db.close()
      })
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
        connectDatabase()
        read('./mock/userIdBuffer.json', (idLists) => {
          idLists.forEach((idItem) => { // 遍历Id
            read('./mock/publishMesg.json', publishList => {
              publishList.forEach((pItem) => { // 遍历用户
                for (let key in idItem) {
                  if (idItem.hasOwnProperty(key) === true) {
                    pItem[key] = idItem[key]
                  }
                }
              })
              res.end(JSON.stringify(publishList))
            })
          })
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
