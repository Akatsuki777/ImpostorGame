export class GameCard {
    constructor(name) {
        GameCard.ensureStyles();

        const normalizedName = typeof name === "string" ? name.trim() : "";
        const displayName = normalizedName
            ? normalizedName[0].toUpperCase() + normalizedName.slice(1)
            : "";
        const imgSrc = `static/Resources/${normalizedName}.webp`;

        this.container = document.createElement("div");
        this.container.classList.add("im_game_card_container_tmp","im_game_card_container");
        this.container.style.left = "120vw";
        this.container.style.top = '1vh';
        this.container.style.rotate = '-20deg';

        const card = document.createElement("div");
        card.classList.add("im_game_card");

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("im_game_card_image");

        const img = document.createElement("img");
        img.setAttribute("src", imgSrc);
        imageWrapper.appendChild(img);

        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("im_game_card_title");

        const title = document.createElement("p");
        title.innerText = displayName;
        titleWrapper.appendChild(title);

        card.appendChild(imageWrapper);
        this.container.appendChild(card);
        this.container.appendChild(titleWrapper);
    }

    getElement(){
        this.container.style.left = "0vw";
        this.container.style.top = '';
        this.container.style.rotate = '';

        this.container.classList.remove("im_game_card_container_tmp");

        return this.container;
    }

    replaceElement(el){
        el.after(this.container);

        setTimeout(()=>{
            this.container.style.left = "0vw";
            this.container.style.top = '';
            this.container.style.rotate = '';
        },1);

        setTimeout(()=>{
            el.remove();
            this.container.classList.remove("im_game_card_container_tmp");
        },550);
    }

    static ensureStyles() {
        if (GameCard.styleInjected) {
            return;
        }

        const styleEl = document.createElement("style");
        styleEl.textContent = `
                .im_game_card{
                    width: 80%;
                    aspect-ratio: 0.67;
                    margin: 20px auto;
                    background-color: #EFEFEF;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
                    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
                }

                .im_game_card_image{
                    width: calc(100% - 5px);
                    height: calc(100% - 5px);
                    border-radius: 19px;
                    overflow: hidden;
                    margin: 2.5px;
                }

                .im_game_card_image > img{
                    width: 100%;
                    height: 100%;
                }

                .im_game_card_title{
                    position: relative;
                    top: -90px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .im_game_card_title > p{
                    font-family: 'Permanent Marker',sans-serif;
                    font-size: 50px;
                }

                .im_game_card_container_tmp{
                    position: absolute;
                    top: calc( 7vh);
                    width: 100vw;
                    transition: all 0.5s ease-in;
                }`;

        document.head.appendChild(styleEl);
        GameCard.styleInjected = true;
    }
}

GameCard.styleInjected = false;
