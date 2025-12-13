export class NotificationButton {
    constructor(imgSrc) {
        NotificationButton.ensureStyles();

        const root = document.createElement("button");
        root.classList.add("im_buttons_circle");

        const icon = document.createElement("img");
        icon.setAttribute("src", imgSrc);

        const notificationIndicator = document.createElement("div");
        notificationIndicator.classList.add("im_buttons_notification");

        root.appendChild(icon);
        root.appendChild(notificationIndicator);

        root.setNotification = (isActive) => {
            const indicatorColor = isActive ? "crimson" : "transparent";
            notificationIndicator.style.backgroundColor = indicatorColor;
        };

        root.setNotification(false);

        return root;
    }

    static ensureStyles() {
        if (NotificationButton.styleInjected) {
            return;
        }

        const styleEl = document.createElement("style");
        styleEl.textContent = `
.im_buttons_circle{
    width: 51.212px;
    height: 51.212px;
    border-radius: 1000px;
    border: solid 0.45px #EFEFEF;
    transition: all 0.2s ease-in;
}
.im_buttons_circle:hover{
    background-color: #EBEBEB;
}

.im_buttons_circle:active{
    background-color: #CCC;
}

.im_buttons_circle > img{
    width: 60%;
    height: 60%;
    margin: 10.24px;
}

.im_buttons_notification{
    position: relative;
    top: -51.212px;
    left: 41.212px;
    background-color: crimson;
    border-radius: 100px;
    width: 10px;
    height: 10px;
}`;

        document.head.appendChild(styleEl);
        NotificationButton.styleInjected = true;
    }
}

NotificationButton.styleInjected = false;
