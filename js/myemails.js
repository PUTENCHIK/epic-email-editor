window.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById('add');
    const container = document.getElementById('main');
    const modalContainer = document.getElementById('modal-container');

    try {
        MyLocalStorage.create();
    } catch {
        //
    }
    renderLetters();

    function renderLetters() {
        let letters = MyLocalStorage.get_letters();

        for (let i = 0; i < letters.length; i++) {
            let existing_letter = document.getElementsByName("email-" + letters[i]['id']);
            if (existing_letter.length !== 0) {
                continue;
            }
            let letter = createNewElement(letters[i]['id'], letters[i]['title']);
            container.append(letter);
        }
    }

    function deleteLetter(id) {
        MyLocalStorage.delete_letter(id);
        deleteElement(id);
    }

    function createNewElement(id, title) {
        let email_box = document.createElement("div");
        email_box.className = "email";
        let email_head = document.createElement("div");
        email_head.className = "head";
        let email_body = document.createElement("div");
        email_body.className = "email-body";
        let email_name = document.createElement("div");
        email_name.className = "email-name";
        email_name.textContent = title;
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
            window.location.href = "index.html";
        });

        delete_box.addEventListener("click", () => {
            deleteLetter(id);
        });

        let letter = MyLocalStorage.get_letter(id);

        if (letter && letter['html']) {
            email_body.insertAdjacentHTML("beforeend", letter['html']);
            email_body.classList.add("scaled");
        }
        else {
            email_body.textContent = "Этот шаблон ещё не отредактирован";
        }

        redact_box.append(redact_icon);
        delete_box.append(delete_icon);
        icons_box.append(redact_box);
        icons_box.append(delete_box);
        email_head.append(email_name);
        email_head.append(icons_box);
        email_box.append(email_head);
        email_box.append(email_body);
        email_box.append(hidden_input);

        return email_box;
    }

    function deleteElement(id) {
        let hidden_input = document.getElementsByName("email-" + id);
        if (hidden_input.length === 0) {
            throw new Error(`No element-letter for id '${id}'`);
        }
        let email_box = hidden_input[0].parentElement;
        email_box.remove();
    }

    // Открываем модальное окно при клике на кнопку "add"
    addButton.addEventListener('click', function() {
        modalContainer.style.display = 'flex';
    });

    // Обработчик клика по кнопке "Save" в модальном окне
    document.getElementById('save').addEventListener('click', function() {
        const title = document.getElementById('title').value;
        if (title) {
            MyLocalStorage.create_letter(title);
            renderLetters();
        } else {
            alert('Вы не ввели название!');
        }
        modalContainer.style.display = 'none';
    });

    // Закрываем модальное окно при клике на кнопку "Close"
    document.getElementById('close').addEventListener('click', function() {
        modalContainer.style.display = 'none';
    });

});