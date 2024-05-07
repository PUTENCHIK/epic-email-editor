class FixedWindow {
    constructor(title = "Название окна") {
        this.title = title;

        this.container = document.createElement("div");
        this.container.className = "window-container";

        this.window = document.createElement("div");
        this.window.className = "fixed-window";

        this.title_window = document.createElement("h2");
        this.title_window.className = "window-title";
        this.title_window.textContent = this.title;

        this.buttons_group = document.createElement("div");
        this.buttons_group.className = "buttons-group";

        this.window.append(this.title_window);
        this.window.append(this.buttons_group);
        this.container.append(this.window);
    }

    render() {
        return this.container;
    }
}