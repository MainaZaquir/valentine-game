let heartClicks = 0;
let noClicks = 0;
const hearts = document.querySelectorAll('.heart');
const game = document.getElementById('game');
const question = document.getElementById('question');
const response = document.getElementById('response');
const noButton = document.getElementById('no');
const yesButton = document.getElementById('yes');
const secretMessage = document.createElement("h3");
const giftBox = document.createElement("div");
const messageInside = document.createElement("p");

hearts.forEach(heart => {
    heart.addEventListener('click', () => {
        heart.classList.add('clicked'); 
        heartClicks++;
        if (heartClicks === 3) {
            setTimeout(() => {
                game.classList.add('hidden');
                question.classList.remove('hidden');
            }, 500);
        }
    });
});

noButton.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noButton.style.position = 'absolute';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

noButton.addEventListener('click', () => {
    noClicks++;
    if (noClicks >= 5) {
        secretMessage.innerText = "There’s no escaping love! 💘";
        secretMessage.style.color = "#ff4081";
        secretMessage.style.marginTop = "20px";
        document.body.appendChild(secretMessage);
        noButton.style.display = "none";
    }
});

yesButton.addEventListener('click', () => {
    response.classList.remove('hidden');
    question.classList.add('hidden');
    startConfetti();
    showGiftBox();
});

function showGiftBox() {
    giftBox.classList.add("gift-box");
    messageInside.innerText = "You're my favorite person! 💖";
    messageInside.classList.add("gift-message");

    setTimeout(() => {
        giftBox.classList.add("open"); 
        giftBox.appendChild(messageInside);
    }, 2000); 

    document.body.appendChild(giftBox);
}

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        let confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti-piece");
        document.body.appendChild(confettiPiece);

        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.animationDuration = `${Math.random() * 2 + 2}s`; 
        confettiPiece.style.animationDelay = `${Math.random()}s`;
    }
}
