import User from "../models/User.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // Khong hien thi chinh minh tren SideBar

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    console.error("Test conflic");
    res.status(500).json({ error: "Internal server error" });
  }
};
