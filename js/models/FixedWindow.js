/**
 * Базовый класс для окон с формами, перекрывающими остальной контент на странице
 */
class FixedWindow {
    constructor(title = "Название окна") {
        this.title = title;

        this.container = document.createElement("div");
        this.container.className = "window-container";

        this.window = document.createElement("div");
        this.window.className = "fixed-window";

        this.title_window = document.createElement("h2");
        this.title_window.className = "window-title";
        this.title_window.textContent = this.title;

        this.buttons_group = document.createElement("div");
        this.buttons_group.className = "buttons-group";

        this.window.append(this.title_window);
        this.container.append(this.window);
    }

    closeWindow() {
        this.container.remove();
    }

    getInputValue(inputName) {
        let inputs = this.window.getElementsByTagName("input");
        for (let i = 0; i< inputs.length; i++) {
            if (inputs[i].name === inputName) {
                return inputs[i].value;
            }
        }
    }

    getErrorBlock(inputName) {
        return this.window.getElementsByClassName(`for-${inputName}`)[0];
    }

    hideErrorBlock(inputName) {
        this.getErrorBlock(inputName).classList.add("hidden");
    }

    showErrorBlock(inputName) {
        this.getErrorBlock(inputName).classList.remove("hidden");
    }

    setErrorBlockText(inputName, text) {
        this.getErrorBlock(inputName).getElementsByClassName("__text")[0].textContent = text;
    }

    static createTextBlock(text) {
        let text_block = document.createElement("p");
        text_block.textContent = text;

        return text_block;
    }

    static createButton(text, className, isPrimary = false, isAgree = false) {
        let button = document.createElement("div");
        button.className = `button button-text ${className}`;
        button.classList.add("button-text");
        if (isPrimary) {
            button.classList.add("primary-button");
        }
        if (! isPrimary && isAgree) {
            button.classList.add("agree-button");
        }
        let div_text = document.createElement("div");
        div_text.className = "__text";
        div_text.textContent = text;

        button.append(div_text);

        return button;
    }

    static createInput(title, inputClass, inputType = "text", inputName, inputPlaceholder = "Текст") {
        let label_container = document.createElement("label");
        let span = document.createElement("span");
        span.textContent = title;
        let input = document.createElement("input");
        input.className = inputClass;
        input.type = inputType;
        input.name = inputName;
        input.placeholder = inputPlaceholder;
        let error_block = document.createElement("div");
        error_block.className = `error-block hidden for-${inputName}`;
        let error_block_text = document.createElement("div");
        error_block_text.className = "__text";

        label_container.append(span);
        label_container.append(input);
        error_block.append(error_block_text);
        label_container.append(error_block);

        return label_container;
    }

    render() {
        return this.container;
    }
}