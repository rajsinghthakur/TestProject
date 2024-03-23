import express from 'express';
import bodyParser from 'body-parser';
import pool from './dbconfig.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Insert
app.post("/insert", (request, response, next) => {
    pool.getConnection((err, con) => {
        if (err) {
            // console.log(err);
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "insert into student (name, rollNumber, contactNumber, address) values ('raj thakur','47','8827142014','khandwa naka, Indore')";
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return response.status(401).json({ message: "bead request" });
                } else {
                    return response.status(200).json({ message: "insert success" });
                }
            });
        }
    });
});

// Read
app.get("/read", (request, response, next) => {
    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "select * from student";
            con.query(sql, (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    return response.status(200).json({ data: result });
                }
            });
        }
    })
})

// search
app.get("/search", (request, response, next) => {
    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "select * from student where rollNumber = '38'";
            con.query(sql, (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    return response.status(200).json({ data: result });
                }
            });
        }
    })
})

// Update
app.put("/update", (request, response, next) => {
    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "update student set name = 'prakash' where rollNumber = '45'";
            con.query(sql, (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    return response.status(200).json({ message: "student update success" });
                }
            });
        }
    })
})

// Delete
app.delete("/delete", (request, response, next) => {
    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "delete from student where rollNumber = '46'";
            con.query(sql, (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    return response.status(200).json({ message: "delete success" });
                }
            });
        }
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})