// Global variables for YouTube players
let playerBelo;
let playerEuphoria;
let activePlayer = null;
let currentTrackTitle = "Tua Boca - Belo";
let isMusicInitialized = false;
let currentMusicSection = 'belo';

// 1. YouTube Iframe API setup
function onYouTubeIframeAPIReady() {
    // Player 1: Belo - Tua Boca
    // Video ID: 7-qK9jOa_hI (Belo - Tua Boca)
    playerBelo = new YT.Player('youtube-player-belo', {
        height: '100',
        width: '100',
        videoId: '7-qK9jOa_hI',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });

    // Player 2: Labrinth & Zendaya - All For Us (Euphoria)
    // Video ID: Z5jWsM07fuI (All For Us - Labrinth & Zendaya)
    playerEuphoria = new YT.Player('youtube-player-euphoria', {
        height: '100',
        width: '100',
        videoId: 'Z5jWsM07fuI',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Players are ready, can set volume
    event.target.setVolume(50);
}

// Function to switch music smoothly
function playMusic(playerType) {
    if (!playerBelo || !playerEuphoria) return;
    
    try {
        if (playerType === 'belo') {
            if (activePlayer === playerBelo) return;
            
            if (playerEuphoria.getPlayerState && playerEuphoria.getPlayerState() === YT.PlayerState.PLAYING) {
                playerEuphoria.pauseVideo();
            }
            
            playerBelo.playVideo();
            activePlayer = playerBelo;
            currentTrackTitle = "Tua Boca - Belo";
            updateMusicUI(true);
        } else if (playerType === 'euphoria') {
            if (activePlayer === playerEuphoria) return;
            
            if (playerBelo.getPlayerState && playerBelo.getPlayerState() === YT.PlayerState.PLAYING) {
                playerBelo.pauseVideo();
            }
            
            playerEuphoria.playVideo();
            activePlayer = playerEuphoria;
            currentTrackTitle = "All For Us - Labrinth & Zendaya";
            updateMusicUI(true);
        }
    } catch (e) {
        console.log("Aguardando interação do usuário para iniciar áudio.");
    }
}

function updateMusicUI(isPlaying) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const trackTitleSpan = document.querySelector('.track-title');
    const trackStatusSpan = document.querySelector('.track-status');
    
    trackTitleSpan.textContent = currentTrackTitle;
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        trackStatusSpan.textContent = "tocando de fundo...";
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        trackStatusSpan.textContent = "pausado";
    }
}

// Initialize controls after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    
    // Lock Screen Logic
    const unlockBtn = document.getElementById('unlock-btn');
    const unlockInput = document.getElementById('unlock-answer');
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const errorMessage = document.getElementById('error-message');
    const audioControl = document.getElementById('audio-control');
    
    function checkAnswer() {
        const ans = unlockInput.value.trim().toLowerCase();
        // Accepts: anabeatriz, ana beatriz, ana, aninha
        if (ans.includes('ana') || ans.includes('beatriz')) {
            // Unlock
            lockScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            audioControl.classList.remove('hidden');
            
            // Start playing background music
            setTimeout(() => {
                try {
                    // Pre-activate both players so mobile doesn't block transitions on scroll
                    playerEuphoria.playVideo();
                    playerEuphoria.pauseVideo();
                } catch(e) {
                    console.log("Erro ao inicializar player secundário:", e);
                }
                
                playMusic('belo');
                isMusicInitialized = true;
            }, 500);
            
            // Trigger initial confetti explosion
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
        } else {
            errorMessage.classList.remove('hidden');
            unlockInput.value = '';
        }
    }
    
    unlockBtn.addEventListener('click', checkAnswer);
    unlockInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    
    // Play/Pause Floating button logic
    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.addEventListener('click', () => {
        if (!activePlayer) return;
        
        const state = activePlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            activePlayer.pauseVideo();
            updateMusicUI(false);
        } else {
            activePlayer.playVideo();
            updateMusicUI(true);
        }
    });

    // 2. CANVAS PARTICLES (GLITTER & HEARTS)
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.8 + 0.2; // Slowly move down
            this.color = Math.random() > 0.5 ? '#ff4a7d' : '#9d4edd';
            this.opacity = Math.random() * 0.5 + 0.2;
            this.shape = Math.random() > 0.8 ? 'heart' : 'star';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            if (this.x > canvas.width || this.x < 0) {
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            
            if (this.shape === 'heart') {
                // Draw small heart
                ctx.beginPath();
                const d = this.size * 2;
                ctx.moveTo(this.x, this.y + d / 4);
                ctx.quadraticCurveTo(this.x, this.y, this.x + d / 2, this.y);
                ctx.quadraticCurveTo(this.x + d, this.y, this.x + d, this.y + d / 3);
                ctx.quadraticCurveTo(this.x + d, this.y + (d * 2) / 3, this.x + d / 2, this.y + d);
                ctx.quadraticCurveTo(this.x, this.y + (d * 2) / 3, this.x, this.y + d / 3);
                ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
                ctx.closePath();
                ctx.fill();
            } else {
                // Draw small star
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        const quantity = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < quantity; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    // 3. SCROLL-TRIGGERED TRACK SWITCH & REVEAL EFFECTS
    const euphoriaSection = document.getElementById('euphoria-section');
    const scrollRevealItems = document.querySelectorAll('.reveal-on-scroll');
    
    window.addEventListener('scroll', () => {
        if (!isMusicInitialized) return;
        
        // Music Switch based on scroll
        const rect = euphoriaSection.getBoundingClientRect();
        // If Euphoria section is visible in the viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            if (currentMusicSection !== 'euphoria') {
                currentMusicSection = 'euphoria';
                playMusic('euphoria');
            }
        } else {
            if (currentMusicSection !== 'belo') {
                currentMusicSection = 'belo';
                playMusic('belo');
            }
        }
        
        // Element scroll reveal animations
        scrollRevealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight * 0.85) {
                item.classList.add('visible');
            }
        });
    });

    // 4. EUPHORIA CAROUSEL LOGIC
    const slides = document.querySelectorAll('.euphoria-slide');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // 5. VOUCHERS CLICK INTERACTION (CARD FLIP & CONFETTI)
    const vouchers = document.querySelectorAll('.voucher-card');
    
    vouchers.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped')) {
                card.classList.add('flipped');
                
                // Explode confetti from the clicked card's general position
                const rect = card.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { x: x, y: y }
                });
            }
        });
    });

    // 6. TYPEWRITER LETTER EFFECT
    const letterBtn = document.getElementById('start-letter-btn');
    const letterBox = document.getElementById('typewriter-text');
    
    const rawLetterText = `Minha linda Anabeatriz,

Como você está viajando hoje, fiz questão de preparar este cantinho virtual para você abrir e ler no caminho. Queria muito ter dinheiro para te dar o maior presente do mundo, mas espero que este gesto lembre você do quanto você é preciosa para mim.

Estamos voltando, reconstruindo nossa história de forma mais madura, mais bonita e cheia de cumplicidade. A verdade é que, desde aquele 31 de dezembro, quando você jurou de pé junto que não tinha gostado do beijo (e hoje a gente ri disso!), minha vida ganhou outro brilho.

Eu amo a nossa cumplicidade, as noites de pagode, nossas conversas e o fato de podermos maratonar séries inteiras juntos e nos reconhecermos nelas.

Aproveite muito a sua viagem. Estarei aqui pensando em você a cada segundo e esperando o seu retorno para a gente começar a resgatar todos os nossos vales especiais. 

Te amo daqui até a lua, com todos os seus detalhes e brilhos.

Com todo o meu amor,
Tutu ❤️`;

    let charIndex = 0;
    
    function typeLetter() {
        if (charIndex < rawLetterText.length) {
            letterBox.textContent += rawLetterText.charAt(charIndex);
            charIndex++;
            setTimeout(typeLetter, 35); // Adjust typing speed here
            
            // Auto scroll inside the box to follow text
            letterBox.scrollTop = letterBox.scrollHeight;
        }
    }
    
    letterBtn.addEventListener('click', () => {
        letterBtn.classList.add('hidden');
        typeLetter();
    });
});
