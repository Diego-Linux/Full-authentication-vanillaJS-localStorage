document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('myToken')) {
        location.href = "home.html"
    }
})

