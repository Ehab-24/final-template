export function setTokenPair(access: string, refresh: string) {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
}

export function getTokenPair(): [string | null, string | null] {
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    return [access, refresh]
}

export function removeTokenPair() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export function hasTokens(): boolean {
    return !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token')
}

