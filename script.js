document.addEventListener('DOMContentLoaded', () => {
    let heartClicks = 0;
    let userName = '';
    let isMusicPlaying = true;

    const hearts = document.querySelectorAll('.heart');
    const game = document.getElementById('game');
    const response = document.getElementById('response');
    const hiddenMessage = document.getElementById('hidden-message');
    const bgMusic = document.getElementById('bgMusic');
    const nameModal = document.getElementById('nameModal');
    const startGameBtn = document.getElementById('startGame');
    const userNameInput = document.getElementById('userNameInput');
    const musicControl = document.getElementById('musicControl');
    const loveMessageElement = document.querySelector('.love-message');
    const countdownElement = document.getElementById('countdown');
    const yesSound = document.getElementById('yesSound');
    const mainQuestion = document.getElementById('mainQuestion');

    const loveMessages = [
        "💗 Love is composed of a single soul inhabiting two bodies. - Aristotle",
        "💗 The best thing to hold onto in life is each other. - Audrey Hepburn",
        "💗 Where there is love, there is life. - Mahatma Gandhi",
        "💗 I love you not only for what you are, but for what I am when I am with you. - Roy Croft",
        "💗 Love recognizes no barriers. - Maya Angelou",
        "💗 To love and be loved is to feel the sun from both sides. - David Viscott"
    ];

    // Remove autoplay attempt on DOMContentLoaded
    // bgMusic.volume = 0.1;
    // bgMusic.play().catch(err => {
    //     console.log("Autoplay blocked: ", err);
    //     musicControl.textContent = '🔈';
    // });

    startGameBtn.addEventListener('click', () => {
        userName = userNameInput.value.trim() || 'Friend';
        nameModal.classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
        mainQuestion.textContent = `Welcome, ${userName}!`;
        game.classList.remove('hidden'); // Unhide the game
        bgMusic.volume = 0.1;
        bgMusic.play().catch(err => console.log("Music play error: ", err));
        showRandomMessage();
    });

    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicControl.textContent = '🔈';
        } else {
            bgMusic.play().catch(err => console.log("Music play error: ", err));
            musicControl.textContent = '🔊';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            heartClicks++;
            heart.style.pointerEvents = 'none';
            heart.classList.add('clicked');
            heart.style.opacity = '0';
            heart.style.transform = 'scale(0)';

            if (heartClicks === 3) {
                setTimeout(() => {
                    game.classList.add('hidden');
                    showQuestionModal();
                }, 500);
            }
        });
    });

    function showQuestionModal() {
        const questionModal = document.createElement('div');
        questionModal.classList.add('modal');
        questionModal.innerHTML = `
            <div class="modal-content">
                <h2>${userName}, will you be my Valentine? 💖</h2>
                <div class="modal-buttons">
                    <button id="yes">Yes 💖</button>
                    <button id="no">No 😈</button>
                </div>
            </div>
        `;
        document.body.appendChild(questionModal);

        const yesButton = questionModal.querySelector('#yes');
        const noButton = questionModal.querySelector('#no');

        yesButton.addEventListener('click', () => {
            questionModal.classList.add('hidden');
            response.classList.remove('hidden');
            hiddenMessage.classList.remove('hidden');
            response.textContent = `Yay, ${userName}! I knew you'd say YES! 🎉`;
            hiddenMessage.textContent = `You're the best thing that ever happened to me, ${userName}! 💝`;
            yesSound.play();
            startConfetti();
        });

        noButton.addEventListener('mouseover', evadeMouse);
        noButton.addEventListener('click', handleNoButtonClick);
    }

    function handleNoButtonClick() {
        alert("You can't say no to this! 💘");
    }

    function evadeMouse(event) {
        const button = event.target;
        const x = Math.random() * (window.innerWidth - button.offsetWidth);
        const y = Math.random() * (window.innerHeight - button.offsetHeight);
        button.style.position = 'absolute';
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    }

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

    // Confetti animation
    function startConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
