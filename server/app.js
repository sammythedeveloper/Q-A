require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConfig");

const app = express();
const port = process.env.PORT || 5500;

// 1. Middleware
const corsOptions = {
  origin: ["https://stackyapp.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

/* ===============================
   HEALTH & DB CHECK ROUTES
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
   API ROUTES
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
  res.status(err.status || 500).json({
    success: false,
    msg: err.message || "Internal Server Error",
  });
});

/* ===============================
   SERVER INITIALIZATION
================================ */
async function startServer() {
  try {
    // Test DB connection before starting the server
    await dbConnection.execute("SELECT 1");
    console.log("✅ Database connected to Aiven");

    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed. Server not started.");
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
}

startServer();
