// app.js

// Banco de questões cobrindo os 3 blocos da matéria
const questions = [
    {
        id: 1,
        bloco: "Bloco 1: O Terreno",
        text: "Considere os vetores no $\\mathbb{R}^4$: $v_1 = (1, 2, 0, 1)$, $v_2 = (0, 1, 1, 0)$ e $v_3 = (1, 3, 1, 1)$. Esse conjunto é L.I. ou L.D.?",
        options: [
            "Linearmente Independente (L.I.)",
            "Linearmente Dependente (L.D.)"
        ],
        correct: 1,
        explanation: "Correto! O conjunto é L.D. porque o terceiro vetor é a soma dos dois primeiros ($v_3 = v_1 + v_2$). Durante o escalonamento, a última linha inteira se tornaria zero, provando que há um vetor intruso."
    },
    {
        id: 2,
        bloco: "Bloco 2: A Mecânica",
        text: "Qual das matrizes abaixo representa uma Transformação Linear de Rotação de $90^\\circ$ no sentido anti-horário?",
        options: [
            "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$"
        ],
        correct: 0,
        explanation: "Exato! A matriz genérica de rotação usa $\\cos(\\theta)$ na diagonal principal. Como $\\cos(90^\\circ) = 0$ e $\\sin(90^\\circ) = 1$, a matriz fica com 0 na diagonal e -1 no canto superior direito."
    },
    {
        id: 3,
        bloco: "Bloco 3: O Chefe Final",
        text: "Seja uma Transformação Linear $T: \\mathbb{R}^3 \\to \\mathbb{R}^3$. Se você escalonou a matriz associada e descobriu que a Dimensão da Imagem ($\\dim(\\text{Im})$) é 2, qual é obrigatoriamente a Dimensão do Núcleo?",
        options: [
            "Dimensão 0",
            "Dimensão 1",
            "Dimensão 2",
            "Dimensão 3"
        ],
        correct: 1,
        explanation: "Perfeito! Pelo Teorema da Dimensão, a soma da dimensão da Imagem com a do Núcleo tem que ser igual à dimensão do Domínio. Como o domínio é o $\\mathbb{R}^3$ (dimensão 3), temos: $3 = 2 + 1$. Logo, o núcleo tem dimensão 1."
    }
];

// Variáveis de Estado (Foco e Disciplina)
let currentQuestionIndex = 0;
let userXP = 0;
let userLevel = 1;
const xpPerQuestion = 50;

// Seletores do DOM (Certifique-se de que o HTML possui essas IDs ou crie divs vazias no HTML para recebê-las)
const quizContainer = document.getElementById('quiz-container');
const xpDisplay = document.getElementById('xp-display');
const levelDisplay = document.getElementById('level-display');

// Função para renderizar o cabeçalho de status de gamificação
function updateStatus() {
    if(!xpDisplay && quizContainer) {
        // Injeta o placar caso o Claude não tenha criado no HTML
        const statusDiv = document.createElement('div');
        statusDiv.innerHTML = `<h3 id="xp-text">Nível: ${userLevel} | XP: ${userXP}</h3><hr>`;
        quizContainer.parentNode.insertBefore(statusDiv, quizContainer);
    } else if (xpDisplay) {
        xpDisplay.innerText = userXP;
        levelDisplay.innerText = userLevel;
    } else {
        const xpText = document.getElementById('xp-text');
        if(xpText) xpText.innerText = `Nível: ${userLevel} | XP: ${userXP}`;
    }
}

// Renderiza a questão isoladamente na tela
function loadQuestion() {
    if (!quizContainer) return;
    
    // Limpa a tela para garantir que apenas um exercício apareça por vez
    quizContainer.innerHTML = ''; 
    updateStatus();

    if (currentQuestionIndex >= questions.length) {
        quizContainer.innerHTML = `
            <h2>Parabéns! Você concluiu a revisão.</h2>
            <p>Nível Final: ${userLevel}</p>
            <p>XP Total Adquirido: ${userXP}</p>
            <button onclick="location.reload()" style="padding: 10px; margin-top: 20px;">Reiniciar Treino</button>
        `;
        return;
    }

    const q = questions[currentQuestionIndex];

    // Monta o Card da Questão
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    questionCard.style.padding = "20px";
    questionCard.style.border = "1px solid #444";
    questionCard.style.borderRadius = "8px";
    questionCard.style.marginBottom = "20px";
    
    questionCard.innerHTML = `
        <span style="color: #888; font-size: 0.9em;">${q.bloco}</span>
        <h3>Questão ${currentQuestionIndex + 1}</h3>
        <p>${q.text}</p>
        <div id="options-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;"></div>
        <div id="feedback-area" style="margin-top: 20px; font-weight: bold;"></div>
    `;

    quizContainer.appendChild(questionCard);

    const optionsContainer = document.getElementById('options-container');

    // Monta os botões de alternativa
    q.options.forEach((optionText, index) => {
        const btn = document.createElement('button');
        btn.innerHTML = optionText;
        btn.style.padding = "10px";
        btn.style.cursor = "pointer";
        btn.onclick = () => checkAnswer(index, q.correct, q.explanation, optionsContainer);
        optionsContainer.appendChild(btn);
    });

    // Chama o MathJax para transformar o LaTeX em fórmulas visuais bonitas
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

// Verifica a resposta e atualiza a gamificação
function checkAnswer(selectedIndex, correctIndex, explanation, container) {
    // Desativa os botões após a escolha
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    const feedbackArea = document.getElementById('feedback-area');

    if (selectedIndex === correctIndex) {
        // Acertou: Ganha XP e talvez suba de nível
        userXP += xpPerQuestion;
        if (userXP % 100 === 0) userLevel++; 
        updateStatus();

        feedbackArea.style.color = "#4CAF50"; // Verde
        feedbackArea.innerHTML = `✅ ${explanation}`;
    } else {
        // Errou: Mostra a correção
        feedbackArea.style.color = "#F44336"; // Vermelho
        feedbackArea.innerHTML = `❌ Incorreto. <br><br><strong>Correção Passo a Passo:</strong> ${explanation}`;
    }

    // Botão para avançar para o próximo exercício isolado
    const nextBtn = document.createElement('button');
    nextBtn.innerText = "Próximo Exercício ➔";
    nextBtn.style.marginTop = "20px";
    nextBtn.style.padding = "10px 20px";
    nextBtn.style.backgroundColor = "#007BFF";
    nextBtn.style.color = "white";
    nextBtn.style.border = "none";
    nextBtn.style.borderRadius = "5px";
    nextBtn.style.cursor = "pointer";
    nextBtn.onclick = () => {
        currentQuestionIndex++;
        loadQuestion();
    };

    feedbackArea.appendChild(nextBtn);

    // Renderiza fórmulas que possam existir na explicação
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

// Inicializa a aplicação quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
    // Se o Claude não gerou uma div de quiz, o JS cria ela no body
    if (!document.getElementById('quiz-container')) {
        const newContainer = document.createElement('div');
        newContainer.id = 'quiz-container';
        newContainer.style.maxWidth = "800px";
        newContainer.style.margin = "0 auto";
        newContainer.style.padding = "20px";
        document.body.appendChild(newContainer);
    }
    loadQuestion();
});