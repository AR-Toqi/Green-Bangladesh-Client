import React from "react";

export default function LoginPage() {
  return (
    <div className="container py-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form className="mt-8 space-y-4">
        <div>
          <label>Email</label>
          <input type="email" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}
