import mysql from 'mysql2';

const pool = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "Raj@882714",
        database: "testdb"
    }
);

export default pool;