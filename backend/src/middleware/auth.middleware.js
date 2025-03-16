import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({
        status: 404,
        message: "Unauthorized user, not logged in",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(404).json({
        message: "Invalid token",
        status: 404,
      });
    }
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
