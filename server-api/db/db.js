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
    }

    async find(obj) {
        let where = Object.keys(obj)

        where = where.reduce((prev, current, index) => {
            const b = typeof obj[current] === "number" ? obj[current] : `'${obj[current]}'`

            return prev + (prev !== "" ? ` AND ${current} = ${b}` : `WHERE ${current} = ${b}`)
        }, "")

        const result = await client.query(`SELECT * FROM ${this.tableName} ${where};`)

        return result.rows;
    }

    async findOne(obj) {
        const data = await this.find(obj)
        return data.length ? data[0] : null
    }

    async create(obj) {
        return await client.query(`INSERT INTO ${this.tableName} (${Object.keys(obj).join(", ")}) VALUES(${Object.values(obj).map(e => `'${e}'`).join(", ")})`)
    }
}