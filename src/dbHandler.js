const mysql = require('mysql2');

// Initialize database connection
const con = mysql.createConnection({
    host: process.env.db_ip,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_password, 
    database: process.env.db
});


async function mx_records_google(file_name, email_address, is_valid) {
    try {
        let sql = "INSERT INTO mx_records_google (file_name, email_address, is_valid) VALUES (?, ?, ?)";
        await con.execute(sql, [file_name, email_address, is_valid]);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    mx_records_google
};
