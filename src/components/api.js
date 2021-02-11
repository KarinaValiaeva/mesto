class Api {
    constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers
    }
  
    getInitialCards() {
        return fetch(this._baseUrl, this._headers)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
      }
  
    // другие методы работы с API
  }
  
