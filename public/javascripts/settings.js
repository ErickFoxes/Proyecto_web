let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch('/users')
                .then(res => res.json())
                .then(data => {
                    let settingsX = document.getElementsByClassName('settingsX')[0];

                    settingsX.innerHTML = data.reduce((string, element) => {
                        return string + `<tr>
                                            <td class='username'>${dataForm.username}</td>
                                            <td class='password'>${dataForm.password}</td>
                                            <td class='email'>${dataForm.email}</td>
                                            <td class='country'>${dataForm.country}</td>
                                            <td class='options'>
                                                <a data-id='${element._id}' href="#" class="delete"> Delete </a>
                                                <a data-id='${element._id}' href="#" class="update"> Update </a>
                                            </td>
                                        </tr>`
                    }, '');

                    document.querySelectorAll('.delete').forEach(element => {
                        element.addEventListener('click', function (event) {
                            event.preventDefault();
                            let id = element.getAttribute('data-id');
                            fetch('/users/' + id, {
                                method: 'DELETE'
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        MediaStreamTrackAudioSourceNode.removeChild(element.parentElement.parentElement);
                                    }
                                }).catch(err => {
                                    console.log(err);
                                });
                        });
                    });
                    document.querySelectorAll('.update').forEach(element => {
                        element.addEventListener('click', function (event) {
                            event.preventDefault();
                            let id = element.getAttribute('data-id');
                            fetch('/users/' + id)
                                .then(res => res.json())
                                .then(data => {
                                    let form = document.forms.upForm;
                                    
                                    form.username.value = data.username;
                                    form.password.value = data.password;
                                    form.email.value = data.email;
                                    form.country.value = data.country;
                                    form.action = '/users/' + data._id;
                                });
                        });
                    });
                });
        }
        loadContent();
    }
};

window.onload = () => app.init();