export const userFun = async (urlPath, otherContent) => { 
    const BACKEND_URL = 'https://ad13-2409-40f2-103c-526f-dda0-3384-5577-6576.ngrok-free.app/api/';
    const url = BACKEND_URL + urlPath;

    const res = await fetch(url, {
        method: "POST",
    });

    if(res) {
        const json = await res.json();  
        return { status: 200, message: json.message };
    } else {
        return { status: 500, message: "Something went wrong" };
    }
}