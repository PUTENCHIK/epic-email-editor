console.log('upload-template');

try {
    MyLocalStorage.create();
} catch {
    //
}

if (! MyLocalStorage.get_letter_template()) {
    let tag_html = document.getElementsByTagName("html");
    if (tag_html.length !== 0) {
        let html = tag_html[0];
        html.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        MyLocalStorage.set_letter_template(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">` + html.outerHTML);
    } else {
        MyLocalStorage.set_letter_template(null);
    }
}
window.location.href = "index.html";