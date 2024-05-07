/**
 * Окно с формой для создания нового письма на странице и в локальном хранилище
 */
class CreateEmailWindow extends FixedWindow {
    constructor() {
        super("Создание нового письма");
        this.window.classList.add("window-create-email");

        this.enterTitle = CreateEmailWindow.createInput(
            "Введите название письма:",
            "form-text",
            "text",
            "email-title",
            "Открытка на Новый год",
        );

        this.button_cancel = CreateEmailWindow.createButton("Отмена", "button-cancel");
        this.button_cancel.addEventListener("click", () => {
            this.closeWindow();
        });
        this.button_create = CreateEmailWindow.createButton("Создать", "button-create", false, true);
        this.button_create.addEventListener("click", () => {
            let title = this.getInputValue("email-title");
            if (title) {
                MyLocalStorage.create_letter(title);
                EmailBlocksCreator.renderLetters();
                this.closeWindow();
            } else {
                let inputName = "email-title";
                this.showErrorBlock(inputName);
                this.setErrorBlockText(inputName, "Вы не ввели название письма");
            }
        });

        this.window.append(this.enterTitle);
        this.buttons_group.append(this.button_cancel);
        this.buttons_group.append(this.button_create);
        this.window.append(this.buttons_group);
    }
}