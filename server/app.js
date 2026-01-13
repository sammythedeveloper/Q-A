require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3500;

const allowedOrigins = [
  "http://localhost:3000",
  "https://sammythedeveloper.github.io",
  "https://sammythedeveloper.github.io/Q-A",
];


app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false); // don't throw Error, just deny
    },
    credentials: true,
  })
);

app.options("*", cors()); // allow preflight

app.get("/", (req, res) => res.json({ msg: "Server is alive!" }));

app.options("*", cors());
app.use(express.json());

// ROUTES
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/answers", require("./routes/answerRoute"));
app.use("/api/users", require("./routes/userRoute"));


// GLOBAL ERROR HANDLER (CRITICAL)
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.message);
  res.status(500).json({ msg: err.message });
});

// START SERVER
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});


// DB TEST (SAFE)
const dbConnection = require("./db/dbConfig");
dbConnection
  .execute("SELECT 1")
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection failed:", err.message));
