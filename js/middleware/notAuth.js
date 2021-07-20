// if the user is not logged in, he cannot access the home screen
// So this middleware redirects to the login page
if (!(localStorage.getItem('myToken'))) {
    location = "login.html"
    alert('You are not authenticated')
}





