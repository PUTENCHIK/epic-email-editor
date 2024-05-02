try {
    MyLocalStorage.create();
} catch {
    //
}

let storage = MyLocalStorage.get();

if (storage['current_letter'] === null) {
    window.location.href = "myemails.html";
}