const express = require("express");
const app = express();
const PORT = 3000;
const parser = require("body-parser");
const mysql = require("mysql");
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "vgy@localhost",
        password: "Vgyt@1987",
        database: "animals"
    }
);

connection.connect();

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.get(
    "/dogs",
    (req,res) => {
        const sql = "SELECT * FROM dogs";
        connection.query(
            sql,
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.get(
    "/dogs/name",
    (req,res) => {
        const sql = "SELECT name FROM dogs";
        connection.query(
            sql,
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.get(
    "/dogs/name/since2001",
    (req,res) => {
        const sql = "SELECT name FROM dogs WHERE birthdate > '2001-01-01'";
        connection.query(
            sql,
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.get(
    "/dogs/name/a",
    (req,res) => {
        const sql = "SELECT name FROM dogs WHERE name LIKE '%a%'";
        connection.query(
            sql,
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.get(
    "/dogs/name/J",
    (req,res) => {
        const sql = "SELECT name FROM dogs WHERE name LIKE 'J%'";
        connection.query(
            sql,
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.get(
    "/dogs/name/:order",
    (req,res) => {
        const order = req.params.order;
        const sql = `SELECT name FROM dogs ORDER BY birthdate ${order};`;
        
        connection.query(
            sql,
            (error, results) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.post('/dogs',
    (req, res) => {
        const formData = req.body;
        connection.query('INSERT INTO dogs SET ?',
            formData,
            (err, results) => {
                if(err){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.put(
    "/dogs/:id",
    (req,res) => {

        const sql = "UPDATE dogs SET ? WHERE id = ?";
        const idDog = req.params.id;
        const formData = req.body;
        
        connection.query(
            sql,
            [formData, idDog],
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.put(
    "/dogs/toggle/:id",
    (req,res) => {
        const sql = "UPDATE dogs SET black_hair = NOT black_hair WHERE id = ?";
        const idDog = req.params.id;
        connection.query(
            sql,
            [idDog],
            (error, results, fields) => {
                if( error ){
                    res.status(501).send("bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.delete(
    "/dogs/:id",
    (req, res) => {
        const sql = "DELETE FROM dogs WHERE id = ?";
        const idDog = req.params.id;
        connection.query(
            sql,
            [idDog],
            (error, results, fields) => {
                if(error){
                    res.status(501).send("Bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.delete(
    "/dogs/dead",
    (req, res) => {
        const sql = "DELETE FROM dogs WHERE black_hair = false";
        connection.query(
            sql,
            (error, results, fields) => {
                if(error){
                    res.status(501).send("Bad request");
                } else {
                    res.json(results);
                }
            }
        );
    }
);

app.listen(PORT, () => {
    console.log("Server is running");
});