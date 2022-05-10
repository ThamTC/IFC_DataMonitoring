const emailExistence = require("email-existence")

const email_existence = {
    check: (email) => 
        new Promise(function (resolve, reject) {
            emailExistence.check(email, (err, res)=>{
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
}

module.exports = email_existence