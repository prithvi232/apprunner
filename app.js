const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");

/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  // host: "3.219.45.61",
  host: "10.2.0.98:3306",
  user: "user" /* MySQL User */,
  password: "Password@123" /* MySQL Password */,
  database: "new" /* MySQL Database */,
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected with App...");
});

app.get("/", function (req, res) {
  res.send("welcome");
});
/**
 * Get All Items
 *
 * @return response()
 */
app.get("/api/user", (req, res) => {
  console.log("--->");
  let sqlQuery = "SELECT * FROM users ";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000, () => {
  console.log("Server started on port 6000...");
});
