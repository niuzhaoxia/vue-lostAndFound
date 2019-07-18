let http = require('http')
let fs = require('fs')
let url = require('url')
// let express = require('express')
// let multer = require('multer')

let MongoClient = require('mongodb').MongoClient
let dbURL = 'mongodb://localhost:27017/lost_found_platform'

// var app = express()
// var upload = multer({dest: 'upload/'})

// 连接数据库 返回所有用户集合
function connectDatabase (cb, collection, queryTerm) {
  MongoClient.connect(dbURL, function (err, db) {
    if (err) throw err
    let dbo = db.db('lost_found_platform')
    dbo.collection(collection).find(queryTerm).toArray(function (err, result) { // 返回集合中所有数据
      if (err) throw err
      cb(result)
      db.close()
    })
  })
}

// insert dataBase
function insertData (insertOne, collection, cb) {
  MongoClient.connect(dbURL, function (err, db) {
    if (err) throw err
    var dbo = db.db('lost_found_platform')
    dbo.collection(`${collection}`).insertOne(insertOne, function (err, res) {
      if (err) throw err
      cb(res)
      db.close()
    })
  })
}

// updata
function updataInfo (collection, whereStr, updateStr) {
  MongoClient.connect(dbURL, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err
    let dbo = db.db('lost_found_platform')
    dbo.collection(collection).updateOne(whereStr, updateStr, function (err, res) {
      if (err) throw err
      console.log('文档更新成功')
      db.close()
    })
  })
}

// 获取用户信息集合中最大 ID
function getMaxUserId (cb) {
  MongoClient.connect(dbURL, function (err, db) {
    if (err) throw err
    var dbo = db.db('lost_found_platform')
    dbo.collection('lf_users').find().sort({'userId': -1}).limit(1).toArray(function (err, res) {
      if (err) {
        throw err
      }
      cb(res[0].userId)
      db.close()
    })
  })
}

// 将userId写入userIdBuffer.json
function dataWriteInFile () {
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
          let pr = result.filter((item) => {
            return item.userId === filterId[i].userId
          })
          for (let key in pr[0]) {
            if (pr[0].hasOwnProperty(key) === true) {
              filterId[i][key] = pr[0][key]
            }
          }
        }
        write('publishMesg.json', JSON.stringify(filterId))
        db.close()
      })
    })
  })
}

// merging object
function mergingObject (cb) {
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
        cb(publishList)
      })
    })
  })
}

// 提取评论
function extractComments (cd) {
  read('./mock/userIdBuffer.json', (idLists) => {
    idLists.forEach((idItem) => {
      MongoClient.connect(dbURL, function (err, db) {
        if (err) throw err
        let dbo = db.db('lost_found_platform')
        let whereStr = {'goods_id': idItem.goods_id}
        dbo.collection('lf_dynamics').find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
          if (err) throw err
          cd(result)
          db.close()
        })
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

// 写入json文件
function write (filepath, text) {
  fs.writeFile(`./mock/${filepath}`, text, 'utf-8', (err) => {
    if (err) {
      throw err
    }
  })
}

function getLetters (item) {
  read('./mock/curUserInfo.json', curUser => {
    let curId = curUser[0].userId
    connectDatabase((letters) => {
      letters = letters.forEach(senderItem => {
        let sr = new Promise((resolve, reject) => {
          connectDatabase(sender => {
            resolve(sender)
          }, 'lf_users', {'userId': senderItem.sender})
        })
        sr.then(resolve => {
          senderItem.sender === resolve[0].userId ? senderItem.sender = resolve[0].nickName : void 0
          item(senderItem)
        })
      })
    }, 'lf_letters', {'userId': curId})
  })
}

function letters (cb) {
  fs.readFile('./mock/curUserLetter.txt', function (err, data) {
    if (err) {
      console.log(err)
    }
    let temp = data.toString().split('')
    for (let i = 0; i < temp.length - 2; i++) {
      if (temp[i] === '}' && temp[i + 1] !== ',') {
        temp.splice(i + 1, 0, ',')
      }
    }
    let result = []
    temp = temp.join((''))
    result = eval(`[${temp}]`)
    cb(result)
  })
}

function sortDatabase (cb, collection, sortField) {
  MongoClient.connect(dbURL, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err
    let dbo = db.db('lost_found_platform')
    dbo.collection(collection).find().sort(sortField).toArray(function (err, result) {
      if (err) throw err
      cb(result)
      db.close()
    })
  })
}

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X -Requested - Width')
  res.setHeader('Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') return res.end()
  let {pathname, query} = url.parse(req.url, true)
  if (pathname === '/publish') {
    switch (req.method) {
      case 'GET':
        dataWriteInFile()
        read('./mock/publishMesg.json', lists => {
          extractComments(coms => {
            lists.forEach(list => {
              coms.forEach(com => {
                if (com.goods_id === list.goods_id) {
                  Object.assign(list, com)
                }
              })
            })
            res.end(JSON.stringify(lists))
          })
        })
        // mergingObject((list) => { // 用户信息集合
        //   extractComments((comList) => { // 评论集合
        //     list.forEach(item => { // 遍历用户信息集合
        //       comList.forEach(comItem => {
        //         if (item.goods_id === comItem.goods_id) {
        //           for (let key in comItem) {
        //             if (comItem.hasOwnProperty(key) === true) {
        //               item[key] = comItem[key]
        //             }
        //           }
        //         }
        //       })
        //     })
        //     res.end(JSON.stringify(list))
        //   })
        // })
        break
      case 'POST':
        break
      case 'PUT':
        break
    }
  }
  if (pathname === '/isUserLoginOn') {
    read('./mock/curUserInfo.json', curUser => {
      return res.end(JSON.stringify(curUser[0]))
    })
  }
  if (pathname === '/login') {
    switch (req.method) {
      case 'POST':
        let str = ``
        req.on('data', chunk => {
          str += chunk
        })
        req.on('end', () => {
          let cur = JSON.parse(str)
          connectDatabase(userLists => {
            userLists = userLists.filter(user => {
              return user.studentId === cur.studentId && user.password === cur.password
            })
            if (userLists.length !== 0) {
              write(`curUserInfo.json`, JSON.stringify(userLists))
              return res.end(JSON.stringify(userLists))
            } else {
              return res.end('')
            }
          }, 'lf_users', {})
        })
        break
    }
  }
  if (pathname === '/register') {
    switch (req.method) {
      case 'POST' :
        let str = ``
        req.on('data', chunk => {
          str += chunk
        })
        req.on('end', () => {
          let cur = JSON.parse(str)
          let rg = new Promise((resolve, reject) => {
            connectDatabase(isExist => {
              resolve(isExist)
            }, 'lf_users', {'studentId': cur.studentId})
          })
          rg.then(resolve => {
            if (resolve.length !== 0) {
              return res.end('')
            } else {
              getMaxUserId(maxId => {
                let insertOne = {
                  userId: maxId + 1,
                  password: cur.password,
                  nickName: 'nick',
                  headPortrait: 'http://d.lanrentuku.com/down/png/1304/iconka_buddy-png/sportsman.png',
                  studentId: cur.studentId,
                  myClass: cur.classId,
                  phoneNumber: null,
                  weixinNumber: null,
                  goods_ids: [],
                  dynamics_ids: [],
                  myLetters: []
                }
                insertData(insertOne, 'lf_users', insertResult => {
                  return res.end(JSON.stringify(insertResult))
                })
              })
            }
          })
        })
    }
  }
  if (pathname === '/curUserInfo') {
    read('./mock/curUserInfo.json', curUser => {
      res.end(JSON.stringify(curUser[0]))
    })
  }
  if (pathname === '/upload/post') {
    switch (req.method) {
      case 'POST' :
        let files = req.files
        let dir = req.body.dirname
        for (let i = 0; i < files.length; i++) {
          let file = files[i]
          fs.renameSync(file.destination + '/' + file.filename, file.destination + '/' + dir + '/' + file.originalname)
        }
        res.json({
          code: 1000,
          desc: '成功导入' + files.length + '张图片'
        })
    }
  }
  if (pathname === '/updateUserInfo') {
    let id = parseInt(query.id)
    if (req.method === 'PUT') {
      let str = ''
      req.on('data', chunk => {
        str += chunk
      })
      req.on('end', () => {
        let upDate = JSON.parse(str)
        let where = {'userId': id}
        let update = {
          $set: {
            'nickName': upDate.nickName,
            'phoneNumber': upDate.phoneNumber,
            'weixinNumber': upDate.weixinNumber,
            'password': upDate.password
          }
        }
        updataInfo('lf_users', where, update)
        connectDatabase(upInfo => {
          write(`curUserInfo.json`, JSON.stringify(upInfo))
        }, 'lf_users', where)
      })
    } else {
      res.end('')
    }
  }
  if (pathname === '/statisticsLetter') {
    let reWrite = new Promise((resolve, reject) => {
      write('curUserLetter.txt', '')
      resolve(true)
    })
    reWrite.then((resolve) => {
      if (!resolve) {
      }
      getLetters(item => {
        fs.appendFile('./mock/curUserLetter.txt', JSON.stringify(item), function (err) {
          if (err) {
            console.log(err)
          }
        })
      })
    })
    res.end('')
  }
  if (pathname === '/getLetters') {
    letters(list => {
      res.end(JSON.stringify(list))
    })
  }
  if (pathname === '/goodsDetail') {
    let gid = parseInt(query.gid)
    if (req.method === 'GET') {
      MongoClient.connect(dbURL, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err
        let dbo = db.db('lost_found_platform')
        dbo.collection('lf_goods').aggregate([
          {
            $lookup:
              {
                from: 'lf_users',
                localField: 'userId',
                foreignField: 'userId',
                as: 'goodsList'
              }
          }
        ]).toArray(function (err, result) {
          if (err) throw err
          result = result.filter(item => {
            return item.goods_id === gid
          })
          res.end(JSON.stringify(result[0]))
          db.close()
        })
      })
    }
  }
  if (pathname === '/reportedUser') {
    connectDatabase(reported => {
      res.end(JSON.stringify(reported))
    }, 'lf_users', {})
  }
  if (pathname === '/hotSearch') {
    sortDatabase(hot => {
      hot = hot.slice(0, 3)
      res.end(JSON.stringify(hot))
    }, 'lf_hotkeys', {'count': -1})
  }
  if (pathname === '/mypublish') {
    let uid = parseInt(query.uid)
    read('./mock/publishMesg.json', lists => {
      lists = lists.filter(item => {
        return item.userId === uid
      })
      console.log(uid)
      res.end(JSON.stringify(lists))
    })
  }
  // over
}).listen(3000)
