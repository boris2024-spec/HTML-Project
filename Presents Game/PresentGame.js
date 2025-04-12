class Basket {
    constructor(element) {
        this.element = element;
        this.left = 250;
    }

    moveLeft() {
        if (this.left > 10) {
            this.left -= 20;
            this.updateScreen();
        }
    }

    moveRight() {
        if (this.left < document.getElementById("gameArea").offsetWidth - this.element.offsetWidth - 27) {
            this.left += 20;
            this.updateScreen();
        }
    }

    updateScreen() {
        this.element.style.left = this.left + "px";
    }
}

class Present {
    constructor(gameArea, basket) {
        this.y = 0;
        this.x = Math.floor(Math.random() * (gameArea.offsetWidth - 40));
        this.gameArea = gameArea;
        this.basket = basket;

        // создаем подарок
        this.element = document.createElement("div");
        this.element.className = "present";
        this.element.style.left = this.x + "px";
        this.gameArea.appendChild(this.element);
    }

    fall() {
        this.y += 2;
        this.element.style.top = this.y + "px";

        if (this.y > this.gameArea.offsetHeight) {
            this.element.remove();
            return false;
        }

        if (
            this.x + this.element.offsetWidth >= this.basket.left &&
            this.x <= this.basket.left + this.basket.element.offsetWidth &&
            this.y + this.element.offsetHeight >= this.gameArea.offsetHeight - this.basket.element.offsetHeight
        ) {
            console.log("You caught a present!");
            this.element.remove();
            updateScore();
            return false;
        }

        return true;
    }
}

let myBasket = document.getElementById("basket");
let b = new Basket(myBasket);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        b.moveLeft();
    }
    if (event.key === "ArrowRight") {
        b.moveRight();
    }
});

document.addEventListener("touchstart", (event) => {
    const touchX = event.touches[0].clientX;
    const gameAreaWidth = document.getElementById("gameArea").offsetWidth;

    if (touchX < gameAreaWidth / 2) {
        b.moveLeft();
    } else {
        b.moveRight();
    }
});

let gameArea = document.getElementById("gameArea");

let presents = [];
let score = 0;

function updateScore() {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
}

setInterval(() => {
    let p = new Present(gameArea, b);
    presents.push(p);
}, 2000);

setInterval(() => {
    presents = presents.filter((p) => p.fall());
}, 40);