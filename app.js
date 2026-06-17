/**
 * Álgebra Linear — Guia Final
 * Lógica do Aplicativo (Gamificação, Exercícios e Modal)
 */

const App = (function() {
  // ─── BANCO DE QUESTÕES ───
  const questions = [
    {
      bloco: 'Bloco 1', type: 'vf', level: 'Fácil', xp: 20,
      text: 'Se um conjunto de vetores contém o vetor nulo $\\mathbf{0}$, então esse conjunto é automaticamente Linearmente Dependente (L.D.).',
      options: ['Verdadeiro', 'Falso'],
      correct: 0,
      explanation: '<p><strong>Verdadeiro!</strong> Qualquer conjunto que possua o vetor zero é L.D. Isso ocorre porque você pode multiplicar o vetor zero por qualquer escalar diferente de zero (ex: $5 \\cdot \\mathbf{0} = \\mathbf{0}$) e manter os outros vetores multiplicados por zero, satisfazendo a equação da dependência linear sem que todos os escalares sejam nulos.</p>'
    },
    {
      bloco: 'Bloco 1', type: 'mc', level: 'Médio', xp: 50,
      text: 'Considere os vetores $v_1 = (1, 2)$ e $v_2 = (-2, -4)$ no $\\mathbb{R}^2$. Esse conjunto é uma Base para o $\\mathbb{R}^2$?',
      options: [
        'Sim, pois são dois vetores no $\\mathbb{R}^2$.',
        'Não, pois eles são L.D. (um é múltiplo do outro).',
        'Sim, pois eles geram o vetor nulo.',
        'Não, pois faltam vetores para gerar o $\\mathbb{R}^2$.'
      ],
      correct: 1,
      explanation: '<p><strong>Exato!</strong> Para ser Base, o conjunto precisa gerar o espaço e ser <strong>L.I.</strong>. Repare que $v_2 = -2 \\cdot v_1$. Como um vetor é múltiplo escalar do outro, eles são L.D. (apontam para a mesma direção), esmagando o espaço em uma reta. Logo, não servem como Base do $\\mathbb{R}^2$.</p>'
    },
    {
      bloco: 'Bloco 1', type: 'mc', level: 'Difícil', xp: 100,
      text: 'No $\\mathbb{R}^4$, os vetores $v_1=(1,0,1,0)$, $v_2=(0,1,0,1)$ e $v_3=(2,3,2,3)$ são L.I. ou L.D.?',
      options: [
        'L.I., pois não possuem coordenadas zeradas nas mesmas posições.',
        'L.D., pois $v_3 = 2v_1 + 3v_2$.',
        'L.I., pois a matriz formada por eles tem posto 3.',
        'L.D., pois a dimensão do espaço é 4 e temos apenas 3 vetores.'
      ],
      correct: 1,
      explanation: '<p><strong>Perfeito!</strong> Se você montar a matriz e escalonar, a terceira linha vai zerar completamente. Olhando os vetores, é possível perceber a combinação linear: $2(1,0,1,0) + 3(0,1,0,1) = (2,0,2,0) + (0,3,0,3) = (2,3,2,3)$. Como $v_3$ é criado a partir dos outros dois, o grupo é L.D.</p>'
    },
    {
      bloco: 'Bloco 2', type: 'vf', level: 'Fácil', xp: 30,
      text: 'A função $T(x,y) = (x+1, y)$ é uma Transformação Linear.',
      options: ['Verdadeiro', 'Falso'],
      correct: 1,
      explanation: '<p><strong>Falso!</strong> A regra de ouro mais rápida para testar uma T.L. é verificar se $T(\\mathbf{0}) = \\mathbf{0}$. Se aplicarmos $x=0$ e $y=0$, teremos $T(0,0) = (0+1, 0) = (1, 0)$. Como não resultou na origem $(0,0)$, <strong>não é</strong> uma transformação linear (ela possui um deslocamento/translação constante).</p>'
    },
    {
      bloco: 'Bloco 2', type: 'mc', level: 'Médio', xp: 50,
      text: 'Qual é a matriz que representa uma reflexão em torno do eixo $x$ no $\\mathbb{R}^2$?',
      options: [
        '$\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$',
        '$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$',
        '$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$',
        '$\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$'
      ],
      correct: 2,
      explanation: '<p><strong>Correto!</strong> Na reflexão em torno do eixo $x$, a coordenada $x$ se mantém e a coordenada $y$ inverte o sinal: $T(x,y) = (x, -y)$.<br>Aplicando na base canônica: $T(1,0) = (1,0)$ e $T(0,1) = (0,-1)$.<br>Juntando nas colunas, temos a matriz $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$.</p>'
    },
    {
      bloco: 'Bloco 2', type: 'mc', level: 'Difícil', xp: 80,
      text: 'Seja a transformação $T(x,y,z) = (x+y, z)$. Qual é a matriz associada a $T$?',
      options: [
        '$\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$',
        '$\\begin{pmatrix} 1 & 0 \\\\ 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$',
        '$\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$',
        '$\\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\end{pmatrix}$'
      ],
      correct: 0,
      explanation: '<p><strong>Exato!</strong> A transformação vai do $\\mathbb{R}^3$ para o $\\mathbb{R}^2$, então a matriz será $2 \\times 3$.<br>Calculando nas bases canônicas:<br>$T(1,0,0) = (1,0)$<br>$T(0,1,0) = (1,0)$<br>$T(0,0,1) = (0,1)$<br>Colocando esses resultados nas colunas, obtemos: $$\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$$</p>'
    },
    {
      bloco: 'Bloco 3', type: 'vf', level: 'Fácil', xp: 30,
      text: 'Pelo Teorema da Dimensão, a dimensão do Domínio é sempre igual à Dimensão da Imagem mais a Dimensão do Núcleo.',
      options: ['Verdadeiro', 'Falso'],
      correct: 0,
      explanation: '<p><strong>Verdadeiro!</strong> Essa é a lei fundamental das Transformações Lineares. $\\dim(V) = \\dim(\\text{Im}) + \\dim(\\ker)$. Tudo o que entra no domínio ($V$) ou vai para a Imagem, ou é esmagado pelo Núcleo.</p>'
    },
    {
      bloco: 'Bloco 3', type: 'mc', level: 'Médio', xp: 60,
      text: 'Uma Transformação $T: \\mathbb{R}^5 \\to \\mathbb{R}^3$ tem uma Imagem de dimensão 3. Qual é a dimensão do Núcleo?',
      options: ['0', '2', '3', '5'],
      correct: 1,
      explanation: '<p><strong>Certíssimo!</strong> Aplicando o Teorema da Dimensão:<br>$\\dim(\\text{Domínio}) = \\dim(\\text{Imagem}) + \\dim(\\text{Núcleo})$<br>$5 = 3 + \\dim(\\text{Núcleo})$<br>$\\dim(\\text{Núcleo}) = 2$.</p>'
    },
    {
      bloco: 'Bloco 3', type: 'mc', level: 'Difícil', xp: 100,
      text: 'Se ao escalonar a matriz $A$ de uma transformação $T$ você encontrou pivôs nas colunas 1 e 3. Como você define a Base da Imagem?',
      options: [
        'Pegando as colunas 1 e 3 da matriz já escalonada (REF).',
        'A base da imagem será formada pelas linhas não nulas da matriz escalonada.',
        'A base da imagem é o próprio $\\mathbb{R}^2$.',
        'Pegando as colunas 1 e 3 da matriz original (antes de escalonar).'
      ],
      correct: 3,
      explanation: '<p><strong>Matou a charada!</strong> O escalonamento serve APENAS para te dizer <strong>quais</strong> são as colunas linearmente independentes. Para montar a Base da Imagem, você obrigatoriamente tem que voltar na <strong>matriz original</strong> e resgatar essas colunas. Pegar da escalonada é o erro mais comum nas provas!</p>'
    },
    {
      bloco: 'Bloco 3', type: 'mc', level: 'Difícil', xp: 120,
      text: 'Para um sistema $Ax = \\mathbf{0}$ com 4 variáveis, se a matriz escalonada possui 3 pivôs, qual a dimensão do espaço nulo (Núcleo)?',
      options: ['1', '2', '3', '4'],
      correct: 0,
      explanation: '<p><strong>Perfeito!</strong> O número de variáveis é a dimensão do Domínio ($n = 4$). O número de pivôs é o posto da matriz, ou seja, a dimensão da Imagem ($r = 3$). A dimensão do núcleo (espaço nulo) é a quantidade de colunas sem pivô, que chamamos de variáveis livres. $4 - 3 = 1$ variável livre. Logo, $\\dim(\\ker) = 1$.</p>'
    }
  ];

  // ─── ESTADO DA APLICAÇÃO ───
  let currentQIndex = 0;
  let stats = { correct: 0, wrong: 0, xp: 0 };

  // ─── SELETORES DOM ───
  const els = {
    arena: document.getElementById('exercise-arena'),
    qCurrent: document.getElementById('q-current'),
    qTotal: document.getElementById('q-total'),
    qProgress: document.getElementById('q-progress-fill'),
    statCorrect: document.getElementById('stat-correct'),
    statWrong: document.getElementById('stat-wrong'),
    statXP: document.getElementById('stat-xp'),
    hudXP: document.getElementById('xp-value'),
    hudXPBar: document.getElementById('xp-bar'),
    hudLevel: document.getElementById('level-value'),
    restartBlock: document.getElementById('restart-block'),
    finalScore: document.getElementById('final-score'),
    
    // Modal
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalVerdict: document.getElementById('modal-verdict'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalNextBtn: document.getElementById('modal-next'),
    modalCloseBtn: document.getElementById('modal-close'),

    // Menus
    burger: document.getElementById('burger'),
    drawer: document.getElementById('drawer'),
    drawerClose: document.getElementById('drawer-close'),
    drawerOverlay: document.getElementById('drawer-overlay')
  };

  // ─── INICIALIZAÇÃO ───
  function init() {
    els.qTotal.textContent = questions.length;
    setupNav();
    setupModal();
    renderQuestion();
  }

  // ─── MENU MOBILE ───
  function setupNav() {
    const toggleDrawer = () => {
      els.drawer.classList.toggle('open');
      els.drawerOverlay.classList.toggle('show');
    };
    els.burger.addEventListener('click', toggleDrawer);
    els.drawerClose.addEventListener('click', toggleDrawer);
    els.drawerOverlay.addEventListener('click', toggleDrawer);
    
    document.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', toggleDrawer);
    });
  }

  // ─── RENDERIZAR QUESTÃO ───
  function renderQuestion() {
    els.arena.innerHTML = '';
    
    if (currentQIndex >= questions.length) {
      showEndScreen();
      return;
    }

    const q = questions[currentQIndex];
    
    // Atualizar barra de progresso inferior
    els.qCurrent.textContent = currentQIndex + 1;
    els.qProgress.style.width = `${((currentQIndex) / questions.length) * 100}%`;

    // Montar o HTML do Card
    const card = document.createElement('div');
    card.className = 'ex-card';
    
    let levelClass = 'ex-level-easy';
    if (q.level === 'Médio') levelClass = 'ex-level-medium';
    if (q.level === 'Difícil') levelClass = 'ex-level-hard';

    const choicesClass = q.type === 'vf' ? 'ex-choices ex-vf' : 'ex-choices';
    const keys = ['A', 'B', 'C', 'D'];

    let choicesHTML = '';
    q.options.forEach((opt, i) => {
      choicesHTML += `
        <button class="ex-choice" data-index="${i}">
          ${q.type === 'mc' ? `<span class="choice-key">${keys[i]}</span>` : ''}
          <span>${opt}</span>
        </button>
      `;
    });

    card.innerHTML = `
      <div class="ex-meta">
        <span class="ex-type">${q.bloco}</span>
        <span class="ex-level ${levelClass}">${q.level}</span>
        <span class="ex-xp">+${q.xp} XP</span>
      </div>
      <div class="ex-question">${q.text}</div>
      <div class="${choicesClass}" id="choices-container">
        ${choicesHTML}
      </div>
    `;

    els.arena.appendChild(card);

    // Adicionar eventos de clique nas alternativas
    const btns = card.querySelectorAll('.ex-choice');
    btns.forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index), btns, q));
    });

    triggerMathJax();
  }

  // ─── PROCESSAR RESPOSTA ───
  function handleAnswer(selectedIndex, allBtns, q) {
    // Desabilitar botões
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = selectedIndex === q.correct;
    
    if (isCorrect) {
      allBtns[selectedIndex].classList.add('correct');
      stats.correct++;
      addXP(q.xp);
    } else {
      allBtns[selectedIndex].classList.add('wrong');
      allBtns[q.correct].classList.add('correct'); // Mostra a correta
      stats.wrong++;
    }

    updateStatsHUD();
    
    // Pequeno atraso para o usuário ver a cor no botão antes do modal abrir
    setTimeout(() => openModal(isCorrect, q), 600);
  }

  // ─── GAMIFICAÇÃO (XP & NÍVEL) ───
  function addXP(amount) {
    stats.xp += amount;
    const level = Math.floor(stats.xp / 150) + 1; // A cada 150 XP, sobe um nível
    const progress = (stats.xp % 150) / 150 * 100;

    els.hudXP.textContent = stats.xp;
    els.statXP.textContent = stats.xp;
    els.hudLevel.textContent = level;
    els.hudXPBar.style.width = `${progress}%`;
  }

  function updateStatsHUD() {
    els.statCorrect.textContent = stats.correct;
    els.statWrong.textContent = stats.wrong;
  }

  // ─── MODAL DE FEEDBACK ───
  function setupModal() {
    const closeModal = () => {
      els.modalBackdrop.classList.remove('open');
      currentQIndex++;
      renderQuestion(); // Avança ao fechar o modal
    };
    els.modalNextBtn.addEventListener('click', closeModal);
    els.modalCloseBtn.addEventListener('click', closeModal);
  }

  function openModal(isCorrect, q) {
    if (isCorrect) {
      els.modalVerdict.innerHTML = '🎯 <span style="color: var(--green);">Acerto Crítico!</span>';
      els.modalTitle.textContent = `+${q.xp} XP Adquirido`;
    } else {
      els.modalVerdict.innerHTML = '💡 <span style="color: var(--amber);">Quase lá...</span>';
      els.modalTitle.textContent = 'Correção Passo a Passo:';
    }

    els.modalBody.innerHTML = q.explanation;
    els.modalBackdrop.classList.add('open');
    triggerMathJax();
  }

  // ─── TELA FINAL ───
  function showEndScreen() {
    els.qProgress.style.width = '100%';
    els.restartBlock.style.display = 'block';
    els.finalScore.textContent = `${stats.xp} XP (Nível ${els.hudLevel.textContent})`;
  }

  // ─── UTILITÁRIO: MATHJAX ───
  function triggerMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => console.log('Erro MathJax: ', err));
    }
  }

  // ─── API PÚBLICA ───
  return {
    start: init,
    restart: () => {
      currentQIndex = 0;
      stats = { correct: 0, wrong: 0, xp: 0 };
      els.hudXP.textContent = '0';
      els.hudLevel.textContent = '1';
      els.hudXPBar.style.width = '0%';
      els.restartBlock.style.display = 'none';
      updateStatsHUD();
      renderQuestion();
    }
  };
})();

// Iniciar a aplicação quando o DOM carregar
document.addEventListener('DOMContentLoaded', App.start);