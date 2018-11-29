window.onload = () => {
    fSettings.init();
}

let fSettings = {
    init: function () {
        this.charging();
        this.loadContent();
    },
    charging: function (data) {
        let ul = document.getElementsByClassName('settings1')[0];
        //let li = document.createElement('li');
        ul.innerHTML = `<li> 
                            <a href = "#" class = "update"> Change user data </a>
                        </li>
                        <li>
                            <a href = "#" class = "delete"> Delete your account (${data._username})</a>
                        </li>`;
        ul.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
            this.deleteUser(event, data, ul);
        });
        ul.getElementsByClassName("update")[0].addEventListener("click", (event) => {
            this.updateUser(ul, data);
        });
    },
    updateUser: function (ul, data) {
        ul.innerHTML = `<form action="/users/post/">
            <input type="text" name="id" readonly value="${data._id}">
            <input type="text" name="username" value="${data.username}">
            <input type="text" name="password" value="${data.password}">
            <input type="text" name="email" value="${data.email}">
            <input type="text" name="country" value="${data.country}">
            <input type="text" name="birthday" readonly value="${data.birthday}">
            <input type="text" name="Gender" readonly  value="${data.Gender}">
            <input type="submit" value="Save">
            <input type="button" value="Cancel">
        </form>`;
        let form = ul.getElementsByTagName("form")[0];
        let deleteUser = this.deleteUser;
        let update = this.updateUser;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let dataForm = {
                username: form.username.value,
                password: form.password.value,
                email: form.email.value,
                country: form.country.value
            };
            fetch('/users/post/' + data._id, {
                method: 'PUT',
                body: JSON.stringify(dataForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(resData => {
                    if (resData.ok) {
                        let Nul = document.getElementsByClassName('settings1')[0];
                        Nul.innerHTML = `<li> 
                                        <a href = "#" class = "update"> Change user data </a>
                                    </li>
                                    <li>
                                        <a href = "#" class = "delete"> Delete your account (${data._username})</a>
                                    </li>`;
                        Nul.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
                            this.deleteUser(event, data, Nul);
                        });
                        Nul.getElementsByClassName("update")[0].addEventListener("click", (event) => {
                            this.updateUser(Nul, data);
                        });
                    } else { document.getElementsByClassName("errors")[0].innerText = 'It cannot be update'; }
                });
        });
    },
    deleteUser: (event, data, ul) => {
        event.preventDefault();
        fetch('/users/post/' + data._id, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(res => {
            if (res.ok) {  console.log("lolito"); }
            else { document.getElementsByClassName("errors")[0].innerText = 'The user Cannot be deleted...' }
        })
    }
}