class MyLocalStorage {

    static name = "epic_email_editor";

    static check_exists() {
        return localStorage[this.name] !== undefined;
    }

    static get_letter_template() {
        let storage = this.get();
        return storage['letter_template'];
    }

    static set_letter_template(html) {
        let storage = this.get();
        storage['letter_template'] = html;
        this.set(storage);
    }

    static create() {
        if (this.check_exists()) {
            throw new Error(`Local storage with name '${this.name}' is already exists.`);
        }
        let object = {
            "letter_template": null,
        }
        localStorage[this.name] = JSON.stringify(object);
    }

    static get() {
        if (!this.check_exists()) {
            throw new Error(`Local storage '${this.name}' doesn't exist`);
        }
        return JSON.parse(localStorage[this.name]);
    }

    static set(new_content) {
        localStorage[this.name] = JSON.stringify(new_content);
    }
}