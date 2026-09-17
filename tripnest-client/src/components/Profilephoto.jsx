import { useState } from "react";
import axios from "axios";
import api from "./../services/api"
export default function Profilephoto({ user, token, setToken }) {
    const [photo, setPhoto] = useState(user.Profilephoto || "");
    const [uploading, setUploading] = useState(false);
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;
        // Keep the old photo in case upload fails
        const previousPhoto = photo;

        // Show preview immediately
        const previewUrl = URL.createObjectURL(file);
        setPhoto(previewUrl);

        const formData = new FormData();
        formData.append("photo", file);

        try {
            setUploading(true);

            const response = await api.put(
                "/users/profile-photo",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            // Replace preview with actual Cloudinary URL
            setPhoto(response.data.profilePhoto);

            // Free the temporary browser URL
            URL.revokeObjectURL(previewUrl);

            alert("Profile photo updated!");
        } catch (error) {
            // Restore previous photo
            setPhoto(previousPhoto);

            URL.revokeObjectURL(previewUrl);

            alert(
                error.response?.data?.message ||
                "Photo upload failed"
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="profile-photo-container">

            <div className="profile-photo">

                {photo ? (
                    <img style={{height: 132, width: 130 ,borderRadius: '50%' ,position: 'relative',top: 13}}
                src={photo}
                alt="Profile"
                    />
                ) : (
                <div className="default-avatar">
                    👤
                </div>
                )}

                <label className="camera-button">
                    📷

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        hidden
                    />
                </label> 

            </div>

        </div>
    );
}