import ProjectConfig from "../assets/ProjectConfig.json"

export async function request(url: string, body: any) {
    return await fetch(
        `${ProjectConfig.server}/${url}`,
        {
            mode: 'cors',
            credentials: 'omit',
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    ).then(res => res.json())
}