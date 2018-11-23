'use strict';

//Check to see verify token
function userAuth () {

    let token = sessionStorage.getItem('Bearer');

    $.ajax({
        type: 'GET',
        url: '/auth/api/protected',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function (data) {
            $('.welcome-name').html('Hi ' + data.firstName);
        },
        error: function (request, error) {
            console.log("Request: " + JSON.stringify(request));
            $(location).attr("href", "./index.html");
        }
    })
}

$(userAuth);


function logOut () {
    $('#logout-button').on('click', event => {

        event.preventDefault();

        sessionStorage.removeItem("Bearer");

        $(location).attr('href', "./index.html");
})}

$(logOut);