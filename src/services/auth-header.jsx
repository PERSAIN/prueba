export default function authHeader() {
    const auth = localStorage.getItem('Token');
    if (auth) {
      return  'Bearer ' +  auth;
    } else {
      return {};
    }
  }