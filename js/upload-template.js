window.addEventListener("DOMContentLoaded", () => {

    if (! MyLocalStorage.get_letter_template()) {
        let tag_html = document.getElementsByTagName("html");
        if (tag_html.length !== 0) {
            let html = tag_html[0];
            // let scripts = html.getElementsByTagName("script");
            // for (let i = 0; i < scripts.length; i++) {
            //     scripts[i].remove();
            // }
            MyLocalStorage.set_letter_template(html.outerHTML);
        } else {
            MyLocalStorage.set_letter_template(null);
        }
    }

    window.location.href = "myemails.html";
})