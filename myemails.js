// emailNum = 0;


// function create(event) {

//     const add = document.querySelector('.add');
//     const main = document.querySelector('.main');

//     let currentEmailNum = emailNum + 1;
    
//     console.log(currentEmailNum);

//     let email = document.createElement("div");
//     email.classList.add("email");
//     email.classList.add("email" + currentEmailNum);

//     let head = document.createElement("div");
//     head.classList.add("head");
//     head.textContent = "project" + currentEmailNum;
//     email.append(head);

//     let icons = document.createElement("div");
//     icons.classList.add("icons");
//     head.append(icons);

//     let editIcon = document.createElement("div");
//     editIcon.classList.add("edit");
//     editIcon.textContent = "✏️";
//     icons.append(editIcon);

//     let deleteIcon = document.createElement("div");
//     deleteIcon.classList.add("delete");
//     deleteIcon.textContent = "🗑️";
//     icons.append(deleteIcon);

//     let picture = document.createElement("div");
//     picture.classList.add("picture");
//     email.append(picture);

//     let img = document.createElement("img");
//     img.src = "./img/11.png";
//     img.alt = "Описание картинки";
//     picture.append(img);



//     function addNewElement() {
//         add.insertAdjacentElement('afterend', email);
//     }

//     add.addEventListener('click', addNewElement);


//     emailNum = emailNum + 1;
    

// }

// Получаем кнопку "add" и блок, в который будем добавлять новые элементы
const addButton = document.getElementById('add');
const container = document.getElementById('main');
const modalContainer = document.getElementById('modal-container');
const storage_name = "emailwizard";

createLocalStorage();
renderLetters();

// Функция для создания нового элемента
// function createNewElement(title) {
//     const newElement = document.createElement('div');
//     newElement.className = 'email';
//
//     const p = document.createElement('p');
//     p.textContent = title;
//
//     const button = document.createElement('button');
//     button.textContent = 'Delete';
//     button.addEventListener('click', function() {
//         container.removeChild(newElement);
//     });
//
//     newElement.appendChild(p);
//     newElement.appendChild(button);
//
//
//     container.appendChild(newElement);
// }

function createLocalStorage() {
    if (!localStorage.getItem(storage_name)) {
        let storage = {
            'current_letter': null,
            'letters': [],
        }
        localStorage.setItem(storage_name, JSON.stringify(storage));
    }
}

function getLocalStorage() {
    let storage = localStorage.getItem(storage_name);
    if (storage === null) {
        throw new Error(`No storage '${storage_name}'`);
    }
    return JSON.parse(storage);
}

function setLocalStorage(new_content) {
    localStorage.setItem(storage_name, JSON.stringify(new_content));
}

function getLetters() {
    let storage = getLocalStorage();
    let letters = storage['letters'];
    if (letters === null) {
        throw new Error("No key 'letters' in storage");
    }
    return letters;
}

function getNewId() {
    let letters = getLetters();
    let max_id = 0;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i]['id'] > max_id) {
            max_id = letters[i]['id'];
        }
    }
    return max_id + 1;
}

function renderLetters() {
    let letters = getLetters();

    for (let i = 0; i < letters.length; i++) {
        let existing_letter = document.getElementsByName("email-" + letters[i]['id']);
        if (existing_letter.length !== 0) {
            continue;
        }
        let letter = createNewElement(letters[i]['id'], letters[i]['title']);
        container.append(letter);
    }
}

function addNewLetter(title) {
    let id = getNewId();
    let storage = getLocalStorage();
    storage['letters'].push({
        'id': id,
        'title': title,
        'html': ""
    });
    setLocalStorage(storage);
}

function deleteLetter(id) {
    let storage = getLocalStorage();
    let letters = getLetters();
    for (let i = 0; i < letters.length; i++) {
        if (letters[i]['id'] === id) {
            storage['letters'].splice(i, 1);
            if (storage['current_letter'] === id) {
                storage['current_letter'] = null;
            }
            break;
        }
    }
    setLocalStorage(storage);
    deleteElement(id);
}

function getLetterFromStorage(id) {
    let letters = getLetters();
    for (let i = 0; i < letters.length; i++) {
        if (letters[i]['id'] === id) {
            return letters[i];
        }
    }
    return undefined;
}

function changeCurrentLetter(id) {
    let storage = getLocalStorage();
    if (storage['current_letter'] === undefined) {
        throw new Error(`No key 'current_letter' in storage.`);
    }
    storage['current_letter'] = id;
    setLocalStorage(storage);
}

function createNewElement(id, title) {
    let email_box = document.createElement("div");
    email_box.className = "email";
    let email_head = document.createElement("div");
    email_head.className = "head";
    let email_name = document.createElement("div");
    email_name.className = "email-name";
    email_name.textContent = title;
    let icons_box = document.createElement("div");
    icons_box.className = "icons";

    let redact_box = document.createElement("div");
    redact_box.className = "redact button button-icon";
    let redact_icon = document.createElement("img");
    redact_icon.className = "icon";
    redact_icon.src = "img/pencil-icon.png";
    redact_icon.alt = "redact letter";

    let delete_box = document.createElement("div");
    delete_box.className = "delete button button-icon";
    let delete_icon = document.createElement("img");
    delete_icon.className = "icon";
    delete_icon.src = "img/bin-icon.png";
    delete_icon.alt = "delete letter";

    let hidden_input = document.createElement("input");
    hidden_input.type = "hidden";
    hidden_input.name = "email-" + id;

    redact_box.addEventListener("click", () => {
        changeCurrentLetter(id);
        window.location.href = "index.html";
    });

    delete_box.addEventListener("click", () => {
        deleteLetter(id);
    });

    redact_box.append(redact_icon);
    delete_box.append(delete_icon);
    icons_box.append(redact_box);
    icons_box.append(delete_box);
    email_head.append(email_name);
    email_head.append(icons_box);
    email_box.append(email_head);
    email_box.append(hidden_input);

    return email_box;
    // container.append(email_box);
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
        addNewLetter(title);
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