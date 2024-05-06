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
                    cell.innerHTML = templates[i].outerHTML;
                    block.append(cell);
                }
            }
        }
        for (let j = 0; j < blocks.length; j++) {
            let block = table.getElementsByClassName(blocks[j])[0]
            if (block.children.length === 0) {
                block.remove();
            }
        }
        table.classList.add("from-storage");
        return table.outerHTML;
    }

    try {
        MyLocalStorage.create();
    } catch {
        //
    }

    let btn_myemails = document.getElementsByClassName("button-myemails")[0];

    btn_myemails.addEventListener("click", () => {
        MyLocalStorage.set_current_letter(null);
        window.location.href = "myemails.html";
    });

    let letter_name = document.getElementsByClassName("letter-name")[0];
    letter_name.textContent = MyLocalStorage.get_current_letter()['title'];

    let btn_save = document.getElementsByClassName("button-save")[0];
    let modal_save = document.getElementsByClassName("modal-save")[0];
    let save_yes_btn = document.getElementById("save-yes-btn");
    let save_no_btn = document.getElementById("save-no-btn");

    btn_save.addEventListener("click", () => {
        modal_save.classList.remove("dissable");
    });

    save_no_btn.addEventListener("click", () => {
        modal_save.classList.add("dissable");
    });

    save_yes_btn.addEventListener("click", () => {
        let letter_html = readLetterContent();
        MyLocalStorage.set_html_current_letter(letter_html);
        modal_save.classList.add("dissable");
        // window.location.href="../html/index.html";
    });

    let btn_send = document.getElementsByClassName("button-save")[0];
    btn_send.addEventListener("click", () => {
        // do
    })
});