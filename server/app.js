require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

const app = express();
const port = process.env.PORT || 5500; // NO fallback
const notificationRoutes = require("./routes/notificationRoute");

/* ===============================
   CORS CONFIG
================================ */
const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

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
app.use("/api/notifications", notificationRoutes);
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
   START SERVER (ONLY ONCE)
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
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
