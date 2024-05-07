class EmailBlocksCreator {
    static getContainer() {
        return document.getElementsByClassName("main")[0];
    }

    static renderLetters() {
        let letters = MyLocalStorage.get_letters();

        for (let i = 0; i < letters.length; i++) {
            let existing_letter = document.getElementsByName("email-" + letters[i]['id']);
            if (existing_letter.length !== 0) {
                continue;
            }
            let letter = EmailBlocksCreator.createEmailBlock(letters[i]['id'], letters[i]['title']);
            EmailBlocksCreator.getContainer().append(letter);
        }
    }

    static createEmailBlock(id, title) {
        let email_box = document.createElement("div");
        email_box.className = "email";
        let email_head = document.createElement("div");
        email_head.className = "head";
        let email_body = document.createElement("div");
        email_body.className = "email-body";
        let email_name = document.createElement("div");
        email_name.className = "email-name";
        let name_text = document.createElement("span");
        name_text.textContent = title;
        name_text.title = title;
        let icons_box = document.createElement("div");
        icons_box.className = "icons";

        let redact_box = document.createElement("div");
        redact_box.className = "redact button button-icon";
        let redact_icon = document.createElement("img");
        redact_icon.className = "icon";
        redact_icon.src = "../img/pencil-icon.png";
        redact_icon.alt = "redact letter";

        let delete_box = document.createElement("div");
        delete_box.className = "delete button button-icon";
        let delete_icon = document.createElement("img");
        delete_icon.className = "icon";
        delete_icon.src = "../img/bin-icon.png";
        delete_icon.alt = "delete letter";

        let hidden_input = document.createElement("input");
        hidden_input.type = "hidden";
        hidden_input.name = "email-" + id;

        redact_box.addEventListener("click", () => {
            MyLocalStorage.set_current_letter(id);
            window.location.href = "../html/index.html";
        });

        delete_box.addEventListener('click', function() {
            let delete_window = new DeleteEmailWindow(id).render();
            EmailBlocksCreator.getContainer().append(delete_window);
        });

        let letter = MyLocalStorage.get_letter(id);

        if (letter && letter['html']) {
            email_body.innerHTML = letter['html'];
            email_body.classList.add("scaled");
        }
        else {
            email_body.textContent = "Этот шаблон ещё не отредактирован";
        }

        redact_box.append(redact_icon);
        delete_box.append(delete_icon);
        icons_box.append(redact_box);
        icons_box.append(delete_box);
        email_name.append(name_text);
        email_head.append(email_name);
        email_head.append(icons_box);
        email_box.append(email_head);
        email_box.append(email_body);
        email_box.append(hidden_input);

        return email_box;
    }

    static deleteLetter(id) {
        MyLocalStorage.delete_letter(id);
        EmailBlocksCreator.deleteEmailBlock(id);
    }

    static deleteEmailBlock(id) {
        let hidden_input = document.getElementsByName("email-" + id);
        if (hidden_input.length === 0) {
            throw new Error(`No element-letter for id '${id}'`);
        }
        let email_box = hidden_input[0].parentElement;
        email_box.remove();
    }
}