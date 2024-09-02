import bcrypt from "bcryptjs";

const users = [{
    userName: "admin",
    password: bcrypt.hashSync("password123", 10)
}];

export const login =({ userName, password}) => {
    const user = users.find(user => user.userName === userName);

    if(user && bcrypt.compareSync(password, user.password)) {
        //Guardar ususario en localStorage
        localStorage.setItem("user", JSON.stringify({userName}));
        return true;
    }

    return false;
};

export const isAuthenticated = () => {
    return localStorage.getItem("user") !== null;
};

export const logout = () => {
    localStorage.removeItem("user");
};
