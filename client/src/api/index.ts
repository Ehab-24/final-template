export async function getTokenPair(username: string, password: string): Promise<{ access: string, refresh: string } | null> {
    try {
        const response = await fetch(apiURL('token/'), {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status != 200) return null
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createUser(username: string, password: string): Promise<any | null> {
    try {
        let response = await fetch(apiURL('users/'), {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status != 200) return null
        return response.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

function apiURL(path: string): string {
    return `http://127.0.0.1:8000/api/${path}`
}
