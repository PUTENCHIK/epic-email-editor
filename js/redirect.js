try {
    MyLocalStorage.create();
} catch {
    //
}

if (! MyLocalStorage.get_current_letter()) {
    window.location.href = "myemails.html";
}