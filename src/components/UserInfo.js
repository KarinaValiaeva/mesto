export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }
    getUserInfo() {
        const infoName = document.querySelector(this._name).textContent;
        const infoJob = document.querySelector(this._job).textContent;
        const infoValues = { name: infoName, job: infoJob };
        return infoValues;
    }
    setUserInfo(input) {
        document.querySelector(this._name).textContent = input.name;
        document.querySelector(this._job).textContent = input.job;
    }
}