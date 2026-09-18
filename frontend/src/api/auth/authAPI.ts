import { ENDPOINT } from "../../global/Endpoints";

export async function login(username:string, password:string):Promise<void>{

    const res = await fetch(ENDPOINT.LOGIN,{
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                username: username,
                password: password
            }
        )});

        const data = await res.json();

        if (!res.ok || !data.success){
            throw new Error(data.error ?? "Unable to login");
        }

}

export async function register(username: string, password: string):Promise<void>{

    const res = await fetch(ENDPOINT.REGISTER,{
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });

    const data = await res.json();

    if (!res.ok || !data.success){
        throw new Error(data.error ?? "Unable to register");
    }

    return;

}

export async function me():Promise<string>{

    const res = await fetch(ENDPOINT.ME,{
        method: 'GET',
        credentials: "include"
    });

    if (!res.ok){
        throw new Error(`${res.status}: Couldn't process request!`)
    }

    const data = await res.json();

    if(!data.logged_in){
        throw new Error("User not logged in");
    }

    return data.username;
}

export async function logout(){

    const res = await fetch(ENDPOINT.LOGOUT);

    const data = await res.json();

    if (!res.ok || !data.success){
        throw new Error("${res.status}: Unable to logout");
    }

    return;
}