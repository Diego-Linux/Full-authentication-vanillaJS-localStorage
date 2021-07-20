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
    else if (user.password.length < 6) {
        alert('Password must be contain at least 6 characters')
    }
    else {
        dbUser.push(user)
        setLocalUserStorage(dbUser)
        location.href = "login.html"
    }

}
// GENERATE TOKEN CODE

//NOTE: Don't use this "token" in a real application, it's not safe
function decToHex(dec) {
    return (dec.toString(16)).substr(-2)
}

getToken = () => {
    let arr = new Uint8Array((57.7) / 3)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, decToHex).join('')
}
// END GENERATE TOKEN CODE

loginUser = () => {
    const dbUser = getLocalUserStorage()

    let user = {
        email: document.getElementById('logemail').value,
        password: document.getElementById('logpassword').value,
    }

    let userExists = dbUser.filter((data) => {
        return data.email == user.email && data.password == user.password
    }).length;

    if (userExists) {
        localStorage.setItem('myToken',
            getToken());

        localStorage.getItem('myToken');

        location = "home.html"
    } else {
        alert('User not found')
    }
}