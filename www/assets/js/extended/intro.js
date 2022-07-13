let user_first_login = localStorage.getItem('user-first-login')

document.querySelector('.skip').addEventListener('click', ()=>{
    check_user_first_login(user_first_login)
})


function check_user_first_login(result){

    if(result){

        loggingUser(result);
        
    }

}