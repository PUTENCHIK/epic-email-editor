window.addEventListener("DOMContentLoaded", () => {
    let window = new SendEmailWindow().render();
    console.log(window);
    document.getElementsByClassName("main")[0].append(window);
});