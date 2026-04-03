
const API_BASE_URL = "http://localhost:5000/api/v1";

async function test() {
  try {
    // 1. Register a random user
    const email = `test${Date.now()}@test.com`;
    console.log("Registering", email);
    const regRes = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test User", email, password: "password123" })
    });

    // Attempt Login to get token
    const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" })
    });
    const loginData = await loginRes.json();
    const token = loginData?.data?.accessToken;

    if (!token) {
      console.log("No token", loginData);
      return;
    }

    // 2. Fetch /users/me
    console.log("Fetching /users/me");
    const meRes = await fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: token }
    });
    console.log("/users/me Status:", meRes.status);
    console.log("/users/me Body:", await meRes.text());

    // Update User test
    console.log("Fetching PUT /users/me or /users");
    const updateRes = await fetch(`${API_BASE_URL}/users/me`, {
      method: "PUT",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Test User" })
    });
    console.log("PUT /users/me Status:", updateRes.status);
    console.log("PUT /users/me Body:", await updateRes.text());

    // 3. Fetch /plantations/my
    console.log("Fetching /plantations");
    const planRes = await fetch(`${API_BASE_URL}/plantations`, {
      headers: { Authorization: token }
    });
    console.log("/plantations Status:", planRes.status);
    console.log("/plantations Body:", await planRes.text());

  } catch (e) {
    console.error(e);
  }
}
test();
