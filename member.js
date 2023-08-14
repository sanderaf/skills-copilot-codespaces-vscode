function skillsMember() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM skills_member`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(new Error(err))
            }
        })
    })
}