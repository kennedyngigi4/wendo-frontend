

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


    get: async function (url: string, token?: string, serverReq?: boolean): Promise<any> {
        
        try{
            const headers: Record<string, any> = {};

            if(token) headers["Authorization"] = `Bearer ${token}`;

            const response = await fetch(serverReq ? `${process.env.API_URL}/${url}` : `${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
                method: "GET",
                headers: headers
            });

            const resp = await response.json();
            
            if(!response.ok){
                return { success: false, errors: resp?.errors || "Request failed." }
            }

            return resp;

        } catch (err) {
            return { success: false, errors: "A network error occured." }
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


