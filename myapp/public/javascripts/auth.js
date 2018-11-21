window.onload = () => {
    app.init();
}

let app = {
    init: function () {
        this.addEvents();
    }, addEvents: function () {
        document.Form.addEventListener("submit", this.submitUser);
    },
    submitUser: function (event) {
        event.preventDefault();
        alert('lolito');
    }
};