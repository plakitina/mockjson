var isLogged = false;
var button1 = document.getElementById('button1');
button1.addEventListener('click', function () {
    document.getElementById('reg').style.display = "grid";
    document.getElementById('log').style.display = "none";
});
var button2 = document.getElementById('buttonc');
button2.addEventListener('click', function () {
    document.getElementById('reg').style.display = "none";
    document.getElementById('log').style.display = "grid";
})
function reg() {
        var name = document.forms["myForm"]["fullname"].value;
        if (name == "") {
            alert("Name must be filled out");
        }
        else {
            var pass = document.forms["myForm"]["password"].value;
            if (pass.length >= 8) {
                var i = 0;
                var n = 0;
                for (i = 0; i < pass.length; i++) {
                    var lowerCaseLetters = /[a-z]/;
                    if (pass[i].match(lowerCaseLetters)) {
                        n++;
                    }
                }
                if (n > 0) {
                    n = 0;
                    i = 0;
                    for (i = 0; i < pass.length; i++) {
                        var upperCaseLetters = /[A-Z]/g;
                        if (pass[i].match(upperCaseLetters)) {
                            n++;
                        }
                    }
                    if (n > 0) {
                        n = 0;
                        i = 0;
                        for (i = 0; i < pass.length; i++) {
                            var symbols = /[^a-zA-Z\d]/g;
                            if (pass[i].match(symbols)) {
                                n++;
                            }
                        }
                        if (n > 0) {
                            var mail = document.forms["myForm"]["email"].value;
                            if (mail == "") {
                                alert("Email must be filled out");
                                return;
                            }
                            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                            if (mail.match(mailformat)) {
                                var obj = {
                                    "full_name": name,
                                    "email": mail,
                                    "password": pass
                                }
                                var http = new XMLHttpRequest();
                                http.open("POST", 'https://my-json-server.typicode.com/plakitina/mockjson/users', false);
                                http.send(JSON.stringify(obj));
                                console.log(http.status);
                                if (http.status == 201) {
                                    nameg = name;
                                    mailg = mail;
                                    passg = pass;
                                    var modal = document.getElementById("myModal");
                                    var close = document.getElementsByClassName("close")[0];
                                    modal.style.display = "block";
                                    close.addEventListener('click', function () {
                                        modal.style.display = "none";
                                        window.location = "my-account.html";
                                    })
                                }
                                isLogged = true;
                                console.log(isLogged);

                            }
                            else {
                                alert("You have entered an invalid email address!");
                                return;
                            }
                        }
                        else {
                            alert("password must contain at least 1 special symbol(!@#$%^&)");
                            return;
                        }
                    }
                    else {
                        alert("password must contain at least 1 uppercase letter");
                        return;
                    }
                }
                else {
                    alert("password must contain at least 1 lowercase letter");
                    return;
                }
            }
            else {
                alert("password must contain at least 8 symbols");
                return;
            }
        }
}
function log_in(){
        var mail = document.forms["myForm1"]["email"].value;
        var pass = document.forms["myForm1"]["password"].value;
        var http = new XMLHttpRequest();
        http.open('GET', 'https://my-json-server.typicode.com/plakitina/mockjson/users', false);
        http.send();
        console.log(http.responseText);
        var text = JSON.parse(http.responseText);
        for (var i = 0; i < text.length; i++) {
            var obj = text[i].email;
            if (obj == mail) {
                if (text[i].password == pass) {
                    var modal = document.getElementById("myModal");
                    var close = document.getElementsByClassName("close")[0];
                    modal.style.display = "block";
                    close.addEventListener('click', function () {
                        modal.style.display = "none";
                        window.location = "my-account.html";
                    })
                    isLogged = true;
                }
            }
        }
        if (isLogged != true) {
            alert("incorrect email or password");
        }
}


