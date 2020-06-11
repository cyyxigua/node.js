const { exec, escape } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` // 1=1相当于占位，当没有 author 和 keyword 时不会报错
  if(author) {
    sql += `and author='${author}' `
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return await exec(sql)
}

const getDetail = async (id) => {
  id = escape(id)
  const sql = `select * from blogs where id = ${id}`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性

  // return {
  //   id: 3 // 表示新建博客，插入到数据表里面的 id
  // }
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const author = escape(blogData.author)
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createTime, author)
    values (${title}, ${content}, ${createTime}, ${author})
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  // id 就是要更新的博客的 id

  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  id = escape(id)

  const sql = `update blogs set title=${title}, content=${content} where id=${id}`
  const updateData = await exec(sql)
  if(updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  // id 要删除的博客的 id
  id = escape(id)
  author = escape(author)
  const sql = `delete from blogs where id=${id} and author=${author}`
  const delData = await exec(sql)
  if(delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}