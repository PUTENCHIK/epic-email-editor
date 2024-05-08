class MyLocalStorage {

    static name = "emailwizard";

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
            "current_letter": null,
            "letters": [],
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

    static get_letters() {
        return this.get()['letters'];
    }

    static get_letter(id) {
        let letters = this.get_letters();
        for (let i = 0; i < letters.length; i++) {
            if (letters[i]['id'] === id) {
                return letters[i];
            }
        }
    }

    static get_current_letter() {
        let current_id = this.get()['current_letter'];
        return this.get_letter(current_id);
    }

    static set_current_letter(value) {
        if (typeof value !== 'number' && value !== null) {
            throw new Error("Type of current_letter must be number or null");
        }
        let storage = this.get();
        storage['current_letter'] = value;
        this.set(storage);
    }

    static set_html_current_letter(html) {
        let storage = this.get();
        let current_id = storage['current_letter'];
        let letters = this.get_letters();

        for (let i = 0; i < letters.length; i++) {
            if (letters[i]['id'] === current_id) {
                storage['letters'][i]['html'] = html;
            }
        }

        this.set(storage);
    }

    static get_new_id() {
        let letters = this.get_letters();
        let max_id = 0;
        for (let i = 0; i < letters.length; i++) {
            if (letters[i]['id'] > max_id) {
                max_id = letters[i]['id'];
            }
        }
        return max_id + 1;
    }

    static create_letter(title) {
        let id = this.get_new_id();
        let storage = this.get();
        storage['letters'].push({
            'id': id,
            'title': title,
            'html': "",
        });
        this.set(storage);
    }

    static delete_letter(id) {
        let storage = this.get();
        let letters = this.get_letters();

        for (let i = 0; i < letters.length; i++) {
            if (letters[i]['id'] === id) {
                storage['letters'].splice(i, 1);
                let current_letter = this.get_current_letter();
                if (current_letter && current_letter['id'] === id) {
                    this.set_current_letter(null);
                }
                break;
            }
        }
        this.set(storage);
    }
}