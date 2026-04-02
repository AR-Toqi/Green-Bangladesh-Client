import { testGetMeApi } from "@/services/test-auth.service";
import { getAccessToken } from "@/lib/cookieUtils";
import * as jwt from "jsonwebtoken";

export default async function TestAuthPage() {
    const results = await testGetMeApi();
    const token = await getAccessToken();
    let decoded = null;
    try {
        if (token) decoded = jwt.decode(token);
    } catch (e) {}

    return (
        <div className="p-10 bg-black text-white min-h-screen">
            <h1 className="text-3xl font-black mb-8 text-green-500 underline">Auth Diagnostic Results</h1>
            
            <div className="mb-10 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-zinc-300">Token Payload (JWT Decode)</h2>
                {decoded ? (
                    <pre className="p-4 bg-black rounded-xl border border-zinc-800 text-green-400 font-mono text-xs overflow-auto">
                        {JSON.stringify(decoded, null, 2)}
                    </pre>
                ) : (
                    <p className="text-red-500">No token found or token is not a valid JWT</p>
                )}
            </div>

            <h2 className="text-xl font-bold mb-4 text-zinc-300">Endpoint Tests (GET /api/users/me)</h2>
            <div className="space-y-4">
                {results.map((res: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold">{res.name}</span>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${res.ok ? 'bg-green-900/40 text-green-500 border border-green-800' : 'bg-red-900/40 text-red-500 border border-red-800'}`}>
                                {res.status || "ERROR"} {res.ok ? "SUCCESS" : "FAILED"}
                            </span>
                        </div>
                        {res.error && <p className="mt-4 p-4 bg-red-950/20 text-red-400 border border-red-900/30 rounded-xl font-mono text-sm">{res.error}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
