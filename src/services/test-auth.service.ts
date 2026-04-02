import { cookies } from "next/headers";
import { getAccessToken } from "@/lib/cookieUtils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const testGetMeApi = async () => {
    const cookieStore = await cookies();
    const token = await getAccessToken();

    console.log("Diagnostic: Starting GET /api/users/me test...");

    const combinations: { name: string; headers: Record<string, string> }[] = [
        { name: "Bearer + Cookies", headers: { Authorization: `Bearer ${token || ""}`, Cookie: cookieStore.toString() } },
        { name: "Only Cookies", headers: { Cookie: cookieStore.toString() } },
        { name: "Only Bearer", headers: { Authorization: `Bearer ${token || ""}` } },
        { name: "x-access-token + Cookies", headers: { "x-access-token": token || "", Cookie: cookieStore.toString() } }
    ];

    const results = [];

    for (const comb of combinations) {
        try {
            const res = await fetch(`${API_BASE_URL}/users/me`, {
                method: "GET",
                headers: comb.headers,
            });
            
            results.push({
                name: comb.name,
                status: res.status,
                ok: res.ok,
            });
        } catch (err: any) {
            results.push({ name: comb.name, error: err.message });
        }
    }

    return results;
};
