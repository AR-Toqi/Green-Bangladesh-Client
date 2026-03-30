import React from "react";

export default function RegisterPage() {
  return (
    <div className="container py-10">
      <h1>Register</h1>
      <form>
        {/* Basic registration form fields */}
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
