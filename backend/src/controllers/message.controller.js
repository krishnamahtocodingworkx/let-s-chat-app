import User from "../models/user.model.js";
import Message from "../models/message.mode.js";
import cloudinary from "../lib/cloudinary.js";
export const getAllUsers = async (req, res) => {
  try {
    const myId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: myId } });
    return res.status(200).json({
      status: 200,
      message: "All users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    console.log(`Error in getAllUsers ${error}`);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    if (!receiverId) {
      return res.status(400).json({
        status: 400,
        message: "Receiver id is required",
      });
    }
    const myId = req.user._id;

    const allMessages = await Message.find({
      $or: [
        { senderId: myId, receiverId },
        { receiverId, senderId: myId },
      ],
    });
    return res.status(200).json({
      message: "Messages fetched successfully",
      data: allMessages,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in getMessages ${error}`);
    return res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const { message, image } = req.body;
    const myId = req.user._id;
    if (!receiverId) {
      return res.status(400).json({
        status: 400,
        message: "Receiver id is required",
      });
    }
    if (!message && !image) {
      return res.status(400).json({
        status: 400,
        message: "Message or image at least one field is required",
      });
    }
    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: receiverId,
      text: message,
      image: imageUrl,
    });

    // TODO : add socket io
    const savedMessage = await newMessage.save();

    return res.status(200).json({
      message: "Message sent successfully",
      data: savedMessage,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in sending message ${error}`);
    return res.status(500).json({
      message: "Something went wrong",
      status: 500,
    });
  }
};
