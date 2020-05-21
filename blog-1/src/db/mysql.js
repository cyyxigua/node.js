const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连解对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连解
con.connect()

// 新建统一执行 sql 的函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if(err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = { exec }