export async function requestPost(url: string, body: any) {
    const server = "http://laojk.club:8080/api"
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

export async function requestGet(url: string) {
    const server = "http://laojk.club:8080/api"
    return await fetch(
        `${server}/${url}`,
        {
            mode: 'cors',
            credentials: 'omit',
            redirect: 'follow',
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        }
    ).then(res => res.json())
}