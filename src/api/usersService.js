const API_URL = "https://dummyjson.com"

export default class UsersService 
{
    static async getAll() {
        const response = await fetch(API_URL + '/users')
        checkResponse(response)
        const data = await response.json()
        return data.users
    }

    static async search(query) {
        const response = await fetch(API_URL + '/users/search?q=' + query)
        checkResponse(response)
        const data = await response.json()
        return data.users
    }
}

function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`Сервер возвратил код ошибки: ${response.status} ${response.statusText}`)
    }
}