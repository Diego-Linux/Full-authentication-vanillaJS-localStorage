// If user is logged, he can't access login or register screen
// cause he's already is logged
if (localStorage.getItem('myToken')) {
    location = "home.html"
}


