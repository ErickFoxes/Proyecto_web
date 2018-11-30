window.onload = () => {
    app.init();
}

let app = {
    init: function () {
        this.charging();
        this.loadContent();
    },
    charging: function () {
        let tbody = document.getElementsByClassName('settingsX')[0];
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${JSON.parse(session.user)._id}</td>
                        <td>${JSON.parse(session.user).username}</td>
                        <td>${JSON.parse(session.user).password}</td>
                        <td>${JSON.parse(session.user).email}</td>
                        <td>${JSON.parse(session.user).country}</td>
                        <td>${JSON.parse(session.user).Gender}</td>
                        <td>${JSON.parse(session.user).birthday}</td>
                        <td>
                            <a href="#" class="delete"> Delete </a>
                            <a href="#" class="update"> Update </a>
                        </td>`;
        tr.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
            this.deleteUser(event, tr, tbody);
        });
        tr.getElementsByClassName("update")[0].addEventListener("click", (event) => {
            this.updateUser(tr, tbody);
        });
        tbody.appendChild(tr);
    },
    updateUser: function (tr, tbody) {
        tr.innerHTML = `<td colspan="3">
                            <form action="/users/">
                                <input type="text" name="id" readonly value="${JSON.parse(session.user)._id}">
                                <input type="text" name="username" value="${JSON.parse(session.user).username}">
                                <input type="text" name="password" value="${JSON.parse(session.user).password}">
                                <input type="text" name="email" value="${JSON.parse(session.user).email}">
                                <input type="text" name="country" value="${JSON.parse(session.user).country}">
                                <input type="text" name="Gender" readonly value="${JSON.parse(session.user).Gender}">
                                <input type="text" name="birthday" readonly  value="${JSON.parse(session.user).birthday}">
                                <input type="submit" value="Save">
                                <input type="button" value="Cancel">
                            </form>
                        </td>`;
        let form = tr.getElementsByTagName("form")[0];
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
            fetch('/users/' + JSON.parse(session.user)._id, {///Este puede ser punto critico
                method: 'PUT',
                body: JSON.stringify(dataForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(resData => {
                    if (resData.ok) {
                        let Ntr = document.createElement('tr');
                        Ntr.innerHTML = `<td>${resData.old._id}</td>
                        <td>${dataForm.username}</td>
                        <td>${dataForm.password}</td>
                        <td>${dataForm.email}</td>
                        <td>${dataForm.country}</td>
                        <td>
                            <a href="#" class="delete"> Delete </a>
                            <a href="#" class="update"> Update </a>
                        </td>`;

                        tbody.replaceChild(Ntr, tr);
                        Ntr.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
                            this.deleteUser(event, Ntr, tbody);
                        });
                        Ntr.getElementsByClassName("update")[0].addEventListener("click", (event) => {
                            this.updateUser(Ntr, tbody);
                        });
                    } else { document.getElementsByClassName("errors")[0].innerText = 'It cannot be update'; }
                });
        });
    },
    deleteUser: (event, tr, tbody) => {
        event.preventDefault();
        fetch('/users/' + JSON.parse(session.user)._id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.ok) {
                    tbody.removeChild(tr);
                }
                else {
                    document.getElementsByClassName("errors")[0].innerText = 'The user Cannot be deleted...'
                }
            })
    },
    loadContent: function () {
        fetch('/users/', {
            method: 'GET'
        }).then(res => {
            return res.json()
        })
            .then(data => {
                if (data.ok) {
                    data.posts.forEach(element => {
                        this.addRow(element);
                    });
                }
            })
    }
}