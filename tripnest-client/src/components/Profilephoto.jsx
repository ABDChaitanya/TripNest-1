import { useEffect, useState } from "react";
import api from "../services/api";
import "./profilephoto.css";

export default function Profilephoto({ user, token }) {
    const [photo, setPhoto] = useState(user.profilePhoto || "");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setPhoto(user.profilePhoto || "");
    }, [user.profilePhoto]);

    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previousPhoto = photo;
        const previewUrl = URL.createObjectURL(file);
        setPhoto(previewUrl);
        const formData = new FormData();
        formData.append("photo", file);

        try {
            setUploading(true);
            const response = await api.put("/users/profile-photo", formData, {
                headers: { authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setPhoto(response.data.profilePhoto);
            URL.revokeObjectURL(previewUrl);
            alert("Profile photo updated!");
        } catch (error) {
            setPhoto(previousPhoto);
            URL.revokeObjectURL(previewUrl);
            alert(error.response?.data?.message || "Photo upload failed");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    return (
        <div className="profile-photo-container">
            <div className="profile-photo">
                {photo ? <img src={photo} alt="Your profile" className="profile-photo-image" /> : <div className="default-avatar" aria-hidden="true">☺</div>}
                <label className={`camera-button${uploading ? " is-uploading" : ""}`} title={uploading ? "Uploading photo" : "Upload profile photo"}>
                    <span aria-hidden="true">{uploading ? "…" : "+"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploading} hidden />
                </label>
            </div>
        </div>
    );
}
