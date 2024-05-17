/**
 * Класс окна для отправки письма на указанную почту с указанной темой
 */
class SendEmailWindow extends FixedWindow {
    constructor() {
        super("Send html letter");
        this.window.classList.add("window-send-email");

        this.enterReceiver = SendEmailWindow.createInput(
            "Enter email:",
            "form-text",
            "email",
            "receiver",
            "example@outlook.ru"
        );
        this.enterTheme = SendEmailWindow.createInput(
            "Enter theme:",
            "form-text",
            "text",
            "theme",
            "Invitation to the conference"
        );

        this.window.append(this.enterReceiver);
        this.window.append(this.enterTheme);

        this.button_cancel = SendEmailWindow.createButton("Cancel", "button-cancel", false);
        this.button_cancel.addEventListener("click", () => {
            this.container.remove();
        });

        this.button_send = SendEmailWindow.createButton("Send", "button-true-send", true);
        this.button_send.addEventListener("click", () => {
            let emailIsValid = true;
            let receiver = this.getInputValue("receiver");
            if (! receiver) {
                this.showErrorBlock("receiver");
                this.setErrorBlockText("receiver", "You didn't entered receiver's email address");
            } else if (! /^[a-z\d\-]+@(gmail|mail|outlook|yandex)\.(ru|com)$/iu.test(receiver)) {
                this.showErrorBlock("receiver");
                this.setErrorBlockText("receiver", "That isn't email address");
                emailIsValid = false;
            } else {
                this.hideErrorBlock("receiver");
            }

            let theme = this.getInputValue("theme");
            if (! theme) {
                this.showErrorBlock("theme");
                this.setErrorBlockText("theme", "You didn't entered theme of letter");
            } else {
                this.hideErrorBlock("theme");
            }

            if (emailIsValid && theme && receiver) {
                EmailSender.sendEmail(theme, receiver);
                this.closeWindow();
            }
        });

        this.buttons_group.append(this.button_cancel);
        this.buttons_group.append(this.button_send);
        this.window.append(this.buttons_group);
    }
}