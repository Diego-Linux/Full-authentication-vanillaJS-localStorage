document.addEventListener('DOMContentLoaded', () => {
    if (!(localStorage.getItem('myToken'))) {
        location.href = "login.html"
        alert('You are not authenticated')
    }

    logoutUser = () => {
        localStorage.removeItem('myToken');
        location.href = "login.html"
    }

    document.getElementById('logout')
        .addEventListener('click', logoutUser)
})



