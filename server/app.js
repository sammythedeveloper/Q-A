require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

const app = express();
const port = process.env.PORT || 3500;

/* ===============================
   ALLOWED ORIGINS
================================ */
const allowedOrigins = [
  "http://localhost:3000",
  "https://sammythedeveloper.github.io",
  "https://sammythedeveloper.github.io/Q-A",
];

/* ===============================
   CORS — FULLY ENABLED FOR PRE-FLIGHT
================================ */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// OPTIONS preflight handler for all routes
app.options("*", cors());

/* ===============================
   BODY PARSER
================================ */
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.originalUrl);
  next();
});

const userRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");

app.use("/api/users", userRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/answers", answerRoutes);

/* ===============================
   START SERVER
================================ */
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

/* ===============================
   DB TEST
================================ */
(async () => {
  try {
    await dbConnection.execute("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
