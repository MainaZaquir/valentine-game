document.addEventListener('DOMContentLoaded', () => {
    let heartClicks = 0;
    let noClickAttempts = 0;
    let evadeDistance = 150; 
    let userName = '';
    let isMusicPlaying = true;

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
    
    const loveMessages = [
        "Love is composed of a single soul inhabiting two bodies. - Aristotle",
        "The best thing to hold onto in life is each other. - Audrey Hepburn",
        "Where there is love there is life. - Mahatma Gandhi",
        "I love you not only for what you are, but for what I am when I am with you. - Roy Croft",
        "Love recognizes no barriers. - Maya Angelou",
        "To love and be loved is to feel the sun from both sides. - David Viscott"
    ];

    // Handle autoplay restrictions
    try {
        bgMusic.volume = 0.1;
        bgMusic.play().catch(err => console.log("Autoplay blocked: ", err));
    } catch (err) {
        console.log("Music play error: ", err);
    }

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
            bgMusic.play().catch(err => console.log("Autoplay blocked: ", err));
            musicControl.textContent = 'Pause Music 🔇';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            heartClicks++;
            heart.style.pointerEvents = 'none';
            heart.classList.add('clicked');
            heart.style.opacity = '0';

            setTimeout(() => {
                heart.style.display = 'none'; 
            }, 500);

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
        noButton.style.left = `${clamp(x, 0, window.innerWidth - noButton.offsetWidth)}px`;
        noButton.style.top = `${clamp(y, 0, window.innerHeight - noButton.offsetHeight)}px`;
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

            noButton.style.left = `${clamp(moveToX, 0, window.innerWidth - noButton.offsetWidth)}px`;
            noButton.style.top = `${clamp(moveToY, 0, window.innerHeight - noButton.offsetHeight)}px`;
        }
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
    });

    function showRandomMessage() {
        loveMessageElement.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    }

    function updateCountdown() {
        const today = new Date();
        let valentineDate = new Date(today.getFullYear(), 1, 14); 
        if (today > valentineDate) {
            valentineDate = new Date(today.getFullYear() + 1, 1, 14);
        }
        const diffDays = Math.ceil((valentineDate - today) / (1000 * 60 * 60 * 24));
        countdownElement.textContent = `${diffDays} day(s) until Valentine's Day! 💖`;
        requestAnimationFrame(updateCountdown);
    }

    updateCountdown();

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
});
