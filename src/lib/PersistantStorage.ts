export function write(app: string, key: string, value: string) {
    window.localStorage.setItem(`${app}-${key}`, value)
    return value
}

export function read(app: string, key: string) {
    return window.localStorage.getItem(`${app}-${key}`)
}