const UsersDB = [
    { username: "who knows", password: "who knows" },
    { username: "admin", password: "admin" }
]

const findUserByUsername = username => {
    return UsersDB.find(user => user.username === username)
}

export const fakeAuthApiCall = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = findUserByUsername(username);
            if(response && response.password === password) {
                resolve({ success: true, status: 200 })
            } reject({ success: false, status: 400 })
        }, 3000)
    })
}