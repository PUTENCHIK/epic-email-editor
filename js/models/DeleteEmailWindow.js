/**
 * Окно удаления письма их локального хранилища и со страницы по переданному id
 */
class DeleteEmailWindow extends FixedWindow {
    constructor(letterId) {
        super("Удаление письма");

        let title = MyLocalStorage.get_letter(letterId)['title'];
        this.info_block = DeleteEmailWindow.createTextBlock(`Вы действительно хотите удалить письмо "${title}"?`);

        this.button_cancel = DeleteEmailWindow.createButton("Отмена", "button-cancel");
        this.button_cancel.addEventListener("click", () => {
            this.closeWindow();
        });

        this.button_delete = DeleteEmailWindow.createButton("Удалить", "button-delete", true);
        this.button_delete.addEventListener("click", () => {
            EmailBlocksCreator.deleteLetter(letterId);
            this.closeWindow();
        });

        this.window.append(this.info_block);
        this.buttons_group.append(this.button_cancel);
        this.buttons_group.append(this.button_delete);
        this.window.append(this.buttons_group);
    }
}