export function clearBody(){
    const body = document.querySelector("body");
    body.innerHTML = "";
}

const inputHandlers = new WeakMap();

export function makeInputEditable(selector) {
    const input = document.querySelector(selector);
    if (!input) return;
    
    const defaultValue = input.value;

    function focusHandler(){
        if (input.value === defaultValue) {
            input.value = "";
        }
    }

    function blurHandler(){
         if (input.value.trim() === "") {
            input.value = defaultValue;
        }
    }

    input.addEventListener("focus", focusHandler);
    input.addEventListener("blur", blurHandler);

    inputHandlers.set(input,{focusHandler,blurHandler});
}

export function removeInputEditable(selector){
    const input = document.querySelector(selector);
    if (!input) return;

    const handlers = inputHandlers.get(input);
    if (!handlers) return;

    input.removeEventListener("focus", handlers.focusHandler);
    input.removeEventListener("blur", handlers.blurHandler);

    inputHandlers.delete(input);
}

const editableHandlers = new WeakMap();

export function makeEditable(selector,button) {
    const p = document.querySelector(selector);
    if (!p) return;

    const defaultText = "Enter Room ID";

    const onFocus = () => {
        if (p.textContent.trim() === defaultText) p.textContent = "";
    };

    const onBlur = () => {
        if (p.textContent.trim() === "") p.textContent = defaultText;
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            p.blur();
        }
    };

    const onInput = () => {
        let value = p.textContent.replace(/[^a-zA-Z0-9]/g, "");
        if (value.length > 5) value = value.slice(0, 5);

        p.textContent = value;
        placeCaretAtEnd(p);

        if (value.length === 5) {
            value = value.toUpperCase();
            p.textContent = value;
            p.blur();
            button.classList.remove("inactive");
            button.classList.add("green_btn");
        }
    };

    const onTouchStart = () => {
        if (document.activeElement !== p) p.focus();
    };

    p.addEventListener("focus", onFocus);
    p.addEventListener("blur", onBlur);
    p.addEventListener("keydown", onKeyDown);
    p.addEventListener("input", onInput);
    p.addEventListener("touchstart", onTouchStart);

    editableHandlers.set(p, { onFocus, onBlur, onKeyDown, onInput, onTouchStart });
}

export function removeEditable(selector) {
    const p = document.querySelector(selector);
    if (!p) return;

    const handlers = editableHandlers.get(p);
    if (!handlers) return;

    p.removeEventListener("focus", handlers.onFocus);
    p.removeEventListener("blur", handlers.onBlur);
    p.removeEventListener("keydown", handlers.onKeyDown);
    p.removeEventListener("input", handlers.onInput);
    p.removeEventListener("touchstart", handlers.onTouchStart);

    p.parentNode.classList.remove("grey");

    editableHandlers.delete(p);
}

export function createHTML(string){
    const outer = document.createElement("div");
    outer.innerHTML = string.trim();

    return outer.firstChild;
}

export function getBody(){
    return document.querySelector("body");
}

export function buildItem(itemArray, isAnim = [], classList = []) {
    const body = getBody();
    const items = [];

    itemArray.forEach((template, index) => {
        const el = createHTML(template);

        if (isAnim[index] && classList[index]) {
            el.classList.add(...classList[index]);
        }

        body.append(el);
        items.push(el);
    });

    setTimeout(() => {
        items.forEach((el, index) => {
        if (isAnim[index] && classList[index]) {
            el.classList.remove(...classList[index]);
        }});
    },1);

}

export function destroyItem(selector, animClasses = [], duration = 500) {
    const el = document.querySelector(selector);
    if (!el) return;

    if (el.dataset.destroying === "true") return;
    el.dataset.destroying = "true";

    if (animClasses.length > 0) {
        el.classList.add(...animClasses);
    }

    setTimeout(() => {
        el.remove();
    }, duration);
}


//Internal Helpers

function placeCaretAtEnd(el) {
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

