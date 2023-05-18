export default class UserInfo {
    constructor(userInformation) {
      this._profileName = document.querySelector(userInformation.profileNameSelector);
      this._profileJob = document.querySelector(userInformation.profileJobSelector);
      this.profileAvatar = document.querySelector(userInformation.profileAvatarSelector)
    };
  
    getUserInfo() {
      return {
        title: this._profileName.textContent,
        job: this._profileJob.textContent
      }
    };
  
    setUserInfo(dataOfUser) {
      this._profileName.textContent = dataOfUser.name;
      this._profileJob.textContent = dataOfUser.job;
      this.profileAvatar.src = dataOfUser.avatar;
    };
  };