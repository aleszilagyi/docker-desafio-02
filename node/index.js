const express = require('express');
const mysql = require('mysql');

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'pessoas'
};

app.get('/', (req, res) => {
    const mysql_connection = mysql.createConnection(config);
    const sql_query = `INSERT INTO pessoas(name) values ('Nome Sobrenome')`;

    mysql_connection.query(sql_query, (err, result) => {
        mysql_connection.query("select * from pessoas", (err, result) => {
            if (err === null) {
                list = "";
                result.forEach(element => {
                    list += `<li>${element["name"]}</li>`
                });
                res.send("<h1>Full Cycle Rocks!</h1><br>" + list)
            } else {
                console.log(err)
            }
            mysql_connection.end()
        })
    })
})

const mysql_initial_connection = mysql.createConnection(config);
const create_table = `create table IF NOT EXISTS pessoas(id int not null auto_increment, name varchar(255), primary key(id)) `;
mysql_initial_connection.query(create_table, (err, result) => {
    console.log("MySQL Table CREATED")
    app.listen(port, () => {
        console.log("Node server listening to port: " + port)
    })
})
