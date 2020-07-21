var loading = '<span class="spinner-border" role="status"></span><span>Ждите</span>',
    array_news = [],
    array_history = [],
    array_accounts = [],
    array_users = [],
    SP = document.forms.SP,
    sp_all = JSON.parse(localStorage.getItem('sp_all')) || [],
    sp_obj_old = {},
    fileList = document.getElementById("fileList"),
    todaysDate = new Date(),
    todaysTime = new Date(),
    year = todaysDate.getFullYear(),
    month = ("0" + (todaysDate.getMonth() + 1)).slice(-2),
    day = ("0" + todaysDate.getDate()).slice(-2),
    minDate = (year + "-" + month + "-" + day),
    Hour = ("0" + todaysTime.getHours()).slice(-2),
    Minutes = ("0" + todaysTime.getMinutes()).slice(-2),
    minTime = (Hour + ":" + Minutes),
    history_header = document.querySelector('.history_header'),
    history_body = document.querySelector('.history_body'),
    countHist = 0,
    arrHist = JSON.parse(localStorage.getItem('arrHist')) || [],
    objHist = {},
    uzerActive;
document.getElementById("uzerName").textContent = localStorage.getItem("login") || "no login";
window.URL = window.URL || window.webkitURL;
$('#datepicker').attr('min', minDate);
$('#datepicker').val(minDate);
$('#timepicker').attr('min', minTime);
$('#timepicker').val(minTime);



$('.exit').click(function() {
    localStorage.setItem("login", '');
    window.location.replace('./index.html');
})
var request = new XMLHttpRequest();

function reqReadyStateChange() {
    if (request.readyState == 4 && request.status == 200) {
        var lol = JSON.parse(request.responseText);
        if (lol['success'] === false) {
            document.getElementById("fail").innerHTML = lol['message'];
        } else {
            let int_us = lol['data'];
            int_us.sort(function(a, b) { return b['percent'] - a['percent'] });
            if (int_us.length === 0) {
                document.getElementById("fail").innerHTML = 'Нет интересующих пользователей.'
            } else {
                for (let i = 0; i < int_us.length; i++) {
                    $('.interestingUsers_block').append(
                        '<div class="row">' +
                        '<div class="col-2"><img class="modalUzer" src="img/1486395884-account_80606.png"></div>' +
                        '<div class="col-5">' +
                        '<div class="user_author modalUzer">' + int_us[i]['login'] + '</div>' +
                        '</div>' +
                        '<div class="col-5">' + int_us[i]['percent'] + '</div>' +
                        '</div>' +
                        '<hr>');
                }
            }
        }
    }
}
var body = localStorage.getItem("login");
request.open("GET", "http://localhost:5000/api/users/getPersent?=" + body);
request.onreadystatechange = reqReadyStateChange;
request.send();

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
};
for (let i = 0; i < sp_all.length; i++) {
    if (sp_all[i]['date'] <= minDate) {
        if (sp_all[i]['time'] < minTime) {
            sp_all.splice(i, 1);
            localStorage.setItem('sp_all', JSON.stringify(sp_all));
        }
    }
}
$.when().done(function() {
    let change_uzer_body = document.querySelector('.change_uzer_body').children;
    change_uzer_body = Array.prototype.slice.call(change_uzer_body);
    $('body').on('click', '.chageUzer', function() {
        $('#modalChangeUzer').modal('show');
        change_uzer_body[1].firstElementChild.textContent = $(this).find('.authorUzer').text();
        change_uzer_body[0].firstElementChild.src = $(this).find('.imageUser').attr('src');
    });
});
$.when().done(
    function() {
        let author_news = '',
            image_dir_news = '',
            comment_news = '',
            com = '',
            arr_comments = [],
            arr = [],
            elems_news = document.querySelector('#news').children,
            elems_history = document.querySelector('#history').children;
        elems_news = Array.prototype.slice.call(elems_news);
        elems_history = Array.prototype.slice.call(elems_history);
        elems_news.forEach(function(elem) {
            for (let i = 0; i < array_news.length; i++) {
                if ((array_news[i]['like'] === true) && (array_news[i]['image_dir'].join('') == $(elem).find('.news_image').attr('src'))) {
                    $(elem).find('.like_not').css({ 'display': 'none' });
                    $(elem).find('.like').css({ 'display': 'block' });
                }
                if ((array_news[i]['mark'] === true) && (array_news[i]['image_dir'].join('') == $(elem).find('.news_image').attr('src'))) {
                    $(elem).find('.bMark').css({ 'display': 'block' });
                    $(elem).find('.bMark_not').css({ 'display': 'none' });
                }
                if ((array_news[i]['image_dir'].join('') == $(elem).find('.news_image').attr('src')) && (array_news[i].hasOwnProperty('comments'))) {
                    for (let j = 0; j < array_news[i]['comments'].length; j++) {
                        $(elem).find('.comment').prepend('<div class="com">' +
                            '<span>GGG:</span><input type="text" class="inputEditcommentary" value="' + array_news[i]['comments'][j] + '" disabled>' +
                            '<button type="button" class="btn btn-primary btnEditCommentary">Редактировать комментарий</button>' +
                            '<button type="button" class="btn btn-primary sendNewCommentary" style="display: none;">Отправить</button>' +
                            '<button type="button" class="btn btn-primary removeCommentary">Удалить комментарий</button></div></div>');
                    }
                }
            }
        });
        elems_history.forEach(function(elem) {
            let elem_child = elem.children;
            elem_child = Array.prototype.slice.call(elem_child);
            for (let i = 0; i < arrHist.length; i++) {
                if (elem_child[1].textContent === arrHist[i]['author'] && arrHist[i]['full'] == true) {
                    elem_child[0].classList.remove('hist_active');
                    $('#history').append(elem);
                }
            }
        });
        $('body').on('click', '.history_child', function(e) {
            $('#modalHistory').modal('show');
            objHist = {};
            for (let i = 0; i < array_history.length; i++) {
                if (array_history[i].author === $(this).find('.history_autor').text()) {
                    history_header.firstElementChild.textContent = array_history[i].author;
                    if (arrHist.length != 0) {
                        for (let k = 0; k < arrHist.length; k++) {
                            if (arrHist[k]['author'] === history_header.firstElementChild.textContent) {
                                var count = arrHist[k]['count'];
                            } else { var count = 0; }
                        }
                    } else {
                        var count = 0;
                    }
                    for (let j = 0; j < array_history[i].text1.length; j++) {
                        if (j === count) {
                            $('.carouselHistoryOl').append(
                                '<li data-target="#carouselExampleCaptions" data-slide-to="' + j + '" class="active"></li>'
                            );
                            $('.carouselHistoryInner').append(
                                '<div class="carousel-item active">' +
                                '<img src="img/gray.jpg" class="d-block w-100">' +
                                '<div class="carousel-caption d-none d-md-block">' +
                                '<p>' + array_history[i].text1[j] + '</p>' +
                                '</div>' +
                                '</div>'
                            );
                        } else {
                            $('.carouselHistoryOl').append(
                                '<li data-target="#carouselExampleCaptions" data-slide-to="' + j + '"></li>'
                            );
                            $('.carouselHistoryInner').append(
                                '<div class="carousel-item">' +
                                '<img src="img/gray.jpg" class="d-block w-100">' +
                                '<div class="carousel-caption d-none d-md-block">' +
                                '<p>' + array_history[i].text1[j] + '</p>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                    }
                }
            }
        });
        $('body').on('click', '.next', function(e) {
            if (countHist <= document.querySelector('.carouselHistoryInner').children.length) { countHist++ }
        })
        $('body').on('click', '.closeHistory', function() {
            let boolHist = false;
            for (let i = 0; i < arrHist.length; i++) {
                if (arrHist[i]['author'] === history_header.firstElementChild.textContent) {
                    boolHist = true;
                    if ((arrHist[i]['count'] + countHist + 1) >= document.querySelector('.carouselHistoryInner').children.length) {
                        countHist = 0;
                    } else { countHist = arrHist[i]['count'] + countHist + 1; }
                    arrHist[i]['count'] = countHist;
                    console.log(countHist, document.querySelector('.carouselHistoryInner').children.length);
                    if (countHist === 0) {
                        arrHist[i]['full'] = true;
                        arrHist[i]['count'] = countHist;
                        elems_history.forEach(function(elem) {
                            let elem_child = elem.children;
                            elem_child = Array.prototype.slice.call(elem_child);
                            if (elem_child[1].textContent === history_header.firstElementChild.textContent) {
                                elem_child[0].classList.remove('hist_active');
                                $('#history').append(elem);
                            }
                        });
                    } else {
                        arrHist[i]['full'] = false;
                    }
                    break;
                }
            }
            if (boolHist === false) {
                if (countHist === 0) {
                    objHist['author'] = history_header.firstElementChild.textContent;
                    if ((countHist + 1) >= document.querySelector('.carouselHistoryInner').children.length) {
                        countHist = 0;
                        objHist['count'] = countHist;
                    } else {
                        countHist = countHist + 1;
                        objHist['count'] = countHist;
                    }
                    if (countHist === 0) {
                        objHist['full'] = true;
                        objHist['count'] = countHist;
                        elems_history.forEach(function(elem) {
                            let elem_child = elem.children;
                            elem_child = Array.prototype.slice.call(elem_child);
                            if (elem_child[1].textContent === history_header.firstElementChild.textContent) {
                                elem_child[0].classList.remove('hist_active');
                                $('#history').append(elem);
                            }
                        });
                    } else {
                        objHist['author'] = history_header.firstElementChild.textContent;
                        objHist['count'] = countHist + 1;
                        objHist['full'] = false;
                    }
                } else {
                    objHist['author'] = history_header.firstElementChild.textContent;
                    if ((countHist + 1) >= document.querySelector('.carouselHistoryInner').children.length) {
                        countHist = 0;
                        objHist['count'] = countHist;
                    } else {
                        countHist = countHist + 1;
                        objHist['count'] = countHist;
                    }
                    if (countHist === 0) {
                        objHist['full'] = true;
                        countHist = 0;
                        elems_history.forEach(function(elem) {
                            let elem_child = elem.children;
                            elem_child = Array.prototype.slice.call(elem_child);
                            if (elem_child[1].textContent === history_header.firstElementChild.textContent) {
                                elem_child[0].classList.remove('hist_active');
                                $('#history').append(elem);
                            }
                        });
                    } else {
                        objHist['full'] = false;
                    }
                }
                arrHist.push(objHist);
            }
            localStorage.setItem('arrHist', JSON.stringify(arrHist));
            $('.carouselHistoryOl').empty();
            $('.carouselHistoryInner').empty();
            countHist = 0;
        })
        $('body').on('click', '.news_block', function(e) {
            if (($(this).find('.like_not').css('display') === 'block') && ($(this).find('.like_not').is(e.target))) {
                $(this).find('.like_not').css({ 'display': 'none' });
                $(this).find('.like').css({ 'display': 'block' });
                for (let i = 0; i < array_news.length; i++) {
                    if ((array_news[i]['author'] == $(this).find('.news_author').text()) && (array_news[i]['image_dir'] == $(this).find('.news_image').attr('src'))) {
                        array_news[i]['like'] = true;
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                    }
                }
            }
            if (($(this).find('.like_not').css('display') !== 'block') && ($(this).find('.like').is(e.target))) {
                $(this).find('.like').css({ 'display': 'none' });
                $(this).find('.like_not').css({ 'display': 'block' });
                for (let i = 0; i < array_news.length; i++) {
                    if ((array_news[i]['author'] == $(this).find('.news_author').text()) && (array_news[i]['image_dir'] == $(this).find('.news_image').attr('src'))) {
                        array_news[i]['like'] = false;
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                    }
                }
            }
            if (($(this).find('.сollapseСommentary').css('display') !== 'block') && ($(this).find('.closeComentBlock').is(e.target))) {
                $(this).find('.сollapseСommentary').collapse('show');
            }
            if ($(this).find('.send_commentary').is(e.target)) {
                for (var i = 0; i < array_news.length; i++) {
                    if (array_news[i]['image_dir'] == $(this).find('.news_image').attr('src')) {
                        if (array_news[i]["comments"]) { arr_comments = array_news[i]["comments"] } else { arr_comments = [] }
                        arr_comments.push($(this).find('.news_commentary').val());
                        array_news[i]["comments"] = arr_comments;
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                    }
                }
                $(this).find('.comment').prepend('<div class="com">' +
                    '<span>GGG:</span><input type="text" class="inputEditcommentary" value="' + $(this).find('.news_commentary').val() + '" disabled>' +
                    '<button type="button" class="btn btn-primary btnEditCommentary">Редактировать комментарий</button>' +
                    '<button type="button" class="btn btn-primary sendNewCommentary" style="display: none;">Отправить</button>' +
                    '<button type="button" class="btn btn-primary removeCommentary">Удалить комментарий</button></div></div>');
                $(this).find('.news_commentary').val('');
            }

            if ($(this).find('.closeComentBlock').is(e.target)) {
                $(this).find('.сollapseСommentary').collapse('hide');
            }
            if (($(this).find('.bMark_not').css('display') === 'block') && ($(this).find('.bMark_not').is(e.target))) {
                $(this).find('.bMark_not').css({ 'display': 'none' });
                $(this).find('.bMark').css({ 'display': 'block' });
                for (let i = 0; i < array_news.length; i++) {
                    if ((array_news[i]['author'] == $(this).find('.news_author').text()) && (array_news[i]['image_dir'] == $(this).find('.news_image').attr('src'))) {
                        array_news[i]['mark'] = true;
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                    }
                }
            }
            if (($(this).find('.bMark_not').css('display') !== 'block') && ($(this).find('.bMark').is(e.target))) {
                $(this).find('.bMark').css({ 'display': 'none' });
                $(this).find('.bMark_not').css({ 'display': 'block' });
                for (let i = 0; i < array_news.length; i++) {
                    if ((array_news[i]['author'] == $(this).find('.news_author').text()) && (array_news[i]['image_dir'] == $(this).find('.news_image').attr('src'))) {
                        array_news[i]['mark'] = false;
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                    }
                }
            }
        });
        $('body').on('click', '.com', function(e) {
            if ($(this).find('.btnEditCommentary').is(e.target)) {
                com = $(this).find('.inputEditcommentary').val();
                $(this).find('.inputEditcommentary').prop('disabled', false);
                $(this).find('.btnEditCommentary').css({ 'display': 'none' });
                $(this).find('.sendNewCommentary').css({ 'display': 'block' });
            }
            if ($(this).find('.sendNewCommentary').is(e.target)) {
                $(this).find('.inputEditcommentary').prop('disabled', true);
                $(this).find('.btnEditCommentary').css({ 'display': 'block' });
                $(this).find('.sendNewCommentary').css({ 'display': 'none' });
                for (let i = 0; i < array_news.length; i++) {
                    if (array_news[i]['image_dir'] == $(this).parent().parent().find('.news_image').attr('src')) {
                        arr_comments = array_news[i]["comments"];
                        for (j = 0; j < arr_comments.length; j++) {
                            if (arr_comments[j] == com) {
                                arr_comments[j] = $(this).find('.inputEditcommentary').val();
                            }
                        }
                        array_news[i]["comments"] = arr_comments;
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                    }
                }
            }
            if ($(this).find('.removeCommentary').is(e.target)) {
                com = $(this).find('.inputEditcommentary').val();
                for (let i = 0; i < array_news.length; i++) {
                    if (array_news[i].image_dir.join('') === $(this).parent().parent().find('.news_image').attr('src')) {
                        if (array_news[i].hasOwnProperty('comments')) {
                            for (let j = 0; j < array_news[i].comments.length; j++) {
                                if (array_news[i]['comments'][j] === com) {
                                    array_news[i]['comments'].splice(j, 1);
                                }
                            }
                        }
                        localStorage.setItem('array_news', JSON.stringify(array_news));
                        $(this).remove();
                    }
                }
            }
        });
    });
$.when().done(function() {
    let //array_user = JSON.parse(localStorage.getItem('array_user')) || [],
    //elems_user = document.querySelector('#interestingUsers').children,
        elems_uzer_header = document.querySelector('.uzer_header'),
        elems_userInterests = document.querySelector('#user_interests').children;
    elems_userInterests = Array.prototype.slice.call(elems_userInterests);
    //elems_uzer_body = document.querySelector('.uzer_body').children;
    //elems_user = Array.prototype.slice.call(elems_user);
    //elems_uzer_body = Array.prototype.slice.call(elems_uzer_body);
    //let elems_uzer_body_0 = elems_uzer_body[0].children;
    //elems_uzer_body_0 = Array.prototype.slice.call(elems_uzer_body_0);*/
    $('body').on('click', '.modalUzer', function() {
        $('#modalUzer').modal('show');
        let UserNameRequest = $(this).text(),
            user_proc = this.parentElement.nextElementSibling.textContent;
        elems_userInterests.forEach(function(elem) {
            elem.firstElementChild.checked = false;
        });
        var Request = JSON.stringify(UserNameRequest);
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:5000/api/users/getUserInfo");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var lol = JSON.parse(request.responseText);
                console.log(lol);
                if (lol['success'] === false) {
                    document.getElementById("fail").innerHTML = lol['message'];
                } else {
                    elems_uzer_header.firstElementChild.textContent = UserNameRequest;
                    document.getElementById("uzer_fio").textContent = lol['fio'];
                    document.getElementById("uzer_city").textContent = lol['city'];
                    document.getElementById("uzer_age").textContent = lol['age'];
                    elems_userInterests.forEach(function(elem) {
                        if (lol[elem.firstElementChild.value] === true) {
                            elem.firstElementChild.checked = 'true';
                        }
                    });
                    document.getElementById("uzer_proc").textContent = user_proc;
                }
            }
        }
        request.send(Request);
        /*for (let i = 0; i < array_users.length; i++) {
            if (array_users[i]['author'] === $(this).text()) {
                elems_uzer_header.firstElementChild.textContent = array_users[i]['author'];
                elems_uzer_body_0[1].firstElementChild.textContent = array_users[i]['publication'];
                elems_uzer_body_0[2].firstElementChild.textContent = array_users[i]['subscribers'];
                elems_uzer_body_0[3].firstElementChild.textContent = array_users[i]['subscriptions'];
                elems_uzer_body[1].firstElementChild.textContent = array_users[i]['text1'];
                elems_uzer_body[2].textContent = array_users[i]['text2'];
                if (array_users[i].hasOwnProperty('whos')) { elems_uzer_body[3].firstElementChild.textContent = array_users[i]['whos'].join(', '); } else {
                    elems_uzer_body[3].firstElementChild.textContent = ' ';
                }
                if (array_user.length === 0) { elems_uzer_footer.firstElementChild.textContent = 'Подписаться'; } else {
                    for (j = 0; j < array_user.length; j++) {
                        if (array_user[j] === $(this).text()) {
                            elems_uzer_footer.firstElementChild.textContent = 'Отписаться';
                            break;
                        } else {
                            elems_uzer_footer.firstElementChild.textContent = 'Подписаться';
                        }
                    }
                }
            }
        }*/
    });
});
$.when().done(function() {
    let UserInfoRequest = {},
        interests = {},
        UserNameRequest = document.getElementById("uzerName").innerText,
        elems_yourInterests = document.querySelector('#lkYourInterests').children,
        elems_yourInfo = document.querySelector('#lkYourInfo').children,
        elems_sp = document.querySelector('.lk_sp').children;
    elems_yourInterests = Array.prototype.slice.call(elems_yourInterests);
    elems_yourInfo = Array.prototype.slice.call(elems_yourInfo);
    elems_sp = Array.prototype.slice.call(elems_sp);


    /*if (array_yourInterests.length != 0) {
        elems_yourInterests.forEach(function(elem) {
            for (let i = 0; i < array_interests['yourInterests'].length; i++) {
                if (elem.firstElementChild.value === array_interests['yourInterests'][i]) {
                    elem.firstElementChild.checked = 'true';
                }
            }
        });
    }
    $('body').on('change', function() {
        let chk = event.target;
        if (chk.tagName === 'INPUT' && chk.type === 'checkbox' && chk.name === "yourInterests") {
            if (chk.checked) {
                array_yourInterests.push(chk.value);
            } else {
                for (let i = 0; i < array_yourInterests.length; i++) {
                    if ((array_yourInterests[i] === chk.value)) {
                        array_yourInterests.splice(i, 1);
                    }
                }
            }
        }
    });
    $('.interests_submit').on('click', function() {
        array_interests['yourInterests'] = array_yourInterests;
        elems_yourInterests.forEach(function(elem) {
            for (let i = 0; i < array_interests['yourInterests'].length; i++) {
                if (elem.firstElementChild.value === array_interests['yourInterests'][i]) {
                    elem.firstElementChild.checked = 'true';
                }
            }
        });
    });*/
    $('.lk').on('click', function() {
        $('.main_news').css({ 'display': 'none' });
        $('.main_lk').css({ 'display': 'block' });
        $('.main_sp').css({ 'display': 'none' });
        var Request = JSON.stringify(UserNameRequest);
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:5000/api/users/getMe");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var lol = JSON.parse(request.responseText);
                console.log(lol);
                if (lol['success'] === true) {
                    elems_yourInfo.forEach(function(elem, i) {
                        if (i == 0) {
                            elem = elem.children;
                            elem = Array.prototype.slice.call(elem);
                            elem[1].value = lol['city'];
                        }
                        if (i == 1) {
                            elem = elem.children;
                            elem = Array.prototype.slice.call(elem);
                            elem[1].value = lol['age'];
                        }
                    });
                    elems_yourInterests.forEach(function(elem) {
                        if (lol[elem.firstElementChild.value] === true) {
                            elem.firstElementChild.checked = 'true';
                        }
                    });
                    for (let i = 0; i < lol['data'].length; i++) {
                        $('.lk_sp').prepend(
                            '<div class="lk_sp_block"><div>Дата: <span>' + lol['data'][i]['date'] + '</span></div><div>' + 'Время:<span>' + lol['data'][i]['time'] + '</span></div>' +
                            '<div>Текст:<span>' + lol['data'][i]['text'] + '</span></div></div><hr>');
                    }
                } else {

                }
            }
        }
        request.send(Request);
    });
    $('.main_lk_back').on('click', function() {
        $('.main_news').css({ 'display': 'block' });
        $('.main_lk').css({ 'display': 'none' });
        $('.main_sp').css({ 'display': 'none' });
        document.getElementById("fail").innerHTML = ' ';
        $('.interestingUsers_block').empty();
        $('.lk_sp').empty();
        let request1 = new XMLHttpRequest();

        function reqReadyStateChange() {
            if (request1.readyState == 4 && request1.status == 200) {
                var lol = JSON.parse(request1.responseText);
                if (lol['success'] === false) {
                    document.getElementById("fail").innerHTML = lol['message'];
                } else {
                    let int_us = lol['data'];
                    int_us.sort(function(a, b) { return b['percent'] - a['percent'] });
                    if (int_us.length === 0) {
                        document.getElementById("fail").innerHTML = 'Нет интересующих пользователей.';
                    } else {
                        for (let i = 0; i < int_us.length; i++) {
                            $('.interestingUsers_block').append(
                                '<div class="row">' +
                                '<div class="col-2"><img class="modalUzer" src="img/1486395884-account_80606.png"></div>' +
                                '<div class="col-5">' +
                                '<div class="user_author modalUzer">' + int_us[i]['login'] + '</div>' +
                                '</div>' +
                                '<div class="col-5">' + int_us[i]['percent'] + '</div>' +
                                '</div>' +
                                '<hr>');
                        }
                    }
                }
            }
        }
        let body = localStorage.getItem("login");
        request1.open("GET", "http://localhost:5000/api/users/getPersent?=" + body);
        request1.onreadystatechange = reqReadyStateChange;
        request1.send();
    });
    $('.lk_edit').on('click', function() {
        $('.lk_submit_new').css({ 'display': 'block' });
        $('.lk_edit').css({ 'display': 'none' });
        elems_yourInterests.forEach(function(elem) {
            elem.firstElementChild.disabled = false;
        });
        elems_yourInfo.forEach(function(elem, i) {
            if (i < 2) {
                elem = elem.children;
                elem = Array.prototype.slice.call(elem);
                elem[1].disabled = false;
            }
        });
    })
    $('.lk_submit_new').on('click', function() {
        $('.lk_submit_new').css({ 'display': 'none' });
        $('.lk_edit').css({ 'display': 'block' });
        elems_yourInterests.forEach(function(elem) {
            if (elem.firstElementChild.checked === true) {
                interests[elem.firstElementChild.value] = true;
            } else {
                interests[elem.firstElementChild.value] = false;
            }
            elem.firstElementChild.disabled = true;
        });
        UserInfoRequest['name'] = UserNameRequest;
        elems_yourInfo.forEach(function(elem, i) {
            if (i == 0) {
                elem = elem.children;
                elem = Array.prototype.slice.call(elem);
                elem[1].disabled = true;
                UserInfoRequest['city'] = elem[1].value;
            }
            if (i == 1) {
                elem = elem.children;
                elem = Array.prototype.slice.call(elem);
                elem[1].disabled = true;
                UserInfoRequest['age'] = elem[1].value;
            }
        });
        UserInfoRequest['interests'] = interests;
        var Request = JSON.stringify(UserInfoRequest);
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:5000/api/users/changeUserInfo");
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var lol = JSON.parse(request.responseText);
                if (lol['success'] === false) {} else {
                    document.getElementById("messageLkInfo").innerHTML = "Данные успешно изменены!";
                    $('#messageLkInfo').css({ 'color': 'green' });
                }
            } else {
                document.getElementById("messageLkInfo").innerHTML = "Ошибка!";
                $('#messageLkInfo').css({ 'color': 'red' });
            }
        }
        request.send(Request);
        console.log(UserInfoRequest);
    });

    /*if (sp_all.length != 0) {
        for (let i = 0; i < sp_all.length; i++) {
            $('.lk_sp').prepend(
                '<div class="lk_sp_block"><div>Дата: <span>' + sp_all[i]["date"] + '</span></div><div>' + 'Время:<span>' + sp_all[i]["time"] + '</span></div>' +
                '<div>Текст:<span>' + sp_all[i]["text"] + '</span></div></div><hr>');
        }
    }*/
});

function child(elem) {
    let elem_children = elem.children;
    elem_children = Array.prototype.slice.call(elem_children);
    return elem_children[1];
}

$('body').on('click', '.lk_sp_block', function() {
    $('#modal_SP').modal('show');
    let childSP = this.children,
        childM = document.querySelector('.SP_body').firstElementChild.children;
    childSP = Array.prototype.slice.call(childSP);
    childM = Array.prototype.slice.call(childM);
    child(childM[0]).value = childSP[0].firstElementChild.textContent;
    child(childM[1]).value = childSP[1].firstElementChild.textContent;
    child(childM[2]).value = childSP[2].firstElementChild.textContent;
})

$('.sp_edit').on('click', function() {
    $('.sp_submit_new').css({ 'display': 'block' });
    $('.sp_edit').css({ 'display': 'none' });
    let childM = document.querySelector('.SP_body').firstElementChild.children;
    childM = Array.prototype.slice.call(childM);
    child(childM[0]).disabled = false;
    child(childM[1]).disabled = false;
    child(childM[2]).disabled = false;
    sp_obj_old['date'] = child(childM[0]).value;
    sp_obj_old['time'] = child(childM[1]).value;
    sp_obj_old['text'] = child(childM[2]).value;
    for (let i = 0; i < sp_all.length; i++) {
        if (child(childM[0]).value === sp_all[i]['date'] && child(childM[1]).value === sp_all[i]['time'] && child(childM[2]).value === sp_all[i]['text']) {
            sp_all.splice(i, 1);
            localStorage.setItem('sp_all', JSON.stringify(sp_all));
        }
    }
});

$('.sp_submit_new').on('click', function() {
    $('.sp_submit_new').css({ 'display': 'none' });
    $('.sp_edit').css({ 'display': 'block' });
    let childM = document.querySelector('.SP_body').firstElementChild.children,
        PostingNewRequest = {},
        childSP = document.querySelector('.lk_sp').children;
    childM = Array.prototype.slice.call(childM);
    childSP = Array.prototype.slice.call(childSP);
    child(childM[0]).disabled = true;
    child(childM[1]).disabled = true;
    child(childM[2]).disabled = true;
    PostingNewRequest['login'] = uzerName.textContent;
    PostingNewRequest['date'] = child(childM[0]).value;
    PostingNewRequest['date_old'] = sp_obj_old['date'];
    PostingNewRequest['time'] = child(childM[1]).value;
    PostingNewRequest['time_old'] = sp_obj_old['time'];
    PostingNewRequest['text'] = child(childM[2]).value;
    childSP.forEach(function(elem) {
        let elemSP = elem.children
        elemSP = Array.prototype.slice.call(elemSP);
        if (elemSP.length != 0) {
            if (elemSP[0].firstElementChild.textContent === sp_obj_old['date'] && elemSP[1].firstElementChild.textContent === sp_obj_old['time'] && elemSP[2].firstElementChild.textContent === sp_obj_old['text']) {
                elemSP[0].firstElementChild.textContent = PostingNewRequest['date'];
                elemSP[1].firstElementChild.textContent = PostingNewRequest['time'];
                elemSP[2].firstElementChild.textContent = PostingNewRequest['text'];
            }
        }
    });
    var Request = JSON.stringify(PostingNewRequest);
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/users/changePost");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var lol = JSON.parse(request.responseText);
            console.log(lol);
            if (request.readyState == 4 && request.status == 200) {
                var lol = JSON.parse(request.responseText);
                if (lol['success'] === false) {} else {
                    document.getElementById("messageSPedit").innerHTML = "Данные успешно изменены!";
                    $('#messageSPedit').css({ 'color': 'green' });
                }
            }
        } else {
            document.getElementById("messageSPedit").innerHTML = "Ошибка!";
            $('#messageSPedit').css({ 'color': 'red' });
        }
    }
    request.send(Request);
    console.log(PostingNewRequest);
    //localStorage.setItem('sp_all', JSON.stringify(sp_all));
});

$('.SP').on('click', function() {
    $('.main_news').css({ 'display': 'none' });
    $('.main_lk').css({ 'display': 'none' });
    $('.main_sp').css({ 'display': 'block' });
});

$('.SP_submit').on("click", function() {
    let SP_children = SP.children,
        files = [],
        PostingRequest = {};
    SP_children = Array.prototype.slice.call(SP_children);
    PostingRequest['login'] = document.getElementById("uzerName").innerText;
    PostingRequest['date'] = child(SP_children[0]).value;
    PostingRequest['time'] = child(SP_children[1]).value;
    PostingRequest['text'] = child(SP_children[2]).value;
    /*$('.lk_sp').prepend(
        '<div class="lk_sp_block"><div>Дата: <span>' + PostingRequest['date'] + '</span></div><div>' + 'Время:<span>' + PostingRequest['time'] + '</span></div>' +
        '<div>Текст:<span>' + PostingRequest['text'] + '</span></div></div><hr>');*/
    for (let i = 0; i < child(SP_children[3]).files.length; i++) {
        let obj = {};
        obj['name'] = child(SP_children[3]).files[i].name;
        obj['url'] = window.URL.createObjectURL(child(SP_children[3]).files[i]);
        files.push(obj);
    };
    child(SP_children[0]).value = minDate;
    child(SP_children[1]).value = minTime;
    child(SP_children[2]).value = ' ';
    var Request = JSON.stringify(PostingRequest);
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/posting/my-post");
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var lol = JSON.parse(request.responseText);
            console.log(lol);
            if (request.readyState == 4 && request.status == 200) {
                var lol = JSON.parse(request.responseText);
                if (lol['success'] === false) {} else {
                    document.getElementById("messageSP").innerHTML = "Данные успешно отправлены!";
                    $('#messageSP').css({ 'color': 'green' });
                }
            }
        } else {
            document.getElementById("messageSP").innerHTML = "Ошибка!";
            $('#messageSP').css({ 'color': 'red' });
        }
    }
    request.send(Request);
    console.log(PostingRequest);
});

$('.main_sp_back').on('click', function() {
    $('.main_news').css({ 'display': 'block' });
    $('.main_sp').css({ 'display': 'none' });
    $('.main_lk').css({ 'display': 'none' });
});

function handleFiles(files) {
    if (!files.length) {
        fileList.innerHTML = "<p>Ничего</p>";
    } else {
        fileList.innerHTML = "";
        for (let i = 0; i < files.length; i++) {
            const span = document.createElement("span");
            span.style.padding = 10;
            fileList.appendChild(span);
            const img = document.createElement("img"); 
            img.src = window.URL.createObjectURL(files[i]); 
            img.height = 60; 
            img.onload = function() {
                window.URL.revokeObjectURL(this.src); 
            } 
            span.appendChild(img);
        } 
    }
}