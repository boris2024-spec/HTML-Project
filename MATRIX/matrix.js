const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'アィウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789qazwsxedcrfnujmikאבגדהוזחףןםײ׳״םץ״םعץײיַ ـب عـﻼسص	جﺎ';

const charsArray = characters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
}

let textColor = '#0F0';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        ctx.fillText(text, i * fontSize, drops[i]);

        drops[i] += fontSize;
        if (drops[i] > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

document.addEventListener('click', () => {
    textColor = getRandomColor();
});

setInterval(draw, 50);


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

