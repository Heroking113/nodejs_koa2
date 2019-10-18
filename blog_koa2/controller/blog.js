//controller:数据处理部分

const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc;` //desc是让数据倒序排列

    //返回promise
    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id=${id}`
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    //blogData是一个博客对象，包含title content author 属性
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', '${createtime}', '${author}');
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (blogData = {}) => {
    //id就是要更新博客的id
    //blogData是一个博客对象，包含title、content属性
    const title = blogData.title
    const content = blogData.content
    const id = blogData.id
    const sql = `
        update blogs set title='${title}', content='${content}' where id='${id}' 
    `
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    //id就是要删除的博客的id
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
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