import React from "react";

export default function ResetPasswordPage() {
  return (
    <div className="container py-10">
      <h1>Reset Password</h1>
      <form>
        <div>
          <label>New Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
