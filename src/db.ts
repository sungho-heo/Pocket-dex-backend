import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "%",
  user: "user1",
  password: "1234",
  database: "poketmon_database",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

export default connection;
