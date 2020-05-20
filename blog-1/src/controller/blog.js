const getList = (author, keyword) => {
  // 先返回假数据
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1589870410244,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1589870461522,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1589870410244,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  console.log(blogData)
  return {
    id: 3 // 表示新建博客，插入到数据表里面的 id
  }
}

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  // id 就是要更新的博客的 id
  console.log(id, blogData)
  return true
}

const delBlog = (id) => {
  // id 要删除的博客的 id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}