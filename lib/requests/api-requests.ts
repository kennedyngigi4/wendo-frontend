

export const ApiRequests = {

    post: async function(url: string, data: FormData | Record<string, any>, token?: string): Promise<any> {

        try{ 
            const isFormData = data instanceof FormData;
            const headers: Record<string, any> = {};

            if(token) headers["Authorization"] = `Bearer ${token}`;
            if (!isFormData) headers["Content-Type"] = "application/json";

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
                method: "POST",
                headers: headers,
                body: isFormData ? data : JSON.stringify(data),
            });

            const resp = await response.json();

            if(!response.ok && !resp.success){
                return { success: false, errors: resp?.errors || "Request failed." }
            }

            return resp;

        } catch (err) {
            return { success: false, errors: "A network error occured." }
        }
    },


    get: async function ( url: string, token?: string, serverReq?: boolean ): Promise<any> {
        try {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const baseUrl = serverReq
                ? process.env.API_URL
                : process.env.NEXT_PUBLIC_API_URL;

            if (!baseUrl) {
                throw new Error("API base URL is not defined");
            }

            const cleanUrl = url.startsWith("/") ? url.slice(1) : url;

            const finalUrl = `${baseUrl}/${cleanUrl}`;

            console.log("🌐 API REQUEST:", finalUrl);

            const response = await fetch(finalUrl, {
                method: "GET",
                headers,
                cache: serverReq ? "no-store" : "default",
            });

            console.log("📡 STATUS:", response.status);

            const contentType = response.headers.get("content-type") || "";

            let resp;

            if (contentType.includes("application/json")) {
                resp = await response.json();
            } else {
                const text = await response.text();
                console.log("⚠️ NON-JSON RESPONSE:", text);
                throw new Error("API did not return JSON");
            }

            if (!response.ok) {
                console.log("❌ API ERROR RESPONSE:", resp);
                throw new Error(resp?.errors || `Request failed with ${response.status}`);
            }

            console.log("✅ API SUCCESS:", {
                count: resp?.count,
                results: resp?.results?.length,
            });

            return resp;
        } catch (err: any) {
            console.log("🔥 FETCH ERROR:", err.message || err);

            return {
                success: false,
                errors: err?.message || "A network error occurred",
                count: 0,
                results: [],
            };
        }
    },


    patch: async function (url: string, data: FormData | Record<string, any>, token: string): Promise<any> {
        try {
            const isFormData = data instanceof FormData;
            const headers: Record<string, any> = {};

            if (token) headers["Authorization"] = `Bearer ${token}`;
            if (!isFormData) headers["Content-Type"] = "application/json";

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
                method: "PATCH",
                headers: headers,
                body: isFormData ? data : JSON.stringify(data),
            });

            const resp = await response.json();

            if (!response.ok && !resp.success) {
                return { success: false, errors: resp?.errors || "Request failed." }
            }

            return resp;

        } catch (err) {
            return { success: false, errors: "A network error occured." }
        }
    },


    delete: async function (url: string, token: string): Promise<any> {
        try{
            const headers: Record<string, any> = {};

            if (token) headers["Authorization"] = `Bearer ${token}`;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
                method: "DELETE",
                headers: headers
            });

            const resp = await response.json();

            if (!response.ok) {
                return { success: false, errors: resp?.errors || "Request failed." }
            }

            return resp;

        } catch(err) {
            return { success: false, errors: "A network error occured." }
        }
    }
}


