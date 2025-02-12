document.addEventListener('DOMContentLoaded', () => {
    let heartClicks = 0;
    let noClickAttempts = 0;
    let evadeDistance = 150; 
    let userName = '';
    const hearts = document.querySelectorAll('.heart');
    const game = document.getElementById('game');
    const question = document.getElementById('question');
    const response = document.getElementById('response');
    const hiddenMessage = document.getElementById('hidden-message');
    const noButton = document.getElementById('no');
    const yesButton = document.getElementById('yes');
    const yesSound = document.getElementById('yesSound');
    const bgMusic = document.getElementById('bgMusic');
    const nameModal = document.getElementById('nameModal');
    const startGameBtn = document.getElementById('startGame');
    const userNameInput = document.getElementById('userNameInput');
    const mainQuestion = document.getElementById('mainQuestion');
    const surprise = document.getElementById('surprise');
    const hiddenHeart = document.getElementById('hidden-heart');
    const musicControl = document.getElementById('musicControl');
    const loveMessageElement = document.querySelector('.love-message');
    const countdownElement = document.getElementById('countdown');
    let isMusicPlaying = true;

    const loveMessages = [
        "Love is composed of a single soul inhabiting two bodies. - Aristotle",
        "The best thing to hold onto in life is each other. - Audrey Hepburn",
        "Where there is love there is life. - Mahatma Gandhi",
        "I love you not only for what you are, but for what I am when I am with you. - Roy Croft",
        "Love recognizes no barriers. - Maya Angelou",
        "To love and be loved is to feel the sun from both sides. - David Viscott"
    ];

    bgMusic.volume = 0.1;
    bgMusic.play();

    startGameBtn.addEventListener('click', () => {
        userName = userNameInput.value.trim() || 'Friend';
        nameModal.classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
        mainQuestion.textContent = `${userName}, will you be my Valentine?💖`;
        game.classList.remove('hidden');
        showRandomMessage();
    });

    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicControl.textContent = 'Play Music 🎵';
        } else {
            bgMusic.play();
            musicControl.textContent = 'Pause Music 🔇';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            heartClicks++;
            heart.classList.add('clicked');
            heart.style.pointerEvents = 'none';
            if (heartClicks === 3) {
                setTimeout(() => {
                    game.classList.add('hidden');
                    question.classList.remove('hidden');
                    startNoButtonChaos();
                }, 500);
            }
        });
    });

    function startNoButtonChaos() {
        moveNoButton();
        document.addEventListener('mousemove', evadeMouse);
        noButton.addEventListener('click', handleNoButtonClick);
    }

    function moveNoButton() {
        const x = Math.random() * (window.innerWidth - noButton.offsetWidth);
        const y = Math.random() * (window.innerHeight - noButton.offsetHeight);
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }

    function evadeMouse(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const buttonRect = noButton.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;

        const distance = Math.hypot(buttonX - mouseX, buttonY - mouseY);

        if (distance < evadeDistance) {
            const angle = Math.atan2(buttonY - mouseY, buttonX - mouseX);
            const moveToX = buttonX + Math.cos(angle) * evadeDistance * 1.5;
            const moveToY = buttonY + Math.sin(angle) * evadeDistance * 1.5;

            noButton.style.left = `${clamp(moveToX - noButton.offsetWidth / 2, 0, window.innerWidth - noButton.offsetWidth)}px`;
            noButton.style.top = `${clamp(moveToY - noButton.offsetHeight / 2, 0, window.innerHeight - noButton.offsetHeight)}px`;
        }
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function handleNoButtonClick() {
        noClickAttempts++;
        noButton.classList.add('shake');
        setTimeout(() => {
            noButton.classList.remove('shake');
        }, 500);

        if (noClickAttempts >= 5) {
            alert("You can't say no to this! 💘");
            noButton.style.display = 'none';
            yesButton.click();
        } else {
            evadeDistance = Math.max(evadeDistance - 20, 50);
        }
    }

    yesButton.addEventListener('click', () => {
        question.classList.add('hidden');
        response.classList.remove('hidden');
        hiddenMessage.classList.remove('hidden');
        response.textContent = `Yay, ${userName}! I knew you'd say YES! 🎉`;
        hiddenMessage.textContent = `You're the best thing that ever happened to me, ${userName}! 💝`;
        yesSound.play();
        startConfetti();
        showSurprise();
    });

    function startConfetti() {
        const end = Date.now() + (5 * 1000);
        const colors = ['#ff6b81', '#f368e0', '#ff9ff3'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    function showSurprise() {
        surprise.classList.remove('hidden');
        setTimeout(() => {
            surprise.classList.add('hidden');
        }, 5000); 
    }

    
    hiddenHeart.addEventListener('click', () => {
        alert(`Surprise, ${userName}! You found the hidden heart! 💘`);
        startConfetti();
        hiddenHeart.style.display = 'none';
    });

    setTimeout(() => {
        hiddenHeart.style.display = 'block';
    }, 10000);

    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 5 + 5 + 's';
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 10000);
        }, 500);
    }
    createFloatingHearts();

    function createPetals() {
        const totalPetals = 15;
        for (let i = 0; i < totalPetals; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDelay = Math.random() * 5 + 's';
                petal.style.animationDuration = Math.random() * 5 + 5 + 's';
                document.getElementById('petals-container').appendChild(petal);
                setTimeout(() => {
                    petal.remove();
                }, 10000);
            }, i * 500);
        }
    }

    createPetals();
    setInterval(createPetals, 15000); 

    function showRandomMessage() {
        const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        loveMessageElement.textContent = message;
    }

    function updateCountdown() {
        const today = new Date();
        let valentineDate = new Date(today.getFullYear(), 1, 14); 
        if (today > valentineDate) {
            valentineDate = new Date(today.getFullYear() + 1, 1, 14);
        }
        const diffTime = valentineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        countdownElement.textContent = `${diffDays} day(s) until Valentine's Day! 💖`;
    }

    updateCountdown();
    setInterval(updateCountdown, 86400000); 

    game.classList.add('hidden');
    question.classList.add('hidden');
});
