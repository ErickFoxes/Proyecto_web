/*let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            console.log(document.querySelectorAll(".delete"));
            document.querySelectorAll(".delete").forEach(element => {
                element.addEventListener('click', function (event) {
                    event.preventDefault();
                    let id = element.getAttribute("data-id");
                    console.log(id);
                    fetch('/settings/' + id, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                console.log('Lo hiciste man :v');
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                });
            })

        };
        loadContent();
    }
};
window.onload = () => app.init();*/