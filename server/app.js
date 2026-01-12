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
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg = `CORS policy does not allow access from ${origin}`;
        return callback(new Error(msg), false);
      }
    },
    credentials: true,
  })
);

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



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



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// OPTIONAL: test DB separately
(async () => {
  try {
    await dbConnection.execute("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

