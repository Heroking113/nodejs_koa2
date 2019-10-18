const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async function (username, password){
    //防止sql注入  
    username=escape(username)

    //生成加密密码
    password = genPassword(password)
    password=escape(password)
    const sql = `
        select username, realname from users where username=${username}
    `
    const rows = await exec(sql)
    return rows || {}
}

module.exports={
    login
}