// Espera o HTML ser todo carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    // =======================================================
    // =============== 1. ELEMENTOS DO DOM =============
    // =======================================================
    const screens = document.querySelectorAll('.screen');
    const welcomeStartBtn = document.getElementById('welcome-start-btn');
    const setupContinueBtn = document.getElementById('setup-continue-btn');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    // scenarioCards agora é preenchido dinamicamente
    const prevScenarioBtn = document.getElementById('prev-scenario-btn');
    const nextScenarioBtn = document.getElementById('next-scenario-btn');
    const scenarioContainer = document.getElementById('scenario-cards-container');
    const gameScreen = document.getElementById('game-screen');
    const dialogueLayer = document.getElementById('dialogue-layer'); // Camada pai continua
    const questionLayer = document.getElementById('question-layer');
    const gameLives = document.getElementById('game-lives');
    const gameInventoryBtn = document.getElementById('game-inventory-btn');
    const gameWallet = document.getElementById('game-wallet');
    const gameStatsBar = document.getElementById('game-stats-bar'); // Barra de status

    // <<< Elementos do Novo Diálogo >>>
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueAdvanceBtn = document.getElementById('dialogue-advance-btn');
    const dialogueSpriteLeft = document.getElementById('dialogue-sprite-left');
    const dialogueSpriteRight = document.getElementById('dialogue-sprite-right');
    // <<< FIM NOVOS Elementos de Diálogo >>>

    // Elementos da Camada de Pergunta (Layout antigo ainda)
    const questionText = document.getElementById('question-text');
    const symbolOptionsGrid = document.getElementById('symbol-options-grid');
    const symbolBtns = document.querySelectorAll('.symbol-btn');
    const emotionBarFill = document.getElementById('emotion-bar-fill');
    const questionSprite = document.getElementById('question-sprite');
    const emotionBarContainer = document.getElementById('emotion-bar-container');

    // Elementos Loja, Anúncio, Transição, Apresentador, Rádio
    const closeShopBtn = document.getElementById('close-shop-btn');
    const buyBtns = document.querySelectorAll('.buy-btn');
    const adScreen = document.getElementById('ad-screen');
    const watchAdBtn = document.getElementById('watch-ad-btn');
    const transitionOverlay = document.getElementById('transition-overlay');
    const presenterBubble = document.getElementById('presenter-bubble');
    const radioSpeechBubbles = document.querySelectorAll('.radio-speech-bubble');


    // =======================================================
    // =============== 2. ESTADO DO JOGO E DADOS =============
    // =======================================================
    const clickSound = new Audio(); const correctSound = new Audio(); const errorSound = new Audio(); let backgroundMusic = new Audio();

    let gameState = {
        name: '', gender: '', difficulty: 'impossivel', lives: 5, happiness: 100, money: 50,
        currentScenario: null, currentEventIndex: 0, timer: null, timeLimit: 15,
        inventory: { manual: false, gps: false }
    };

    // Verifica se gameData foi carregado
    if (typeof gameData === 'undefined') {
        console.error("ERRO CRÍTICO: gameData (de Conversa.js) não foi encontrado!");
        document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">Erro Crítico: Falha ao carregar dados do jogo (Conversa.js).</h1>';
        return;
    }

    const scenarioKeys = Object.keys(gameData);
    let currentScenarioViewIndex = 0;
    const cardsToShow = 2;
    let radioNotificationTimer = null;

    // =======================================================
    // =============== 3. FUNÇÕES (AS "RECEITAS") ============
    // =======================================================

    function showScreen(screenId) {
        console.log("Tentando mostrar tela:", screenId);
        let foundScreen = false;
        screens.forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add('active');
                foundScreen = true;
            } else {
                screen.classList.remove('active');
            }
        });
        if (!foundScreen) { console.error("Tela não encontrada:", screenId); return; }
        if (screenId === 'scenario-screen') {
            renderScenarioCards();
        }
    }

    function speakText(text) {
         if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; window.speechSynthesis.speak(utterance); }
         else { console.warn("Síntese de Voz não suportada."); }
    }

    function showRadioNotification(message) {
         const activeScreen = document.querySelector('.screen.active'); if (!activeScreen) return; const activeBubble = activeScreen.querySelector('.radio-speech-bubble'); if (!activeBubble) { console.warn("Balão de rádio não encontrado:", activeScreen.id); console.log("RADIO:", message); return; } const textElement = activeBubble.querySelector('p'); if (!textElement) return; if (radioNotificationTimer) { clearTimeout(radioNotificationTimer); } textElement.textContent = message; activeBubble.classList.add('visible'); speakText(message); radioNotificationTimer = setTimeout(() => { activeBubble.classList.remove('visible'); radioNotificationTimer = null; }, 4000);
    }

    // Função createScenarioCardElement (com imagem de fundo)
    function createScenarioCardElement(scenarioKey) {
        const card = document.createElement('div'); card.classList.add('scenario-card'); card.dataset.scenario = scenarioKey; const displayName = scenarioKey.replace('_', ' ').toUpperCase(); const imageDiv = document.createElement('div'); imageDiv.classList.add('scenario-image'); const bgImage = gameData[scenarioKey]?.backgroundImage?.match(/url\(['"]?(.*?)['"]?\)/); if (bgImage && bgImage[1]) { imageDiv.style.backgroundImage = `url(${bgImage[1]})`; imageDiv.style.backgroundSize = 'cover'; imageDiv.style.backgroundPosition = 'center'; } else { imageDiv.style.backgroundColor = '#552B1B'; } const title = document.createElement('h3'); title.textContent = displayName; card.appendChild(imageDiv); card.appendChild(title); card.addEventListener('click', () => handleScenarioCardClick(scenarioKey)); return card;
    }

    function handleScenarioCardClick(scenarioName) {
         console.log("Card clicado:", scenarioName); if (!gameData[scenarioName] || !gameData[scenarioName].events) { showRadioNotification('Este cenário ainda está em desenvolvimento.'); return; } if(gameData[scenarioName]) { startGame(scenarioName); } else { console.error("Dados do cenário não encontrados:", scenarioName); showRadioNotification("Erro ao carregar dados."); }
    }

    function renderScenarioCards() {
         scenarioContainer.innerHTML = ''; const numKeys = scenarioKeys.length; if (numKeys === 0) return; for (let i = 0; i < cardsToShow; i++) { const keyIndex = (currentScenarioViewIndex + i) % numKeys; const scenarioKey = scenarioKeys[keyIndex]; const cardElement = createScenarioCardElement(scenarioKey); scenarioContainer.appendChild(cardElement); if (numKeys === 1) break; if (i >= cardsToShow - 1) break;}
    }

    // Função startGame (com transição e apresentador)
    function startGame(scenarioName) {
        console.log("Iniciando cenário:", scenarioName); if (!transitionOverlay || !presenterBubble || !gameScreen) { return; } const presenterText = presenterBubble.querySelector('p'); if (!presenterText) { return; } const scenarioData = gameData[scenarioName]; if (!scenarioData) { showRadioNotification("Erro: Cenário não pode ser carregado."); return; } const contextLines = scenarioData.contextText; const hasContext = Array.isArray(contextLines) && contextLines.length > 0; const delayBetweenLines = 4000; const finalDelayBeforeGame = 3000; let totalIntroDuration = 0; transitionOverlay.classList.add('active'); console.log("Fade para preto."); setTimeout(() => { gameState.currentScenario = scenarioName; gameState.currentEventIndex = 0; if (scenarioData.backgroundImage) gameScreen.style.backgroundImage = scenarioData.backgroundImage; else gameScreen.style.backgroundImage = ''; if (dialogueLayer) dialogueLayer.style.display = 'none'; if (questionLayer) questionLayer.style.display = 'none'; if (gameStatsBar) gameStatsBar.style.display = 'none'; showScreen('game-screen'); }, 800); setTimeout(() => { transitionOverlay.classList.remove('active'); if (hasContext) { presenterText.textContent = contextLines[0]; presenterBubble.classList.add('visible'); contextLines.forEach((line, index) => { if (index > 0) { setTimeout(() => { presenterText.textContent = line; }, index * delayBetweenLines); } }); totalIntroDuration = (contextLines.length - 1) * delayBetweenLines + finalDelayBeforeGame; } else { presenterText.textContent = "Iniciando..."; presenterBubble.classList.add('visible'); totalIntroDuration = finalDelayBeforeGame; } setTimeout(() => { if(presenterBubble) presenterBubble.classList.remove('visible'); if (gameStatsBar) gameStatsBar.style.display = ''; if (dialogueLayer) dialogueLayer.style.display = ''; if (questionLayer) questionLayer.style.display = ''; switchGameLayer('dialogue-layer'); loadNextEvent(); }, totalIntroDuration); }, 1600);
    }

    function loadNextEvent() {
        console.log("loadNextEvent. Índice:", gameState.currentEventIndex); const scenario = gameData[gameState.currentScenario]; if (!scenario) return; const event = scenario.events[gameState.currentEventIndex]; if (!event) { showRadioNotification("Fim do cenário! Escolha o próximo."); showScreen('scenario-screen'); return; } if (event.type === 'dialogue') { showDialogue(event); } else if (event.type === 'question') { showQuestion(event); } else { console.warn("Tipo de evento desconhecido:", event.type); gameState.currentEventIndex++; loadNextEvent(); }
    }


    // === showDialogue ATUALIZADA para Novo Layout ===
    function showDialogue(eventData) {
        switchGameLayer('dialogue-layer');
        if (!dialogueText || !dialogueSpriteLeft || !dialogueSpriteRight) { console.error("showDialogue: Elementos não encontrados!"); return; }
        if (!eventData || typeof eventData.speaker === 'undefined') { console.error("showDialogue: eventData inválido!", eventData); dialogueText.textContent = "Erro!"; dialogueSpriteLeft.classList.remove('visible'); dialogueSpriteRight.classList.remove('visible'); return; }
        dialogueText.textContent = eventData.text || "";
        if (eventData.speaker === 'player') {
            dialogueSpriteLeft.classList.add('visible');
            dialogueSpriteRight.classList.remove('visible');
        } else if (eventData.speaker === 'npc') {
            dialogueSpriteLeft.classList.remove('visible');
            dialogueSpriteRight.classList.add('visible');
        } else { // Narrador ou indefinido
            dialogueSpriteLeft.classList.remove('visible');
            dialogueSpriteRight.classList.remove('visible');
        }
    }
    // === FIM showDialogue ===


    
// Função showQuestion (para layout antigo)
function showQuestion(eventData) {
    if (!questionLayer || !dialogueLayer || !questionText || !symbolBtns) {
        console.error("Elementos de pergunta não encontrados!");
        return;
    }
    switchGameLayer('question-layer');
    questionText.textContent = eventData.text || "Erro: Texto não encontrado.";
    const options = eventData.options;
    if (!Array.isArray(options)) {
        console.error("showQuestion: options não é array:", eventData);
        symbolBtns.forEach(button => button.style.display = 'none');
        return;
    }
    
    // Limpar eventos anteriores
    symbolBtns.forEach(button => {
        if (button._clickHandler) {
            button.removeEventListener('click', button._clickHandler);
            button._clickHandler = null;
        }
        button.style.display = 'none';
    });
    
    // Configurar botões com base nas opções
    symbolBtns.forEach((button, index) => {
        if (index < options.length) {
            const optionText = options[index];
            button.textContent = optionText;
            const clickHandler = () => { handleAnswer(index); };
            button.addEventListener('click', clickHandler);
            button._clickHandler = clickHandler;
            button.style.display = 'flex';
        }
    });
}



    // Função switchGameLayer (com debug e verificações)
    function switchGameLayer(layerId) {
        if (!dialogueLayer || !questionLayer) { console.error("switchGameLayer: Camadas não encontradas!"); return; }
        console.log("switchGameLayer para ativar:", layerId);
        // Garante que display inline seja removido ANTES de mexer nas classes
        dialogueLayer.style.display = '';
        questionLayer.style.display = '';

        if (layerId === 'dialogue-layer') {
            dialogueLayer.classList.add('active');
            questionLayer.classList.remove('active');
        } else if (layerId === 'question-layer') {
            dialogueLayer.classList.remove('active');
            questionLayer.classList.add('active');
        } else {
             console.warn("switchGameLayer chamada com ID desconhecido:", layerId);
        }
         console.log("Classes FINAIS: dialogueLayer=", dialogueLayer.classList.toString(), "questionLayer=", questionLayer.classList.toString());
    }


    // Função handleAnswer (com fallbacks)
    function handleAnswer(choiceIndex) {
        console.log("handleAnswer:", choiceIndex); const scenario = gameData[gameState.currentScenario]; if (!scenario) return; const event = scenario.events[gameState.currentEventIndex]; if (!event || event.type !== 'question') return; let feedbackText = ""; let emotionChange = 0; if (choiceIndex === event.correctAnswer) { feedbackText = event.feedback?.correct || "Correto!"; emotionChange = event.emotionEffect?.correct || 0; } else { feedbackText = event.feedback?.wrong || "Errado."; emotionChange = event.emotionEffect?.wrong || 0; } gameState.happiness = Math.max(0, Math.min(100, gameState.happiness + emotionChange)); updateUI(); const nextEventIndex = gameState.currentEventIndex + 1; if (scenario.events[nextEventIndex] && scenario.events[nextEventIndex].type === 'dialogue') { scenario.events[nextEventIndex].text = feedbackText; scenario.events[nextEventIndex].speaker = "npc"; } else { console.warn("Slot de feedback não encontrado."); } gameState.currentEventIndex++; setTimeout(loadNextEvent, 500);
    }

    // Função updateUI (com verificações)
    function updateUI() {
         if (emotionBarFill) { const happinessPercentage = gameState.happiness + "%"; emotionBarFill.style.height = happinessPercentage; if (gameState.happiness > 70) emotionBarFill.style.backgroundColor = '#2ed573'; else if (gameState.happiness > 40) emotionBarFill.style.backgroundColor = '#f7e302'; else if (gameState.happiness > 15) emotionBarFill.style.backgroundColor = '#ffa502'; else emotionBarFill.style.backgroundColor = '#ff4757'; }
         if (gameLives) { gameLives.innerHTML = ''; for (let i = 0; i < gameState.lives; i++) { const heart = document.createElement('span'); heart.classList.add('heart-icon', 'full'); heart.textContent = '❤️'; gameLives.appendChild(heart); } for (let i = gameState.lives; i < 5; i++) { const heart = document.createElement('span'); heart.classList.add('heart-icon', 'empty'); heart.textContent = '🖤'; gameLives.appendChild(heart); } }
         if (gameWallet) { const moneySpan = gameWallet.querySelector('span:first-of-type'); if (moneySpan) { moneySpan.textContent = gameState.money.toFixed(2); } }
    }

    function gameOver() { console.log("Fim de Jogo!"); setTimeout(() => { showScreen('ad-screen'); }, 1000); }
    function handleDifficulty(difficulty) { if (difficulty === 'facil') { showRadioNotification('Acredita em papai Noel? Então não acredite que existe modo fácil, escolha outro!'); return; } if (difficulty === 'dificil') { showRadioNotification('Você está tentando evitar, mas o único modo possível é o impossível'); return; } if (difficulty === 'impossivel') { gameState.difficulty = difficulty; showRadioNotification('Você acertou! O único caminho é o impossível. Boa sorte'); setTimeout(() => { showScreen('scenario-screen'); }, 7500); } }

    // =======================================================
    // ======== 4. "OUVINTES" DE EVENTOS (AS "AÇÕES") ========
    // =======================================================
    if (welcomeStartBtn) welcomeStartBtn.addEventListener('click', () => { showScreen('setup-screen'); });
    else console.error("welcomeStartBtn não encontrado!");

    if (setupContinueBtn) {
         setupContinueBtn.addEventListener('click', () => { const playerNameInput = document.getElementById('player-name'); const playerGenderSelect = document.getElementById('player-gender'); if(!playerNameInput || !playerGenderSelect) { return; } const playerName = playerNameInput.value; if (playerName.trim() === '') { showRadioNotification('Por favor, digite seu nome!'); return; } gameState.name = playerName; gameState.gender = playerGenderSelect.value; showScreen('difficulty-screen'); });
    } else { console.error("setupContinueBtn não encontrado!"); }

    if (difficultyBtns.length > 0) {
          difficultyBtns.forEach(btn => { btn.addEventListener('click', (e) => { const difficulty = e.currentTarget.dataset.difficulty; if (difficulty) { handleDifficulty(difficulty); } }); });
    } else { console.warn("Nenhum difficulty-btn encontrado!"); }

    if (nextScenarioBtn) nextScenarioBtn.addEventListener('click', () => { currentScenarioViewIndex = (currentScenarioViewIndex + 1) % scenarioKeys.length; renderScenarioCards(); });
    else console.error("nextScenarioBtn não encontrado!");
    if (prevScenarioBtn) prevScenarioBtn.addEventListener('click', () => { currentScenarioViewIndex = (currentScenarioViewIndex - 1 + scenarioKeys.length) % scenarioKeys.length; renderScenarioCards(); });
    else console.error("prevScenarioBtn não encontrado!");

    // === Listener de Diálogo ATUALIZADO ===
    if (dialogueAdvanceBtn) {
        dialogueAdvanceBtn.addEventListener('click', () => {
            if (gameState.currentScenario && dialogueLayer?.classList.contains('active')) {
                console.log("Botão Avançar diálogo clicado.");
                gameState.currentEventIndex++;
                loadNextEvent();
            } else {
                console.log("Clique no botão Avançar diálogo ignorado.");
            }
        });
    } else {
        console.error("Botão #dialogue-advance-btn não encontrado!");
    }
    // === FIM Listener de Diálogo ===

    if (closeShopBtn) closeShopBtn.addEventListener('click', () => showScreen('game-screen'));
    else console.error("closeShopBtn não encontrado!");
    if (buyBtns.length > 0) { buyBtns.forEach(btn => { btn.addEventListener('click', (e) => { console.log("Comprar:", e.currentTarget.dataset.item); }); }); }
    else { console.warn("Nenhum buy-btn encontrado!"); }
    if (watchAdBtn) watchAdBtn.addEventListener('click', () => { console.log("Assistir anúncio"); });
    else console.error("watchAdBtn não encontrado!");

    // =======================================================
    // ================= 5. INICIALIZAÇÃO ====================
    // =======================================================
    console.log("Inicializando o jogo...");
     if (typeof gameData !== 'undefined') {
         console.log("gameData carregado. Cenários:", Object.keys(gameData));
         updateUI(); // Chama na inicialização
         showScreen('welcome-screen');
     } else {
         // Erro crítico já tratado
     }

}); // Fim do 'DOMContentLoaded'
