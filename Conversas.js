const gameData = {
    "casa": {
        // ... (Seu cenário "casa" que já estava aqui, intacto)
        backgroundImage: "url('https://uploads.onecompiler.io/43rztn6g5/44249m6ez/Um%20grande%20sacrif%C3%ADcio.jpg')",
        contextText: [
            "Lar, doce lar. O refúgio... e, ocasionalmente, o palco de complexas negociações diplomáticas disfarçadas de 'escolher um filme'.",
            "Vocês estão no sofá, controle remoto em mãos. A missão: encontrar algo que agrade a ambos. Parece simples? Ingênuo...",
            "Lembre-se: 'O 'tanto faz' é o início do fim'. Boa sorte."
        ],
        events: [
            { type: "dialogue", speaker: "npc", text: "Ai, que preguiça hoje... Podíamos ver um filme, né?" },
            { type: "dialogue", speaker: "player", text: "(Ótimo! Noite tranquila. Só escolher algo legal e relaxar...)" },
            { type: "dialogue", speaker: "npc", text: "O que você sugere?" },
            { 
                type: "question", 
                text: "'O que *eu* sugiro?' Hmm, essa pergunta raramente é sobre minha preferência real. É um teste?", 
                options: ["Que tal aquele novo de ação com o The Rock que lançou?", "Ah, não sei... qualquer coisa tá bom.", "Na verdade, estava pensando no que *você* gostaria de ver hoje. Alguma preferência?", "Coloca aí o jogo do Corinthians que tá passando."], 
                correctAnswer: 2, 
                chaosAnswer: 3,
                commonAnswers: [0, 1], // Definindo respostas comuns
                feedback: { 
                    correct: "Own, pensando em mim? Que fofo! Deixa eu ver aqui então...",
                    common: "Ah... tá. Deixa eu procurar aqui então.",
                    chaos: "Corinthians? Sério, Pedro? A gente combinou de ver um FILME."
                },
                emotionEffect: { correct: 10, common: -5, chaos: -20 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 1
            { type: "dialogue", speaker: "npc", text: "É bom quando a gente decide junto, né?", condition: { check: 'happiness', threshold: 70, operator: '>=' }, altText: "Difícil achar algo que os dois gostem..." }, // Comentário 1
            { 
                type: "dialogue", 
                speaker: "npc", 
                text: "Hmm, tem esse romance novo 'Apenas Nós Dois' que parece legal, e aquele suspense 'A Sombra na Janela' que a Carol comentou...",
                condition: { check: 'happiness', threshold: 50, operator: '>=' },
                altText: "...Tanto faz pra mim. Escolhe você." 
            },
            { 
                type: "question",
                text: "'TANTO FAZ'! ALERTA MÁXIMO! Isso NUNCA significa 'tanto faz'!",
                condition: { check: 'happiness', threshold: 50, operator: '<' },
                altText: "Romance ou suspense... Qual ela prefere? Ou qual ela espera que *eu* escolha?",
                options: [
                    { text: "Ok, vou colocar o do The Rock então.", condition: { check: 'happiness', threshold: 50, operator: '<' } }, // Caos (para < 50)
                    { text: "Vamos de suspense então, parece mais emocionante.", condition: { check: 'happiness', threshold: 50, operator: '>=' } }, // Comum (para >= 50)
                    
                    { text: "Amor, 'tanto faz' não ajuda. Qual gênero você *realmente* prefere hoje?", condition: { check: 'happiness', threshold: 50, operator: '<' } }, // Comum (para < 50)
                    { text: "Romance é mais a sua cara, né? Coloca 'Apenas Nós Dois'.", condition: { check: 'happiness', threshold: 50, operator: '>=' } }, // Comum (para >= 50)

                    { text: "Entendi. Que tal a gente ver **aquela comédia romântica com a Sandra Bullock** que você queria ver semana passada?", condition: { check: 'happiness', threshold: 50, operator: '<' } }, // Certa (para < 50)
                    { text: "Que tal 'A Sombra na Janela' hoje? Parece que tem a **Florence Pugh** que você adora. Romance a gente vê outro dia.", condition: { check: 'happiness', threshold: 50, operator: '>=' } }, // Certa (para >= 50)
                    
                    { text: "Então vou colocar o jogo do Corinthians mesmo.", condition: { check: 'happiness', threshold: 50, operator: '<' } }, // Caos Hard (para < 50)
                    { text: "Nenhum dos dois. Vamos ver o do The Rock mesmo.", condition: { check: 'happiness', threshold: 50, operator: '>=' } } // Caos (para >= 50)
                ],
                correctAnswer: 2, 
                chaosAnswer: 0, // (ou 3, dependendo da lógica)
                commonAnswers: [1],
                feedback: { 
                    correct: "Nossa, boa ideia! / Verdade, tinha esquecido desse! Coloca aí!",
                    common: "É... pode ser.",
                    chaos: "Sério?! Depois de tudo isso?! / Corinthians DE NOVO?! Quer saber? Perdi a vontade!"
                },
                emotionEffect: { correct: 20, common: -10, chaos: -30 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 2
            { type: "dialogue", speaker: "npc", text: "Você me conhece mesmo, né?", condition: { check: 'happiness', threshold: 70, operator: '>=' }, altText: "Vamos ver se esse filme presta..." }, // Comentário 2
            { type: "dialogue", speaker: "npc", text: "Nossa, essa atriz, a **Scarlett Johansson**, é muito bonita, né?" },
            { 
                type: "question", 
                text: "Teste de Ciúmes ou só um comentário? Pisar com cuidado...", 
                options: ["Bonita? Ela é PERFEITA! Um espetáculo!", "Ah, nem acho... você é bem mais.", "Ela é bonita, sim. Mas sinceramente? Ter você aqui do lado vendo o filme comigo é bem melhor.", "Sei lá, não reparo muito nessas coisas."], 
                correctAnswer: 2, 
                chaosAnswer: 0,
                commonAnswers: [1, 3],
                feedback: { 
                    correct: "Own, bobo!",
                    common: "Hm.",
                    chaos: "'PERFEITA'? 'ESPETÁCULO'? Tá bom então, Pedro. Continua vendo sua atriz 'perfeita' aí SOZINHO."
                },
                emotionEffect: { correct: 15, common: -10, chaos: -40 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 3
            { type: "dialogue", speaker: "npc", text: "Mas falando sério, o filme tá bom.", condition: { check: 'happiness', threshold: 70, operator: '>=' }, altText: "..." }, // Comentário 3
            { type: "dialogue", speaker: "npc", text: "Ai, deu uma fominha... Podíamos pedir alguma coisa?" },
            { 
                type: "question", 
                text: "Comida! Território neutro? Ou mais uma armadilha?", 
                options: ["Boa! Vou pedir aquela pizza de calabresa!", "Será? Tô tentando maneirar...", "Claro! O que você tá com vontade de comer? Pizza? Japa?", "Agora? Mas a gente acabou de jantar!"], 
                correctAnswer: 2, 
                chaosAnswer: 3,
                commonAnswers: [0, 1],
                feedback: { 
                    correct: "Pizza! Pede aquela metade **Frango com Catupiry**, metade **Calabresa**? Você é demais!",
                    common: "Ah, não sei... deixa pra lá. Perdi a fome. Deixa que eu acho outra coisa pra ver.",
                    wrong_fallback: "Quer saber? Cansei. Vou dormir. Boa noite.", // Usado pelo Repelente
                    chaos: "Sério, Pedro?! Eu aqui tentando ter uma noite legal e você vem com essa?! Quer saber? Assiste seu jogo SOZINHO!"
                },
                emotionEffect: { correct: 20, common: -10, chaos: -50 }
            },
            // --- Finais (Pensamentos do Jogador) ---
            { type: "dialogue", speaker: "player", text: "(Ufa! Noite salva pela pizza. Acho que peguei o jeito disso... por hoje.)", condition: { final: 'perfect' } },
            { type: "dialogue", speaker: "player", text: "(Ok, sem comida e perdi o controle remoto. Pelo menos o sofá ainda é meu... eu acho.)", condition: { final: 'common' } },
            { type: "dialogue", speaker: "player", text: "(Filme arruinado de novo... Sério, qual o segredo?! Parece que tudo que eu falo tá errado! Impossível agradar!)", condition: { final: 'bad' } },
            { type: "dialogue", speaker: "player", text: "(Finalmente! Controle remoto só meu e sem filme chato. Ela quer joguinho? Ganhou o silêncio. O sofá nem é tão ruim assim... pelo menos tem paz.)", condition: { final: 'chaos' } }
        ]
    },

    "provador": {
        // ... (Seu cenário "provador" que já estava aqui, intacto) ...
        backgroundImage: "url('https://uploads.onecompiler.io/43rztn6g5/442dggdnu/Loja%20de%20Roupas.png')",
        contextText: [
            "O cenário: Um templo do consumo moderno, também conhecido como shopping. Você está aqui, um guerreiro relutante no campo de batalha das liquidações.",
            "Sua missão: Acompanhar sua amada em uma 'olhadinha rápida' que, como você bem sabe, tem a duração média de uma era geológica.",
            "Após incontáveis corredores e a promessa de 'só mais essa lojinha', vocês finalmente estão DENTRO do alvo principal: a loja de roupas.",
            "Ela avista um vestido... A batalha está prestes a começar."
        ],
        events: [
            { type: "dialogue", speaker: "npc", text: "Hmm... Gostei desse vestido! Vou experimentar! Me espera aqui, jajá eu volto!" },
            { type: "dialogue", speaker: "player", text: "(Beleza, ela disse 'jajá'. Fuso Horário Feminino de Compras... pode levar eras.)" },
            { type: "dialogue", speaker: "npc", text: "(Ela sai do provador, rodopiando)...E aí, o que você achou?" },
            {
                type: "question",
                text: "Opinião sobre o vestido! Rápido, pensa em algo!",
                options: [ "Gostei, ficou bom em você.", "O tecido parece de boa qualidade.", "Uau! Ficou ótimo! Realçou bastante seus olhos!", "É bonito, mas parecido com o da sua irmã, né?" ],
                correctAnswer: 2,
                chaosAnswer: 3,
                commonAnswers: [0, 1],
                feedback: {
                    correct: "Sério?? Ai, que bom que você gostou! Você sempre sabe o que dizer!",
                    common: "...Ah. Legal.",
                    chaos: "Com a minha IRMÃ? Sério isso, Pedro? Já começou bem..."
                },
                emotionEffect: { correct: 15, common: -10, chaos: -30 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 1
            { type: "dialogue", speaker: "npc", text: "É bom saber que você repara nos detalhes...", condition: { check: 'happiness', threshold: 70, operator: '>=' }, altText: "Enfim... preciso ver melhor no espelho." }, // Comentário 1
            { 
                type: "dialogue", 
                speaker: "npc", 
                text: "Mas sei lá... olhando aqui... não acha que marcou um pouco? Me deixou meio... sei lá... cheinha?",
                condition: { check: 'happiness', threshold: 50, operator: '>=' },
                altText: "...E pra completar, acho que isso aqui me deixou meio... cheinha?"
            },
            {
                type: "question",
                text: "'Cheinha'? Armadilha! Desviar AGORA!",
                options: [ "Imagina, amor! Você tá ótima, não tá cheinha!", "Talvez só um pouquinho aqui no quadril, mas nem dá pra notar direito.", "Você está linda! Esse corte valorizou muito sua cintura. Ei, experimenta aquele outro azul pra gente comparar?", "É o espelho/luz dessa loja, eles sempre distorcem." ],
                correctAnswer: 2,
                chaosAnswer: 1,
                commonAnswers: [0, 3],
                feedback: {
                    correct: "Verdade, né? Eu sou linda mesmo! E você tem bom gosto pra notar! Boa ideia, vou pegar o azul!",
                    common: "Tá... Se você diz... Vou pegar outro pra ver.",
                    chaos: "GORDA?! ONDE?! Você tá me chamando de GORDA, Pedro?! QUER SABER? CANSEI! VAMOS EMBORA!" // Fim prematuro
                },
                emotionEffect: { correct: 20, common: -15, chaos: -50 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 2
            { type: "dialogue", speaker: "npc", text: "Gosto quando você sugere coisas também, sabia? Mostra que você tá participando.", condition: { check: 'happiness', threshold: 70, operator: '>=' }, altText: "Pelo menos você não disse que eu tô gorda... eu acho." }, // Comentário 2
            { 
                type: "dialogue", 
                speaker: "npc", 
                text: "E esse azul? O que você acha? Melhor que o primeiro?",
                condition: { check: 'happiness', threshold: 60, operator: '>' }, 
                altText: "Trouxe esse outro. Vê aí."
            },
            {
                type: "question",
                text: "Droga, qual era o primeiro? Branco total!",
                condition: { check: 'happiness', threshold: 60, operator: '>' }, 
                altText: "(Xi... 'Vê aí'? Ela tá brava. Resposta errada aqui e eu durmo no sofá hoje. O que eu digo?)", 
                options: [ "Gostei mais desse segundo.", "Prefiro o primeiro, aquele te valorizou mais.", "Difícil escolher! O primeiro tinha um brilho legal, mas esse aqui combinou muito com seu cabelo. Qual *você* se sentiu melhor?", "Amor, os dois são bonitos. Leva qualquer um, por favor." ],
                correctAnswer: 2,
                chaosAnswer: 3,
                commonAnswers: [0, 1],
                feedback: {
                    correct: "Nossa, você... prestou atenção? Obrigada. Acho que me senti melhor nesse.",
                    common: "Ah... Ok. Vou levar esse então.",
                    chaos: "'QUALQUER UM'?! Pega minhas sacolas AGORA. Vamos embora!" // Fim prematuro
                },
                emotionEffect: { correct: 15, common: -10, chaos: -40 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 3
            { type: "dialogue", speaker: "npc", text: "É tão bom quando você me ajuda a decidir, mas respeita minha opinião final.", condition: { check: 'happiness', threshold: 70, operator: '>=' }, altText: "Tá, né... Pelo menos decidiu um." }, // Comentário 3
            { 
                type: "dialogue", 
                speaker: "npc", 
                text: "Amei esse! Você acha que vale a pena levar, mesmo com esse preço?",
                condition: { check: 'happiness', threshold: 70, operator: '>' },
                altText: "É... Amei esse. Mas tá caro..."
            },
            {
                type: "question",
                text: "A pergunta final! Ela quer ou não quer?",
                options: [ "Claro, leva! Se você gostou, o preço é o de menos!", "Nossa, meio caro... Não tem um parecido em promoção?", "Ficou espetacular! É um investimento, mas se você *realmente* amou e acha que vai usar bastante, acho que vale. O que *você* acha?", "Pelo amor de Deus, não! Guarda esse dinheiro pra gente pedir pizza!" ],
                correctAnswer: 2,
                chaosAnswer: 3,
                commonAnswers: [0, 1],
                feedback: { 
                    correct: "É verdade! Eu vou usar muito! (...) Que tal a gente ir pra casa agora e... fazer alguma coisa divertida? 😉",
                    common: "É... Não sei... Acho que vou pensar melhor... Obrigada pela 'ajuda'. Pode ir pegando as outras sacolas ali pra mim?",
                    wrong_fallback: "Sério, Pedro, por que eu ainda te trago junto? Você não ajuda em nada! Vamos embora.",
                    chaos: "PIZZA?! (...) ACABOU! VAMOS EMBORA! E VOCÊ PAGA O ESTACIONAMENTO SOZINHO! E DORME NO SOFÁ!"
                },
                emotionEffect: { correct: 20, common: -10, chaos: -50 }
            },
            // --- Finais (Pensamentos do Jogador) ---
            { type: "dialogue", speaker: "player", text: "(Ufa! Ainda bem, deu tudo certo no final. Nem foi tão difícil, no final das contas, valeu a pena...)", condition: { final: 'perfect' } },
            { type: "dialogue", speaker: "player", text: "(Ok, não foi um desastre total... Definitivamente virei o 'Carrega Compras Oficial'.)", condition: { final: 'common' } },
            { type: "dialogue", speaker: "player", text: "(Sério mesmo? O que ela queria que eu dissesse?! Não importa o quanto eu seja perfeito, *nunca* tá bom pra ela! Mulher é bicho complicado mesmo, aff...)", condition: { final: 'bad' } },
            { type: "dialogue", speaker: "player", text: "(Quem ela pensa que é pra falar assim comigo? Chega desse joguinho de adivinhação. Tô livre! Mesmo que o preço seja o sofá... Valeu!)", condition: { final: 'chaos' } }
        ]
    },

    // --- CENÁRIO CARRO (ATUALIZADO) ---
    "carro": {
        backgroundImage: "url('https://uploads.onecompiler.io/43tk45a7t/442ggzsuk/wmremove-transformed.png')", // Sua URL
        
        contextText: [
            "O carro. Um espaço confinado a 100 km/h, sem rotas de fuga para uma DR iminente.",
            "Vocês acabaram de sair do jantar... na casa dos pais dela. O silêncio dentro do carro está mais alto que o ronco do motor.",
            "Ela está quieta. Quieta *demais*. Olhando fixamente para a janela. Você sente a pressão atmosférica caindo..."
        ],

        events: [
            { type: "dialogue", speaker: "player", text: "(Ok, silêncio pós-sogros. Isso nunca é bom... Preciso investigar com cuidado...)" },
            { type: "dialogue", speaker: "player", text: "Tá tudo bem, amor? Você tá tão quieta..." },
            { type: "dialogue", speaker: "npc", text: "...Nada." },
            // --- Pergunta 1 ---
            {
                type: "question",
                text: "'Nada'. O 'Nada' que significa 'TUDO'. Como eu desativo essa bomba?",
                options: [ "Tem certeza? Você parece meio brava.", "Certeza? Você parece chateada. Foi alguma coisa que *eu* fiz?", "Ok, então.", "É TPM? Você fica assim nessa época." ],
                correctAnswer: 1,
                chaosAnswer: 3,
                commonAnswers: [0, 2],
                feedback: {
                    correct: "Não é *você*... é minha mãe. Ela e aqueles comentários...",
                    common: "Eu já disse que não é nada, Pedro. Deixa pra lá.",
                    chaos: "TPM? É essa sua explicação pra tudo? Inacreditável!"
                },
                emotionEffect: { correct: 10, common: -10, chaos: -30 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 1
            { type: "dialogue", speaker: "npc", text: "Ela sempre tem que tocar naquele assunto...", condition: { check: 'happiness', threshold: 50, operator: '>=' }, altText: "Só... dirige. Por favor." }, // Comentário 1
            // --- Pergunta 2 ---
            { 
                type: "dialogue", 
                speaker: "npc", 
                text: "Minha mãe... ela perguntou de novo quando a gente vai... sabe... 'firmar compromisso'. Quando vamos casar.",
                condition: { check: 'happiness', threshold: 30, operator: '>' }, // Só fala se não estiver no caos
                altText: "E ainda por cima, minha mãe fica me pressionando sobre CASAMENTO!" // Tom irritado
            },
            {
                type: "question",
                text: "Ah, ótimo. A pergunta do 'próximo passo'. Campo minado! Ela tá chateada com a mãe... ou comigo?",
                condition: { check: 'happiness', threshold: 30, operator: '>' }, // Pergunta normal
                altText: "Ela tá descontando a raiva da mãe em mim! O que eu falo?", // Pensamento alternativo
                options: [ "Ignora, amor. Entra por um ouvido e sai pelo outro.", "Casar? Agora? Mal temos dinheiro pra gasolina!", "Eu sei que é chato ela te pressionar assim. Não liga pra isso, o que importa é o *nosso* tempo, certo? Nós estamos bem.", "Credo, sua mãe é muito sem noção. Manda ela cuidar da vida dela." ],
                correctAnswer: 2,
                chaosAnswer: 3,
                commonAnswers: [0, 1],
                feedback: {
                    correct: "É... eu sei. Você tem razão. É só que... cansa.",
                    common: "É, mas é fácil pra *você* falar, né? Não é sua mãe te enchendo.",
                    chaos: "Sem noção?! É da MINHA MÃE que você tá falando! Pelo menos ela se preocupa com meu futuro!" // Fim prematuro
                },
                emotionEffect: { correct: 20, common: -15, chaos: -50 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 2
            { type: "dialogue", speaker: "npc", text: "E não foi só isso... ela também comentou do seu... 'estilo'.", condition: { check: 'happiness', threshold: 40, operator: '>=' }, altText: "...esquece. Não vale a pena." }, // Comentário 2
            // --- Pergunta 3 ---
            { 
                type: "dialogue", 
                speaker: "npc", 
                text: "Ela disse que... aquela sua camiseta de banda... não é 'adequada' pra um almoço de família.",
                condition: { check: 'happiness', threshold: 30, operator: '>' }, // Só pergunta se não estiver muito mal
                altText: "E ela ainda implicou com a sua camiseta do 'Metallica'..." 
            },
            {
                type: "question",
                text: "Minha camiseta?! A do 'Master of Puppets'?! Qual o problema dela?",
                condition: { check: 'happiness', threshold: 30, operator: '>' },
                altText: "Até da minha camiseta ela falou? Qual o problema dessa mulher?", // Pensamento alternativo
                options: [ "Mas você disse que gostava dessa camiseta!", "Sério? Poxa, não sabia que incomodava. É só uma camiseta, mas se for importante pra *você*, na próxima eu venho com uma mais 'séria'.", "Afs, que frescura. Ninguém liga pra roupa hoje em dia.", "O problema é dela! Eu visto o que eu quiser! E ela que se dane!" ],
                correctAnswer: 1, // <<< Mudei a CERTA para B
                chaosAnswer: 3,
                commonAnswers: [0, 2],
                feedback: {
                    correct: "Não é que *eu* ligue... é só pra evitar o estresse com ela, sabe? Obrigada por entender.",
                    common: "Não é essa a questão, Pedro! É sobre o *contexto*!",
                    chaos: "Claro! Veste o que você quiser! Mas na casa da MINHA mãe você não vai mais!" // Fim prematuro
                },
                emotionEffect: { correct: 15, common: -10, chaos: -40 }
            },
            { type: "dialogue", speaker: "npc", text: "..." }, // Slot Feedback 3
            { type: "dialogue", speaker: "npc", text: "Desculpa... é que esses almoços me deixam tensa.", condition: { check: 'happiness', threshold: 50, operator: '>=' }, altText: "Ok. Próxima vez você vai de terno, então. Satisfeito?" }, // Comentário 3
            // --- Pergunta 4 ---
            { type: "dialogue", speaker: "npc", text: "Enfim... pelo menos acabou. O que vamos fazer agora?" },
            {
                type: "question",
                text: "A chance de salvar o dia. O que ela quer agora? Relaxar ou...",
                options: [ "Sei lá, o que *você* quer fazer?", "Graças a Deus. Quero ir pra casa jogar meu videogame.", "Que tal a gente passar, pegar um açaí e ir pra casa ver aquela série que *você* queria começar?", "Já sei! Vamos passar na casa da minha mãe, ela faz um feijão bem melhor que o da sua." ],
                correctAnswer: 2,
                chaosAnswer: 3,
                commonAnswers: [0, 1],
                feedback: {
                    correct: "Sério? Açaí e série? Perfeito! Você sempre sabe como me animar depois desses dias...",
                    common: "Ah, não sei... tô cansada. Só me deixa em casa, por favor.",
                    wrong_fallback: "Quer saber? Cansei. Me deixa no próximo ponto de ônibus. Prefiro ir andando.", // Repelente
                    chaos: "FEIJÃO DA SUA MÃE?! VOCÊ TÁ COMPARANDO MINHA MÃE COM A SUA?! PARA O CARRO AGORA!" // RedPill
                },
                emotionEffect: { correct: 20, common: -10, chaos: -50 }
            },
            // --- Finais (Pensamentos do Jogador) ---
            { type: "dialogue", speaker: "player", text: "(Ufa! Noite salva pela pizza. Acho que peguei o jeito disso... por hoje.)", condition: { final: 'perfect' } },
            { type: "dialogue", speaker: "player", text: "(Ok, silêncio tenso o resto do caminho. Pelo menos não gritamos. Definitivamente virei o 'Motorista Oficial'.)", condition: { final: 'common' } },
            { type: "dialogue", speaker: "player", text: "(Filme arruinado de novo... Sério, qual o segredo?! Parece que tudo que eu falo tá errado! Impossível agradar!)", condition: { final: 'bad' } },
            { type: "dialogue", speaker: "player", text: "(Finalmente! Controle remoto só meu e sem filme chato. Ela quer joguinho? Ganhou o silêncio. O sofá nem é tão ruim assim... pelo menos tem paz.)", condition: { final: 'chaos' } }
        ]
    },
    
    "encontro": {
        backgroundImage: "url('https://exemplo.com/fundo-encontro.png')",
        contextText: ["Ok, primeiro encontro. Calma. Seja charmoso. Não fale da sua coleção de selos."],
        events: [ { type: "dialogue", speaker: "npc", text: "Cenário Encontro em construção!" } ]
    }
};
