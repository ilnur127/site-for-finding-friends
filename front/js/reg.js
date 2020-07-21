let elemRegUzerInfo = document.querySelector('#yourInfo').children,
    elemRegUzerInterests = document.querySelector('#YourInterests').children,
    SignUpRequest = {},
    interest = {};

$('#btn-reg').click(function() {
    elemRegUzerInfo = Array.prototype.slice.call(elemRegUzerInfo);
    elemRegUzerInfo.forEach(function(elem, i) {
        if (i == 0) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignUpRequest['login'] = elem[1].value;
        }
        if (i == 1) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignUpRequest['password'] = elem[1].value;
        }
        if (i == 2) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignUpRequest['name'] = elem[1].value;
        }
        if (i == 3) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignUpRequest['surname'] = elem[1].value;
        }
        if (i == 4) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignUpRequest['sity'] = elem[1].value;
        }
        if (i == 5) {
            elem = elem.children;
            elem = Array.prototype.slice.call(elem);
            SignUpRequest['age'] = elem[1].value;
        }
    });
    elemRegUzerInterests = Array.prototype.slice.call(elemRegUzerInterests);
    elemRegUzerInterests.forEach(function(elem) {
        if (elem.firstElementChild.checked === true) {
            interest[elem.firstElementChild.value] = true;
        } else {
            interest[elem.firstElementChild.value] = false;
        }
    });
    SignUpRequest['interest'] = interest;
    //console.log(RegUzer);
    var Request = JSON.stringify(SignUpRequest);
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/users/sign-up");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var lol = JSON.parse(request.responseText);
            if (lol['success'] === false) {
                console.log(lol);
                document.getElementById("fail").innerHTML = lol['message'];
            } else {
                window.location.replace('./logIn.html');
            }
        }
    }
    request.send(Request);
    SignUpRequest = {};
    interest = {};
});
$('.singUp_back').click(function() {
    window.location.replace('./index.html');
})