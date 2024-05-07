window.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById('add');

    try {
        MyLocalStorage.create();
    } catch {
        //
    }
    MyLocalStorage.set_current_letter(null);
    EmailBlocksCreator.renderLetters();

    addButton.addEventListener('click', function() {
        let create_window = new CreateEmailWindow().render();
        document.getElementsByClassName("main")[0].append(create_window);
    });
});