import React from "react";

export default function EditProfilePage() {
  return (
    <div className="container py-6 text-white">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <form>
        <div>
          <label>Full Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Bio</label>
          <textarea />
        </div>
        <div>
          <label>Avatar URL</label>
          <input type="text" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
