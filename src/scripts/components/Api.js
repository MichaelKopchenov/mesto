export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers
        this._authorization = options.headers.authorization
        }
    
    _rejectPromise(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
            authorization: this._authorization
            }
        })
    .then(this._rejectPromise)
    }

    getNewCards(cardData) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name: cardData.title,
              link: cardData.link,
            })
          })
            .then(this._rejectPromise)
    }
    
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
            authorization: this._authorization
          }
        })
        .then(this._rejectPromise)
      }

    getNewUserInfo(dataOfUser) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: dataOfUser.username,
              about: dataOfUser.job,
            })
          })
          .then(this._rejectPromise)
    }

    getNewAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
          })
          .then(this._rejectPromise)
      }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
         })
         .then(this._rejectPromise)
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
         })
         .then(this._rejectPromise)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
         })
            .then(this._rejectPromise)
    }
}