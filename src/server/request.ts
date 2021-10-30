export async function request(url: string, body: any) {
    const server = "http://localhost:8080/api"
    return await fetch(
        `${server}/${url}`,
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