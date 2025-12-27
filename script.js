let user = JSON.parse(localStorage.getItem("currentUser"))
let autoriseElements = document.querySelectorAll(".autorise");
let unautoriseElements = document.querySelectorAll(".unautorise");
console.log(autoriseElements)
console.log(unautoriseElements)
autoriseElements.forEach(element => {
    element.style.display = user? "block" : "none";
});
unautoriseElements.forEach(element => {
    element.style.display = user? "none" : "block";
});

if (user){
    let userLine = document.querySelector("#user");
    userLine.textContent = `${user.name} (${user.login})`
}

function registry(){
    let readJson = localStorage.getItem("users")
    let users = readJson ? JSON.parse(readJson) : [];
    name = document.getElementById("name").value;
    login = document.getElementById("login").value;
    for (user of users) {
         if (user.login == login){
            uncorrected_data('Данный логин занят. Введите другой логин.')
            return;
        } 
    }
    password = document.getElementById("password").value;
    conf_password = document.getElementById('conf_password').value;
    if (password != conf_password) {
        uncorrected_data('Пароль не подтвержден. Введите пароль заново.')
        return;
    }
    christmas_gift = document.getElementById('christmas_gift').value;
    if (name && login && password && conf_password && christmas_gift){
        users.push({"name": name, "login": login, "password": password, "christmas_gift": christmas_gift});
        let json = JSON.stringify(users);
        localStorage.setItem("users",json);   
        window.location.replace("index.html");
    }
    else  uncorrected_data('Не все поля заполнены. Заполните все поля.');
}

function showUsers(){
    boxUsers = document.getElementsByClassName("users")[0]
    boxUsers.replaceChildren();
    // while (boxUsers.firstChild) { 
    //     boxUsers.removeChild(boxUsers.firstChild); 
    // }
    let json = localStorage.getItem("users")
    let users = JSON.parse(json)
    users.forEach(user => {
        let line = document.createElement("div")
        line.textContent = `${user.name} : ${user.login} : ${user.password} : ${user.christmas_gift}`
        boxUsers.appendChild(line);
    });
}

function clearUsers(){
    localStorage.clear();
    boxUsers.replaceChildren();
    // while (boxUsers.firstChild) { 
    //     boxUsers.removeChild(boxUsers.firstChild); 
    // }
}

function loginUser(){
    let json = localStorage.getItem("users");
    let users = JSON.parse(json);
    login = document.getElementById("login").value;
    password = document.getElementById("password").value;
    users?.forEach(user => {
        if (user.login == login && user.password == password){
            localStorage.setItem("currentUser",JSON.stringify({"name": user.name, "login": user.login}));
            window.location.replace("index.html");
            return;   
        } 
    });

    let errorLine = document.querySelector(".incorrectUser");
    errorLine.style.visibility = "visible";

}

function logout(){
    localStorage.removeItem("currentUser");
    window.location.replace("index.html");
}

// общая функция некоректных данных чтобы не повторять код
function uncorrected_data(text) {
    let parent = document.querySelector('.login');
    let founddiv = parent.querySelector('div.incorrect')
    if (founddiv) {
        founddiv.remove();
    }
    let newstr = document.createElement('div');
    newstr.textContent = text;
    newstr.style.color = 'black';
    newstr.classList.add('incorrect');
    parent.appendChild(newstr);
}

// функция сброса при регистрации не только полей но и надписей внизу о некоректном вводе
function my_reset() {
    let parent = document.querySelector('.login');
    let founddiv = parent.querySelector('div.incorrect')
    if (founddiv) {
        founddiv.remove();
    }
}