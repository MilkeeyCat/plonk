import pkg from "pg"

const {Client} = pkg

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "plonk",
    password: "root",
    port: 5432,
})

client.connect()

export class Model {
    constructor(tableName) {
        this.tableName = tableName
        this.queryString = ""
    }

    find(obj) {
        let where = Object.keys(obj)

        where = where.reduce((prev, current, index) => {
            const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

            return prev + (prev !== "" ? ` AND ${current} = ${b}` : `WHERE ${current} = ${b}`)
        }, "")

        this.queryString = `SELECT * FROM ${this.tableName} ${where}`

        return this
    }

    findOne(obj) {
        this.find(obj)
        this.limit(1)
        this.singleRow = true

        return this
    }

    update(obj, condition) {
        let where = Object.keys(obj)

        where = where.reduce((prev, current, index) => {
            const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

            return prev + (prev !== "" ? `, ${current} = ${b}` : `${current} = ${b}`)
        }, "")

        let where2 = Object.keys(condition)

        where2 = where2.reduce((prev, current, index) => {
            const b = typeof condition[current] === "number" ? condition[current] : `'${condition[current]}'`

            return prev + (prev !== "" ? `, ${current} = ${b}` : `${current} = ${b}`)
        }, "")

        this.queryString = `UPDATE ${this.tableName} SET ${where} WHERE ${where2}`

        console.log(this.queryString)

        return this
    }

    async create(obj) {
        // console.log(`INSERT INTO ${this.tableName} (${Object.keys(obj).join(", ")}) VALUES(${Object.values(obj).map(e => `'${e}'`).join(", ")})`)
        return await client.query(`INSERT INTO ${this.tableName} (${Object.keys(obj).join(", ")}) VALUES(${Object.values(obj).map(e => `'${e}'`).join(", ")})`)
    }

    orderBy(arr, order = "asc") {
        this.queryString += `ORDER BY ${arr.join(", ")} ${order}`

        return this
    }

    limit(num) {
        this.queryString += ` LIMIT ${num}`
    }

    async exec() {
        const response = await client.query(this.queryString)

        if (this.singleRow) return response.rows[0]

        this.queryString = ""
        return response.rows
    }

    async findOneAndUpdate(obj) {
        let updateColumns = Object.keys(obj)

        const result = updateColumns.reduce((prev, current, index) => {
            const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

            return prev + (prev !== "" ? ` AND ${current} = ${b}` : `UPDATE ${this.tableName} SET ${current} = ${b}`)
        }, "")

        console.log(result)

        return await client.query(result)

    }

    query(string) {
        this.queryString = string

        return this
    }

    delete(obj) {
        let where = Object.keys(obj)

        where = where.reduce((prev, current, index) => {
            const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

            return prev + (prev !== "" ? ` AND ${current} = ${b}` : `${current} = ${b}`)
        }, "")

        this.queryString = `DELETE FROM ${this.tableName} WHERE ${where}`

        console.log(this.queryString)

        return this
    }
}

// const postgresql = require("pg")
//
const {Pool} = pkg

export default (tableName, /*callback = null*/) => {
    // NOTE: PostgreSQL creates a superuser by default on localhost using the OS username.
    const pool = new Pool({
        user: "postgres",
        // user: process.env.NODE_ENV === 'development' && (os.userInfo() || {}).username || '',
        database: "plonk",
        password: "root",
        host: "127.0.0.1",
        port: 5432,
    })

    const connection = {
        pool,
        query: (...args) => {
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release()
                    return {rows: res?.rows, rowsCount: res.rowCount}
                })
            })
        },
        find(obj) {
            let where = Object.keys(obj)

            where = where.reduce((prev, current, index) => {
                const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

                return prev + (prev !== "" ? ` AND ${current} = ${b}` : `WHERE ${current} = ${b}`)
            }, "")

            return pool.connect().then((client) => {
                return client.query(`SELECT * FROM ${tableName} ${where}`).then((res) => {
                    client.release()
                    return {rows: res?.rows, rowsCount: res.rowCount}
                })
            })
        },
        create(obj) {
            return pool.connect().then((client) => {
                return client.query(`INSERT INTO ${tableName} (${Object.keys(obj).join(", ")}) VALUES(${Object.values(obj).map(e => `'${e}'`).join(", ")})`).then((res) => {
                    client.release()
                    return {rows: res?.rows, rowsCount: res.rowCount}
                })
            })
        },
        delete(obj) {
            let where = Object.keys(obj)

            where = where.reduce((prev, current, index) => {
                const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

                return prev + (prev !== "" ? ` AND ${current} = ${b}` : `${current} = ${b}`)
            }, "")

            return pool.connect().then((client) => {
                return client.query(`DELETE FROM ${tableName} WHERE ${where}`).then((res) => {
                    client.release()
                    return {rows: res?.rows, rowsCount: res.rowCount}
                })
            })
        },
        update(obj, condition) {
            let where = Object.keys(obj)

            where = where.reduce((prev, current, index) => {
                const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

                return prev + (prev !== "" ? `, ${current} = ${b}` : `${current} = ${b}`)
            }, "")

            let where2 = Object.keys(condition)

            where2 = where2.reduce((prev, current, index) => {
                const b = typeof condition[current] === "number" ? condition[current] : `'${condition[current]}'`

                return prev + (prev !== "" ? `, ${current} = ${b}` : `${current} = ${b}`)
            }, "")

            return pool.connect().then((client) => {
                console.log(`UPDATE ${tableName} SET ${where} WHERE ${where2}`)
                return client.query(`UPDATE ${tableName} SET ${where} WHERE ${where2}`).then((res) => {
                    client.release()
                    return {rows: res?.rows, rowsCount: res.rowCount}
                })
            })
        }
    }

    // process.postgresql = connection

    // if (callback) {
    //     callback(connection)
    // }

    return connection
};

// console.log(await new Model("users").find({last_name: "White"}).orderBy(['id'], "desc").exec())