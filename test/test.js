window.addEventListener("DOMContentLoaded", () => {
    let window = new SendEmailWindow().render();
    document.getElementsByClassName("main")[0].append(window);

    let ps = document.getElementsByTagName("p");
    for (let i = 0; i < ps.length; i++) {
        ps[i].addEventListener("click", () => {
            console.log(ps[i]);
        });
    }
});