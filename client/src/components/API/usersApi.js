
class ApiUser {
  URL = "http://localhost:5000/users/";
  HEADER = { "Content-Type": "application/json" }

  async getUsers() {
    return await fetch(this.URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch(error => {
        throw error;
      })
  }

  async createUser(user) {
    return fetch(this.URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: this.HEADER
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      })
  }

  async deleteUser(id) {
    return fetch(`${this.URL}${id}`, {
      method: 'DELETE',
      headers: this.HEADER
    })
      .then(response => {
        return response.json()
      })
      .catch(error => {
        throw error
      })
  }

  async updateUser(user) {
    return fetch(this.URL, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: this.HEADER
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      })
  }
}

export default new ApiUser();
