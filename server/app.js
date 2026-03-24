require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

const app = express();
const port = process.env.PORT || 5500;

// 1. Updated CORS to be more flexible for deployment
app.use(cors());

app.use(express.json());

/* ===============================
   DB CHECK ROUTE
================================ */
app.get("/api/db-check", async (req, res) => {
  try {
    const [rows] = await dbConnection.query("SELECT VERSION() AS version");
    res.json({
      connected: true,
      mysqlVersion: rows[0].version,
    });
  } catch (err) {
    res.status(500).json({
      connected: false,
      error: err.message,
    });
  }
});

/* ===============================
   ROUTES
================================ */
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/notifications", require("./routes/notificationRoute"));
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
   START SERVER (ONLY ONCE at the bottom)
================================ */
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on 0.0.0.0:${port}`);
});

/* ===============================
   DB TEST AT START
================================ */
(async () => {
  try {
    await dbConnection.execute("SELECT 1");
    console.log("✅ Database connected to Aiven");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
