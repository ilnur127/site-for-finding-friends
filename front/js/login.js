let elemLogInUzer = document.querySelector('#YourLogIn').children,
    SignInRequest = {};
$('#btn-logIn').click(function() {
    elemLogInUzer = Array.prototype.slice.call(elemLogInUzer);
    elemLogInUzer.forEach(function(elem, i) {
        if (i == 0) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignInRequest['login'] = elem[1].value;
        }
        if (i == 1) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignInRequest['password'] = elem[1].value;
        }
    });
    var Request = JSON.stringify(SignInRequest);
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/users/sign-in");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var lol = JSON.parse(request.responseText);
            console.log(lol);
            if (lol['success'] === false) {
                document.getElementById("fail").innerHTML = lol['message'];
            } else {
                localStorage.setItem("login", lol['message']);
                window.location.replace('./active.html');
            }
        }
    }
    request.send(Request);
    SignInRequest = {};
});
$('.logIn_back').click(function() {
    window.location.replace('./index.html');
});