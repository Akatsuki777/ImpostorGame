class Toast {

    constructor(type, message, seconds, body) {
        this.HTMLtext = `
            <img class="toast_icon" src="Resources/Toast/info.svg">
            <div class="toast_message"><p>Some message goes here</p></div>
            <div class="toast_dismiss">
                <svg width="100%" height="100%" viewBox="0 0 24 24">
                    <path d="m20.48 3.512c-2.172-2.171-5.172-3.514-8.486-3.514-6.628 0-12.001 5.373-12.001 12.001 0 3.314 1.344 6.315 3.516 8.487 2.172 2.171 5.172 3.514 8.486 3.514 6.628 0 12.001-5.373 12.001-12.001 0-3.314-1.344-6.315-3.516-8.487zm-1.542 15.427c-1.777 1.777-4.232 2.876-6.943 2.876-5.423 0-9.819-4.396-9.819-9.819 0-2.711 1.099-5.166 2.876-6.943 1.777-1.777 4.231-2.876 6.942-2.876 5.422 0 9.818 4.396 9.818 9.818 0 2.711-1.099 5.166-2.876 6.942z"/>
                    <path d="m13.537 12 3.855-3.855c.178-.194.287-.453.287-.737 0-.603-.489-1.091-1.091-1.091-.285 0-.544.109-.738.287l.001-.001-3.855 3.855-3.855-3.855c-.193-.178-.453-.287-.737-.287-.603 0-1.091.489-1.091 1.091 0 .285.109.544.287.738l-.001-.001 3.855 3.855-3.855 3.855c-.218.2-.354.486-.354.804 0 .603.489 1.091 1.091 1.091.318 0 .604-.136.804-.353l.001-.001 3.855-3.855 3.855 3.855c.2.218.486.354.804.354.603 0 1.091-.489 1.091-1.091 0-.318-.136-.604-.353-.804l-.001-.001z"/>
                </svg>
            </div>`;

        this.type = type;
        this.message = message;
        this.time = seconds * 1000; 
        this.body = body;

        this.toastParent = document.createElement("div");

        this.alert_type = {
            "0": ["toast_success", "static/Resources/Toast/success.svg"],
            "1": ["toast_error", "static/Resources/Toast/alert.svg"],
            "2": ["toast_info", "static/Resources/Toast/info.svg"]
        };

        this.makeToast();
    }

    makeToast() {
        this.createToast();
        this.addListeners();
        this.pushToast();

        setTimeout(() => {
            this.closeToast();
        }, this.time);
    }

    createToast() {
        this.toastParent.classList.add("toast_container");

        if (!this.alert_type[this.type]) {
            throw new Error("Invalid toast type");
        }

        this.toastParent.classList.add(this.alert_type[this.type][0]);
        this.toastParent.innerHTML = this.HTMLtext;

        this.toastParent.querySelector(".toast_icon")
            .setAttribute("src", this.alert_type[this.type][1]);

        this.toastParent.querySelector(".toast_message p").innerText = this.message;
    }

    pushToast() {
        this.toastParent.classList.add("toast_anim");
        this.body.append(this.toastParent);

        setTimeout(()=>{
            this.toastParent.classList.remove("toast_anim");
        },10);
    }

    addListeners() {
        const closeEl = this.toastParent.querySelector(".toast_dismiss");
        closeEl.addEventListener("click", this.closeToast.bind(this));
    }

    closeToast() {
        this.toastParent.classList.add("toast_anim");

        setTimeout(() => {
            this.toastParent.remove();
        }, 520);
    }
}
