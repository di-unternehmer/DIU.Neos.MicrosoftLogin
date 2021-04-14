var auth_code;
var formUrl = null;

function onSignIn(microsoftloginUser) {
    var profile = microsoftloginUser.getBasicProfile();
    var authResponse = microsoftloginUser.getAuthResponse(true);
    $('.g-signout').addClass('g-signout-show');
    $('#username').val(profile.getEmail());
    $('#password').val(authResponse.access_token);
    var code = getParameterByName('code');
    var state = getParameterByName('state');
    var session_state = getParameterByName('session_state');
    console.log(code);

    if (code !== '' && state !== '' && session_state !== '') {
        $('#code').val(code);
        $('#state').val(state);
        $('#session_state').val(session_state);
    }

    gapi.auth2
        .getAuthInstance()
        .grantOfflineAccess()
        .then(function (resp) {
            auth_code = resp.code;
            console.log(resp);
            //addParameterToURL('code='+ encodeURI(auth_code));
            //$('.neos-login-btn').trigger('click');
        });

    //console.log(profile);
    //console.log(authResponse);
    //console.log(gapi.auth2.getAuthInstance().grantOfflineAccess());
    //console.log(gapi.auth2);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('.g-signout').removeClass('g-signout-show');
        $('#username').val('');
        $('#password').val('');
    });
}

function addParameterToURL(param) {
    if (!formUrl) {
        formUrl = $('.neos-login-form').attr('action');
    }
    formUrl += (formUrl.split('?')[1] ? '&' : '?') + param;
    $('.neos-login-form').attr('action', formUrl);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
