export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
        this._infoName = document.querySelector(this._name);
        this._infoJob = document.querySelector(this._job);
    }
    getUserInfo() {
        return { name: this._infoName.textContent, job: this._infoJob.textContent }

    }
    setUserInfo(input) {
        this._infoName.textContent = input.name;
        this._infoJob.textContent = input.job;        
    }
}