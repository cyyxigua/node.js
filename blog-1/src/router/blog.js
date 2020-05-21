const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id

  // 获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    // app.js中已经解析出了query
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  
  // 新建一篇博客
  if(method === 'POST' && req.path === '/api/blog/new') {
    // const blogData = req.body
    // const data = newBlog(blogData)
    // return new SuccessModel(data)

    req.body.author = 'zhangsan'
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update') {
    const blogData = req.body
    const result = updateBlog(id, blogData)
    // if(result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('更新微博失败')
    // }
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新微博失败')
      }
    })
  }

  // 删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan'
    const result = delBlog(id, author)
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除微博失败')
      }
    })
    // if(result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('删除微博失败')
    // }
  }
}

module.exports = handleBlogRouter