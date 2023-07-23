
export const userFun = async (urlPath, body, headers) => { 
    const BACKEND_URL = 'http://192.168.136.3:5000/api/';
    const url = BACKEND_URL + urlPath;

    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    if(res) {
        const json = await res.json();  
        return { status: 200, message: json.message };
    } else {
        return { status: 500, message: "Something went wrong" };
    }
}