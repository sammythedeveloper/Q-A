require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3500; 

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://sammythedeveloper.github.io",
  "https://sammythedeveloper.github.io/Q-A",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);



//db connection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRoutes = require("./routes/userRoute");

//questions routes middleware
const questionsRoutes = require("./routes/questionRoute");

//answer route middleware

const answerRoutes = require("./routes/answerRoute");

//authentication middleware

const authMiddleware = require("./middleware/authMiddleware");

// json middleware to extract jason data
app.use(express.json());

//user routes middleware
app.use("/api/users", userRoutes);

//questions routes middleware??

app.use("/api/questions", questionsRoutes);

//answer routes middleware

app.use("/api/answers",answerRoutes);



async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
