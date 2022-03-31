//Dummy log-in credentials:
// email: example@example.com
//password: eample
var registerPageCode = `
    <div id="signInWindow">
        <p id="signInClose">&#10006;</p>
        <div id="signInWindowWrapper"> 
            <form class="signInForm" id="signInForm">
                <label>
                    E-mail:
                    <input id="signInEmail" type="text">
                </label>
                <label>
                    Password:
                    <input id="signInPassword" type="password">
                </label>
                <div class="credentialsFeedback"></div>
                <input id="signInButton" type="submit" value="Sign in">
            </form>
            <p>
                Don't have an account?<br> <a id="registerLink" href="#" class="registerLink">Register now</a>
            </p>
        </div>
    </div>
`;

var createAccountCode = `
    <form class="signInForm" id="createAccountForm">
        <label>
            Username:
            <input class="registerField" type="text">
        </label>
        <label>
            E-mail:
            <input class="registerField" type="text">
        </label>
        <label>
            Password:
            <input class="registerField" id="registerPassword1" type="password">
        </label>
        <label>
            Repeat password:
            <input class="registerField" id="registerPassword2" type="password">
        </label>
        <p class="credentialsFeedback"></p>
        <input id="registerButton" type="submit" value="Register">
    </form>
`;

const vw = (coef) => window.innerWidth * (coef / 100);
const vh = (coef) => window.innerHeight * (coef / 100);
var signedIn = false;
var loggedInUser = data[1];
var signInDisplaying = false;

function signIn() {
    for (let i = 0; i < data.length; i++) {
        let user = data[i];
        if ($('#signInEmail').val() == user.email) {    // if there's a match for user email
            if ($('#signInPassword').val() == user.password) {   // checks password
                alert("Successfully signed in");
                signedIn = true;
                loggedInUser = user;
                closeSignInWindow();
                break;
            } else {
                break;  // if the password doesn't work break the loop. Email worked, so definitely bad credentials
            }
        }
    }
    if (!signedIn) { // if after the loop has run 'signedIn' is false
        $('.credentialsFeedback').html('Incorrect credentials <br> Try again');
        $('.credentialsFeedback').css('display', 'block');
    }
}


// if ($('#signInEmail').val() == "example@example.com" && $('#signInPassword').val() == "example") {
//     alert("Successfully signed in");
//     signedIn = true;
//     // Transfer to user's account
//     closeSignInWindow();
// } else {
//     $('.credentialsFeedback').html('Incorrect credentials <br> Try again');
//     $('.credentialsFeedback').css('display', 'block');
// }

function checkCreateAccountFields() {
    let dataFields = document.querySelectorAll('.registerField');
    let flag = true;
    dataFields.forEach((field) => {
        if (field.value === "") flag = false;
    });

    if (flag == false) {
        $('.credentialsFeedback').html('Some fields are empty');
        $('.credentialsFeedback').css('display', 'block');
        flag = true;
    } else if (registerPassword1.value !== registerPassword2.value) {
        $('.credentialsFeedback').html('The passwords do not match');
        $('.credentialsFeedback').css('display', 'block');
    } else {
        $('.credentialsFeedback').css('display', 'hidden');
        alert("Created an account");
        closeSignInWindow();
    };
    return;
}

function displayCreateAccount() {
    $('#signInWindowWrapper').html(createAccountCode);
    $("#createAccountForm").submit(function (e) {
        e.preventDefault(); // <==stop page refresh==>
        checkCreateAccountFields();
    });
}

function signInWindowToggle() {
    if (signInDisplaying) {
        closeSignInWindow();
    } else displaySignInWindow();
}

function displaySignInWindow() {
    if (!signedIn) {
        $('main').after(registerPageCode);
        gsap.from('#signInWindow', { duration: 1, x: '100%', ease: 'power1.inOut' })
        // gsap.timeline().to($('#signInWindow'), 1, {
        //     width: vw(40),
        //     ease: "power1.inOut"
        // });


        // $('main').css({
        //     'filter': 'blur(5px)',
        // });
        $('main').click(closeSignInWindow);
        $('#signInClose').click(closeSignInWindow);

        $("#signInForm").submit(function (e) {
            e.preventDefault(); // <==stop page refresh==>
            signIn();
        });
        $('.registerLink').click(() => {
            displayCreateAccount();
        });
        signInDisplaying = true;
    }
}

function closeSignInWindow() {
    // $('main').css('filter', 'blur(0px)');
    gsap.to('#signInWindow', { duration: 1, x: '110%', ease: 'power1.inOut' });
    // gsap.timeline().to($('#signInWindow'), 1, {
    //     width: vw(0),
    //     ease: "power1.inOut"
    // });
    setTimeout(() => {
        document.querySelector('#signInWindow').remove();
        signInDisplaying = false;
    }, 1500);
}

// displaySignInWindow();

$(document).ready(function () {
    $('.signInButton').click(function () {
        signInWindowToggle();
    });
}); // end document.ready