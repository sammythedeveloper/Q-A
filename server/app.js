require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3500;

/* ===============================
   ALLOWED ORIGINS (MUST BE FIRST)
================================ */
const allowedOrigins = [
  "http://localhost:3000",
  "https://sammythedeveloper.github.io",
  "https://sammythedeveloper.github.io/Q-A",
];

/* ===============================
   CORS CONFIG
================================ */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked: ${origin}`),
        false
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

/* ===============================
   JSON MIDDLEWARE
================================ */
app.use(express.json());

/* ===============================
   DB CONNECTION
================================ */
const dbConnection = require("./db/dbConfig");

/* ===============================
   ROUTES
================================ */
const userRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");

app.use("/api/users", userRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/answers", answerRoutes);

/* ===============================
   SERVER START
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
