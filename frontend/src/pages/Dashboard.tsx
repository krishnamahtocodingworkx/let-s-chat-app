import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button } from "@mui/material";
import { updateProfile } from "../redux/auth/AuthThunk";

const MyProfile: React.FC = () => {
  const dispatch: Function = useDispatch();
  const { userDetails, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const [image, setImage] = useState<string>(userDetails?.profilePic || "");
  const [name, setName] = useState<string>(userDetails?.name || "");
  const [email, setEmail] = useState<string>(userDetails?.email || "");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result); // Store Base64 string
        }
      };
    }
  };

  const saveHandler = () => {
    dispatch(updateProfile({ profilePic: image, _id: userDetails?._id }));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      {/* Profile Image Upload */}
      <div className="image-upload">
        <label htmlFor="imageUpload" className="image-label">
          <img
            src={image || "/logo512.png"}
            alt="Profile"
            className="profile-image"
          />
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden-input"
          onChange={handleImageChange}
        />
      </div>

      {/* User Info */}
      <div className="profile-info">
        <label className="input-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <label className="input-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <Button onClick={saveHandler}>Save</Button>
      </div>
    </div>
  );
};

export default MyProfile;
