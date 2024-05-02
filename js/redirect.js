let storage = JSON.parse(localStorage['emailwizard']);

if (storage['current_letter'] === null) {
    window.location.href = "myemails.html";
}