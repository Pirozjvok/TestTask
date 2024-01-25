const API_URL = "https://dummyjson.com";

export default class UsersService {
  static async getAll() {
    const response = await fetch(API_URL + "/users?limit=0");
    checkResponse(response);
    const data = await response.json();
    return mapUsers(data.users);
  }

  static async search(query) {
    const response = await fetch(API_URL + `/users/search?q=${query}&limit=0`);
    checkResponse(response);
    const data = await response.json();
    return mapUsers(data.users);
  }
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Сервер возвратил код ошибки: ${response.status} ${response.statusText}`
    );
  }
}

function mapUsers(users) {
  return users.map(user => ({
    ...user,
    fullName: `${user.lastName} ${user.firstName} ${user.maidenName}`,
    shortAddress: user.address.city + ", " + user.address.address,
  }));
}
