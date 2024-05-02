window.addEventListener("DOMContentLoaded", () => {

    function createMainTable() {
        let table = document.createElement("table");
        table.id = "mainTable";
        table.className = "mainTable table-600";
        table.cellPadding = "0";
        table.cellSpacing = "0";
        table.style.width = "600";
        table.align = "center";
        let tr_header = document.createElement("tr");
        tr_header.className = "header";
        tr_header.id = "header";
        let tr_main = document.createElement("tr");
        tr_main.className = "main";
        tr_main.id = "main";
        let tr_footer = document.createElement("tr");
        tr_footer.className = "footer";
        tr_footer.id = "footer";

        table.append(tr_header);
        table.append(tr_main);
        table.append(tr_footer);

        return table;
    }

    function readLetterContent() {
        let templates = document.getElementsByClassName("mainTable")[0].getElementsByClassName("template");
        let table = createMainTable();
        let header, footer, mainers = [];
        console.log(table.outerHTML);
        for (let i = 0; i < templates.length; i++) {
            if (templates[i].className.includes("header")) {
                //
            }
            else if (templates[i].className.includes("main")) {
                //
            }
            else if (templates[i].className.includes("footer")) {
                //
            }
        }
    }

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
        readLetterContent()
        let letter = document.getElementsByClassName("mainTable")[0];
        let letter_html = letter.innerHTML;
        // console.log(letter_html);

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