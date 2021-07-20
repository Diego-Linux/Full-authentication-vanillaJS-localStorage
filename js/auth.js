// AUTHENTICATION FLOW CODE

getLocalUserStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? []
setLocalUserStorage = (dbUser) => localStorage.setItem('db_user', JSON.stringify(dbUser))

createUser = () => {
    const dbUser = getLocalUserStorage()

    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value

    }
    let userExists = dbUser.filter((data) => {
        return data.email == user.email
    }).length;

    if (userExists) {
        alert('E-mail already exists')
    }
    else {
        dbUser.push(user)
        setLocalUserStorage(dbUser)
        location.href = "login.html"
    }

}

const hashCode = function (email) {
    return email.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

loginUser = () => {
    const dbUser = getLocalUserStorage()

    const user = {
        email: document.getElementById('logemail').value,
        password: document.getElementById('logpassword').value,
    }

    let userExists = dbUser.filter((data) => {
        return data.email == user.email && data.password == user.password
    }).length;

    if (userExists) {
        let expiresIn = '7d';
        localStorage.setItem('myToken',
            hashCode(user.email),
            expiresIn);

        localStorage.getItem('myToken');

        location.href = "home.html"
    } else {
        alert('User not found')
    }
}