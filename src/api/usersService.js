const API_URL = "https://dummyjson.com"

export default class UsersService 
{
    static async getAll(limit = 30, skip = 0) {
        const response = await fetch(API_URL + `/users?limit=${limit}&skip=${skip}`)
        checkResponse(response)
        const data = await response.json()
        return data
    }

    static async search(query, limit = 30, skip = 0) {
        const response = await fetch(API_URL + `/users/search?q=${query}&limit=${limit}&skip=${skip}`)
        checkResponse(response)
        const data = await response.json()
        return data
    }
}

function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`Сервер возвратил код ошибки: ${response.status} ${response.statusText}`)
    }
}