import modalObject from "./plugins/ModalObject.js";
import { loadHome, onAuthOptionHandler } from "./stage_management/stageLoader.js";

document.addEventListener('DOMContentLoaded',async ()=>{

    await loadHome();
    window.onAuthOptionHandler = onAuthOptionHandler;
});
