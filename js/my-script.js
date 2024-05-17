window.addEventListener("DOMContentLoaded", () => {

    function getMain() {
        return document.getElementsByTagName("main")[0];
    }

    try {
        MyLocalStorage.create();
    } catch {
        //
    }
    EmailSender.uploadLetterTemplate();

    let btn_send = document.getElementsByClassName("button-send")[0];
    btn_send.addEventListener("click", () => {
        let send_window = new SendEmailWindow().render();
        getMain().append(send_window);
    });
});