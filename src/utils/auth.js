import CryptoJS from "crypto-js";

const secretKey = "patata5678";

const users = [
  {
    username: "admin",
    password: CryptoJS.AES.encrypt("password1234", secretKey).toString(),
  },
];

export const login = ({ userName, password }) => {
  const user = users.find((user) => user.userName === userName);

  if (user) {
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      secretKey
    ).toString(CryptoJS.enc.Utf8);

    if (password === decryptedPassword) {
      localStorage.setItem("user", JSON.stringify({ userName }));
      return true;
    }
  }

  return false;
};

export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

export const logout = () => {
  localStorage.removeItem("user");
};
