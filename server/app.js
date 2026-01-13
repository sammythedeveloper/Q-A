require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

const app = express();
const port = process.env.PORT || 3500;

/* ===============================
   CORS CONFIG
================================ */
const allowedOrigins = [
  "http://localhost:3000",
  "https://sammythedeveloper.github.io",
  "https://sammythedeveloper.github.io/Q-A",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman, curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.options("*", cors()); // allow preflight
app.use(express.json()); // body parser

/* ===============================
   TEST ROUTE
================================ */
app.get("/api/test", async (req, res) => {
  try {
    const [rows] = await dbConnection.query("SELECT 1");
    console.log("DB query worked:", rows);
    res.json({ msg: "DB query works!" });
  } catch (err) {
    console.error("DB query failed:", err);
    res.status(500).json({ msg: "DB query failed", error: err.message });
  }
});


/* ===============================
   ROUTES
================================ */
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/answers", require("./routes/answerRoute"));

/* ===============================
   GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.message);
  res.status(500).json({ msg: err.message });
});

/* ===============================
   START SERVER
================================ */
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

/* ===============================
   DB TEST AT START
================================ */
(async () => {
  try {
    await dbConnection.execute("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
