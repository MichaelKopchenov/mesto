export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers
        this._authorization = options.headers.authorization
        }

getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: {
        authorization: this._authorization
        }
    })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

getInitialProfile() {
    return fetch(`${this._url}/users/me`, {
        headers: {
        authorization: this._authorization
        }
    })
    .then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
}

setNewProfileData(dataOfUser) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: dataOfUser.title,
            about: dataOfUser.job,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

setNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

deleteMyCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

unputLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

}