import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        status: 400,
        message: "Password must be at least 6 characters long",
      });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        status: 400,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, name, password: hashedPassword });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();
      return res.status(200).json({
        status: 200,
        message: "User created successfully",
        data: { ...newUser, token },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "User not created",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};
export const login = async (req, res) => {
  try {
    console.log("into login");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Password",
      });
    }
    const userData = user.toObject();
    delete userData.password;

    const token = generateToken(user._id, res);
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: { ...userData, token },
    });
  } catch (error) {
    console.log(`Error in login ${error}`);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

export const logout = (req, res) => {
  try {
    if (!req.cookies?.jwt) {
      return res.status(400).json({
        status: 400,
        message: "User not logged in",
      });
    }
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.status(200).json({
      status: 200,
      message: "User logged out successfully",
      data: {},
    });
  } catch (error) {
    console.log(`Error in Logout ${error}`);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ status: 400, message: "User ID is required" });
    }
    if (!profilePic) {
      return res.status(400).json({
        status: 400,
        message: "Profile picture is required",
      });
    }

    const uploadedProfilePic = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      // { profilePic: uploadedProfilePic },
      { profilePic: uploadedProfilePic.secure_url }, // Store only the image URL
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(`Error in updateProfile ${error}`);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const checkAuth = async (req, res) => {
  console.log("check auth called :");
  try {
    res.status(200).json({
      status: 200,
      message: "User found",
      data: req.user,
    });
  } catch (error) {
    console.log(`Error in checkAuth ${error}`);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
