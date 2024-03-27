import express from 'express';
import bodyParser from 'body-parser';
import pool from './dbconfig.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Insert
app.post("/insert", (request, response, next) => {
    const name = request.body.name;
    const rollNumber = request.body.rollNumber;
    const contactNumber = request.body.contactNumber;
    const address = request.body.address;

    pool.getConnection((err, con) => {
        if (err) {
            // console.log(err);
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "insert into student (name, rollNumber, contactNumber, address) values ('" + name + "','" + rollNumber + "','" + contactNumber + "','" + address + "')";
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return response.status(401).json({ message: "bead request", err });
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

// search ny roll number
app.get("/searchByRollNo", (request, response, next) => {
    const rollNumber = request.body.rollNumber;

    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "select * from student where rollNumber = '" + rollNumber + "'";
            con.query(sql, (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    if (result[0])
                        return response.status(200).json({ data: result });
                    else
                        return response.status(401).json({ message: "unautherized request" });

                }
            });
        }
    })
})
// search by Id
app.get("/searchById", (request, response, next) => {
    const id = request.body.id;

    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "select * from student where id = " + id + "";
            con.query(sql, (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    if (result[0])
                        return response.status(200).json({ data: result });
                    else
                        return response.status(401).json({ message: "unautherized request" });

                }
            });
        }
    })
})

// Update
app.put("/update", (request, response, next) => {
    const name = request.body.name;
    const rollNumber = request.body.rollNumber;
    const contactNumber = request.body.contactNumber;
    const address = request.body.address;
    const id = request.body.id;

    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "update student set name = ?, rollNumber = ?, contactNumber = ?, address = ? where id = ?";
            con.query(sql, [name, rollNumber, contactNumber, address, id], (err, result) => {
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
    const rollNumber = request.body.rollNumber;
    pool.getConnection((err, con) => {
        if (err) {
            return response.status(500).json({ error: "internal server error", err });
        } else {
            let sql = "delete from student where rollNumber = ?";
            con.query(sql, [rollNumber], (err, result) => {
                if (err) {
                    return response.status(401).json({ error: "bed request", err });
                } else {
                    if (result.affectedRows)
                        return response.status(200).json({ message: "delete success" });
                    else
                        return response.status(401).json({ message: "unautherized request" });
                }
            });
        }
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})