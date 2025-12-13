const YES_ICON = `<svg fill="#FFF" width="100%" height="100%" viewBox="0 0 24 24" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"><path d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"/></svg>`;
const NO_ICON = `<svg width="100%" height="100%" viewBox="0 0 800 800" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><g transform="matrix(30.460563,0,0,30.460563,156.315493,156.315493)"><path d="M14.544,3.644C14.691,3.501 14.774,3.304 14.775,3.098C14.777,2.893 14.695,2.695 14.55,2.55C14.214,2.214 13.786,1.786 13.45,1.45C13.305,1.305 13.107,1.223 12.902,1.225C12.696,1.226 12.499,1.309 12.356,1.456C11.079,2.758 8,5.9 8,5.9C8,5.9 4.921,2.758 3.644,1.456C3.501,1.309 3.304,1.226 3.098,1.225C2.893,1.223 2.695,1.305 2.55,1.45C2.214,1.786 1.786,2.214 1.45,2.55C1.305,2.695 1.223,2.893 1.225,3.098C1.226,3.304 1.309,3.501 1.456,3.644C2.758,4.921 5.9,8 5.9,8C5.9,8 2.758,11.079 1.456,12.356C1.309,12.499 1.226,12.696 1.225,12.902C1.223,13.107 1.305,13.305 1.45,13.45C1.786,13.786 2.214,14.214 2.55,14.55C2.695,14.695 2.893,14.777 3.098,14.775C3.304,14.774 3.501,14.691 3.644,14.544C4.921,13.242 8,10.1 8,10.1C8,10.1 11.079,13.242 12.356,14.544C12.499,14.691 12.696,14.774 12.902,14.775C13.107,14.777 13.305,14.695 13.45,14.55C13.786,14.214 14.214,13.786 14.55,13.45C14.695,13.305 14.777,13.107 14.775,12.902C14.774,12.696 14.691,12.499 14.544,12.356C13.242,11.079 10.1,8 10.1,8C10.1,8 13.242,4.921 14.544,3.644Z" style="fill:#fff;fill-rule:nonzero"/></g></svg>`;

const MODAL_STYLES = `
.im_user_response_modal{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    width: 95vw;
    left: 2.5vw;
    top: 7vh;
    border-radius: 20px;
    background-color: #FFF;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    z-index: 1000;
}

.im_urm_text_container{
    width: 90%;
    font-family: 'Roboto', sans-serif;
}

.im_urm_text_enter{
    margin: 20px auto;
    width: 100%;
}

.im_urm_text_input{
    width: 90%;
    font-family: 'Roboto', sans-serif;
    aspect-ratio: 1/0.2;
    border-radius: 1000px;
    background-color: #EBEBEB;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.im_urm_text_input > p{
    text-align: center;
    font-family: 'Permanent Marker', sans-serif;
    font-size: x-large;
    min-width: 100px;
}

.im_urm_title{
    margin: 12px 0;
    text-align: center;
    font-weight: 700;
    font-size: xx-large;
}

.im_urm_text{
    font-weight: 400;
}

.im_urm_voting{
    margin: 12px auto;
    width: 90%;
}

.im_urm_voted{
    border: solid 2px #FA448C;
}

.im_urm_button{
    width: 51.212px;
    height: 51.212px;
    border-radius: 1000px;
    border: solid 1px #EEE;
    transition: all 0.2s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
}

#im_urm_yes {
    background-color: #3C947A;
}

#im_urm_yes:hover{
    background-color: #357C67;
}

#im_urm_yes:active{
    background-color: #2C5F50;
}

#im_urm_no {
    background-color: #ED3419;
}

#im_urm_no:hover{
    background-color: #DF2C14;
}

#im_urm_no:active{
    background-color: #C61A09;
}

.im_urm_respond{
    width: 40%;
    min-width: 140px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px auto 30px auto;
}
`;

export class ModalObject {
    constructor(parent = document.body) {
        ModalObject.ensureStyles();

        this.parent = parent || document.body;
        this.placeholderText = "Input Your Guess";
        this.placeholderActive = true;
        this.selectedIndex = -1;
        this.currentMode = null;

        this.modal = this.createModal();
        this.parent.appendChild(this.modal);
        this.hide();

        this.attachInputHandlers();
        this.attachButtonHandlers();
    }

    show(type, arg2, arg3, arg4) {
        if (this.activeResolver) {
            this.resolveAndReset(null);
        }

        const normalizedType = (type || "").toLowerCase();

        if (normalizedType === "poll") {
            const options = arg2;
            const title = arg3 || "";
            const text = arg4 || "";
            this.configurePoll(options);
            this.setHeader(title, text);
        } else if (normalizedType === "input") {
            const title = arg2 || "";
            const text = arg3 || "";
            this.configureInput();
            this.setHeader(title, text);
        } else if (normalizedType === "confirm") {
            const title = arg2 || "";
            const text = arg3 || "";
            this.configureConfirm();
            this.setHeader(title, text);
        } else {
            throw new Error("Unsupported modal type. Use 'poll', 'input', or 'confirm'.");
        }

        this.modal.style.display = "flex";
        this.modal.setAttribute("aria-hidden", "false");
        this.modal.removeAttribute("inert");

        return new Promise((resolve) => {
            this.activeResolver = resolve;
        });
    }

    hide() {
        if (this.modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        this.modal.style.display = "none";
        this.modal.setAttribute("aria-hidden", "true");
        this.modal.setAttribute("inert", "");
        this.clearSelection();
        this.resetInput();
        this.currentMode = null;
    }

    configurePoll(options) {
        this.currentMode = "poll";
        this.imUrmVoting.innerHTML = "";
        this.imUrmVoting.style.display = "block";
        this.textEnterContainer.style.display = "none";

        Object.entries(options).forEach(([key, value]) => {
            const optionEl = this.createPollOption(value.name, value.color, key);
            this.imUrmVoting.appendChild(optionEl);
        });

        this.selectedIndex = -1;
    }

    configureInput() {
        this.currentMode = "input";
        this.imUrmVoting.style.display = "none";
        this.textEnterContainer.style.display = "block";
        this.resetInput();
    }

    configureConfirm() {
        this.currentMode = "confirm";
        this.imUrmVoting.style.display = "none";
        this.textEnterContainer.style.display = "none";
        this.resetInput();
    }

    createModal() {
        const modal = document.createElement("div");
        modal.classList.add("im_user_response_modal");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");

        const textContainer = document.createElement("div");
        textContainer.classList.add("im_urm_text_container");

        this.titleEl = document.createElement("div");
        this.titleEl.classList.add("im_urm_title");

        const textWrapper = document.createElement("div");
        textWrapper.classList.add("im_urm_text");
        this.messageParagraph = document.createElement("p");
        textWrapper.appendChild(this.messageParagraph);

        textContainer.appendChild(this.titleEl);
        textContainer.appendChild(textWrapper);
        modal.appendChild(textContainer);

        this.textEnterContainer = document.createElement("div");
        this.textEnterContainer.classList.add("im_urm_text_enter");

        const textInputWrapper = document.createElement("div");
        textInputWrapper.classList.add("im_urm_text_input");

        this.inputEl = document.createElement("p");
        this.inputEl.classList.add("im_urm_text");
        this.inputEl.setAttribute("contenteditable", "true");
        this.inputEl.setAttribute("role", "textbox");
        this.inputEl.setAttribute("aria-label", "Modal input");
        this.inputEl.setAttribute("tabindex", "0");

        textInputWrapper.appendChild(this.inputEl);
        this.textEnterContainer.appendChild(textInputWrapper);
        modal.appendChild(this.textEnterContainer);

        this.imUrmVoting = document.createElement("div");
        this.imUrmVoting.classList.add("im_urm_voting");
        modal.appendChild(this.imUrmVoting);

        const respondContainer = document.createElement("div");
        respondContainer.classList.add("im_urm_respond");

        this.yesButton = document.createElement("button");
        this.yesButton.id = "im_urm_yes";
        this.yesButton.classList.add("im_urm_button");
        this.yesButton.innerHTML = YES_ICON;

        this.noButton = document.createElement("button");
        this.noButton.id = "im_urm_no";
        this.noButton.classList.add("im_urm_button");
        this.noButton.innerHTML = NO_ICON;

        respondContainer.appendChild(this.yesButton);
        respondContainer.appendChild(this.noButton);
        modal.appendChild(respondContainer);

        return modal;
    }

    createPollOption(option, color, index) {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("im_room_participant");
        optionContainer.dataset.index = String(index);

        const colorBlock = document.createElement("div");
        colorBlock.classList.add("im_color_code");
        colorBlock.style.backgroundColor = color;

        const nameWrapper = document.createElement("div");
        nameWrapper.classList.add("im_room_participant_name");
        const name = document.createElement("p");
        const label = option;
        name.textContent = label;
        nameWrapper.appendChild(name);

        optionContainer.appendChild(colorBlock);
        optionContainer.appendChild(nameWrapper);

        optionContainer.addEventListener("click", () => {
            this.setSelectedIndex(index);
        });

        return optionContainer;
    }

    attachInputHandlers() {
        const focusHandler = () => {
            if (this.placeholderActive) {
                this.inputEl.innerText = "";
                this.placeholderActive = false;
            }
        };

        const blurHandler = () => {
            if (!this.inputEl.textContent.trim()) {
                this.resetInput();
            }
        };

        this.inputEl.addEventListener("focus", focusHandler);
        this.inputEl.addEventListener("click", focusHandler);
        this.inputEl.addEventListener("blur", blurHandler);
    }

    attachButtonHandlers() {
        this.yesButton.addEventListener("click", () => {
            if (!this.activeResolver) {
                return;
            }

            if (this.currentMode === "poll") {
                this.resolveAndReset(this.selectedIndex);
            } else if (this.currentMode === "confirm") {
                this.resolveAndReset(true);
            } else {
                this.resolveAndReset(this.getInputValue());
            }
        });

        this.noButton.addEventListener("click", () => {
            if (!this.activeResolver) {
                return;
            }

            if (this.currentMode === "poll") {
                this.resolveAndReset(-1);
            } else if (this.currentMode === "confirm") {
                this.resolveAndReset(false);
            } else {
                this.resolveAndReset("");
            }
        });
    }

    resolveAndReset(value) {
        if (this.activeResolver) {
            this.activeResolver(value);
            this.activeResolver = null;
        }
        this.hide();
    }

    setHeader(title, text) {
        this.titleEl.textContent = title;
        this.messageParagraph.textContent = text;
    }

    resetInput() {
        this.placeholderActive = true;
        this.inputEl.innerText = this.placeholderText;
    }

    getInputValue() {
        return this.placeholderActive ? "" : this.inputEl.textContent.trim();
    }

    setSelectedIndex(index) {
        this.selectedIndex = index;
        const options = this.imUrmVoting.querySelectorAll(".im_room_participant");
        options.forEach((optionEl) => {
            optionEl.classList.toggle("im_urm_voted", optionEl.getAttribute('data-index') === structuredClone(index));
        });
    }

    clearSelection() {
        this.selectedIndex = -1;
        this.imUrmVoting.querySelectorAll(".im_room_participant")
            .forEach((optionEl) => optionEl.classList.remove("im_urm_voted"));
    }

    static ensureStyles() {
        if (ModalObject.styleInjected) {
            return;
        }

        const styleEl = document.createElement("style");
        styleEl.textContent = MODAL_STYLES;
        document.head.appendChild(styleEl);
        ModalObject.styleInjected = true;
    }
}

ModalObject.styleInjected = false;

export const modalObject = new ModalObject();

export default modalObject;
