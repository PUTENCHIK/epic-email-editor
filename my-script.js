window.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementsByTagName("header")[0];
    let storage = JSON.parse(localStorage['emailwizard']);
    let letters = storage['letters'];

    let btn_myemails = document.getElementsByClassName("button-myemails")[0];

    btn_myemails.addEventListener("click", (event) => {
        let storage = JSON.parse(localStorage['emailwizard']);
        storage['current_letter'] = null;
        localStorage['emailwizard'] = JSON.stringify(storage);
        window.location.href = "myemails.html";
    });

    let letter_name = document.getElementsByClassName("letter-name")[0];

    for (let i = 0; i < letters.length; i++) {
        if (letters[i]['id'] === storage['current_letter']) {
            letter_name.textContent = letters[i]['title'];
            break;
        }
    }

    let btn_save = document.getElementsByClassName("button-save")[0];
    btn_save.addEventListener("click", () => {
        let redactor = document.getElementsByClassName("footer")[0];

        let letter_html = redactor.outerHTML;
        console.log(redactor);
        console.log(letter_html);
        let storage = JSON.parse(localStorage['emailwizard']);
        let letters = storage['letters'];

        for (let i = 0; i < letters.length; i++) {
            if (letters[i]['id'] === storage['current_letter']) {
                storage['letters'][i]['html'] = letter_html;
                                break;
            }
        }

        localStorage['emailwizard'] = JSON.stringify(storage);
    });

});