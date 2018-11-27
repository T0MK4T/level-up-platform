'use strict';

function logInListener(){
	$('#login-form').submit(event => {

        event.preventDefault();

        //has to be username and password for auth to work, even though username is email
        const user = {
            username: $('#email').val(),
            password: $('#password').val()
        };
        logIn(user);
	})
}

function logIn(user){
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
}


function signUp () {
    $('#signup-form').submit(event => {

        event.preventDefault();

        const signInfo = {
            email: $('#email-reg').val(),
            password: $('#password-reg').val(),
            confirmPassword: $('#confirm-password').val(),
            firstName:$('#fName').val(),
            lastName: $('#lName').val(),
        };
        console.log(signInfo);

        if(!(signInfo.password == signInfo.confirmPassword)) {
            console.log(signInfo);
            //alert that passwords do not match
        }
        else {
           $.ajax({
               url : "/student",
               dataType: "json",
               type: 'POST',
               contentType : "application/json",
               data: JSON.stringify(signInfo)
            })
               .then(signInfo => {
               	let user = {
               		username: signInfo.email,
               		password: $('#password-reg').val()
               	};
               	logIn(user);
            })
               .catch(err => {
               		console.log("sign up failed");
               	})
        }
})};


 function handlePageEvents(){
 	logInListener();
 	signUp();
 }
 $(handlePageEvents)