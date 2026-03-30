import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="container py-10">
      <h1>Forgot Password</h1>
      <form>
        <div>
          <label>Email Address</label>
          <input type="email" placeholder="Enter your registered email" />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
