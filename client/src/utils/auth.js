import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  login(userToken) {
    localStorage.setItem("user_token", userToken);
    window.location.assign("/");
  }

  loggedIn() {
    const token = this.getToken();
    console.log(token);
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("user_token");
    window.location.reload();
  }

  getToken() {
    return localStorage.getItem("user_token");
  }
};

export default new AuthService();