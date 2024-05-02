window.addEventListener("DOMContentLoaded", () => {

    function createMainTable() {
        let table = document.createElement("table");
        table.id = "mainTable";
        table.className = "mainTable table-600";
        table.cellPadding = "0";
        table.cellSpacing = "0";
        table.style.width = "600";
        table.align = "center";
        let tbody = document.createElement("tbody");
        let tr_header = document.createElement("tr");
        tr_header.className = "header";
        tr_header.id = "header";
        let tr_main = document.createElement("tr");
        tr_main.className = "main";
        tr_main.id = "main";
        let tr_footer = document.createElement("tr");
        tr_footer.className = "footer";
        tr_footer.id = "footer";

        tbody.append(tr_header);
        tbody.append(tr_main);
        tbody.append(tr_footer);
        table.append(tbody);

        return table;
    }

    function readLetterContent() {
        let templates = document.getElementsByClassName("mainTable")[0].getElementsByClassName("template");
        let table = createMainTable();
        let blocks = ["header", "main", "footer"];
        for (let i = 0; i < templates.length; i++) {
            for (let j = 0; j < blocks.length; j++) {
                if (templates[i].className.includes(blocks[j])) {
                    let cell = document.createElement("td");
                    let block = table.getElementsByClassName(blocks[j])[0];
                    let template = templates[i];
                    cell.innerHTML = template.outerHTML;

                    block.append(cell);
                }
            }
        }
        // console.log(table);
        // console.log(table.outerHTML);
        return table.outerHTML;
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
        let letter_html = readLetterContent();
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