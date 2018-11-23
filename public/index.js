'use strict';

function logIn(){
	$('#login-form').submit(event => {

        event.preventDefault();

        //has to be username and password for auth to work, even though username is email
        const user = {
            username: $('#username').val(),
            password: $('#password').val()
        };
        console.log("Logging in student");
        $.ajax({
            url: "/auth/login",
            dataType: "json",
            type: 'POST',
            contentType : "application/json",
            data: JSON.stringify(user)
        })
            .then(data => {
                let jwt = data.authToken;
                sessionStorage.setItem('Bearer',jwt);
                const pageName = "./home.html";
                $(location).attr('href', pageName);
            })
            .catch(err => {
                $('.error-message').html('<span class="notification-message">Username and/or Password is incorrect</span>');
                $('.error-message').prop('hidden',false);
            })
    })
}

$(logIn);