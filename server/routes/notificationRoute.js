const express = require("express");
const router = express.Router();
const {
  getUnreadNotifications,
  markAsRead,
} = require("../controller/notificationControl");
const authMiddleware = require("../middleware/authMiddleware");

// GET unread for the bell
router.get("/unread", authMiddleware, getUnreadNotifications);

// PATCH to clear it when clicked
router.patch("/mark-as-read/:notificationId", authMiddleware, markAsRead);

module.exports = router;
