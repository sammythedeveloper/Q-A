const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// 1. Get all unread notifications for the logged-in user
async function getUnreadNotifications(req, res) {
  // Extract user_id from the token (via authMiddleware)
  const userId = req.user.user_id;

  try {
    // We JOIN with the users table to get the name of the person who answered (John)
    const [notifications] = await dbConnection.query(
      `SELECT 
        n.notification_id, 
        n.question_id, 
        n.message, 
        n.created_at, 
        u.username AS actor_name
      FROM notifications n
      JOIN users u ON n.actor_id = u.user_id
      WHERE n.receiver_id = ? AND n.is_read = 0
      ORDER BY n.created_at DESC`,
      [userId]
    );

    return res.status(StatusCodes.OK).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Could not fetch notifications. Please try again later." });
  }
}

// 2. Marking a notification

async function markAsRead(req, res) {
  const { notificationId } = req.params;
  const userId = req.user.user_id;

  try {
    // We check receiver_id to make sure Anna is only marking HER OWN notifications as read
    const [result] = await dbConnection.query(
      "UPDATE notifications SET is_read = 1 WHERE notification_id = ? AND receiver_id = ?",
      [notificationId, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ msg: "Notification not found or unauthorized" });
    }

    return res.status(200).json({ msg: "Notification cleared" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = { getUnreadNotifications, markAsRead };

module.exports = { getUnreadNotifications, markAsRead };
