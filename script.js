// Dados dos Planetas
const planetas = [
    { id: 1, nome: 'Mercúrio', emoji: '☿️', classe: 'mercurio' },
    { id: 2, nome: 'Vênus', emoji: '♀', classe: 'venus' },
    { id: 3, nome: 'Terra', emoji: '🌍', classe: 'terra' },
    { id: 4, nome: 'Marte', emoji: '♂', classe: 'marte' },
    { id: 5, nome: 'Júpiter', emoji: '♃', classe: 'jupiter' },
    { id: 6, nome: 'Saturno', emoji: '♄', classe: 'saturno' },
    { id: 7, nome: 'Urano', emoji: '♅', classe: 'urano' },
    { id: 8, nome: 'Netuno', emoji: '♆', classe: 'netuno' }
];

// Definição dos Challenges
const challenges = [
    {
        id: 'classico',
        nome: 'Modo Clássico',
        descricao: 'Complete o puzzle sem limites',
        icone: '🌟',
        desbloqueado: true,
        completo: false,
        verificar: () => true
    },
    {
        id: 'velocista',
        nome: 'Velocista',
        descricao: 'Complete em menos de 45 segundos',
        icone: '⚡',
        desbloqueado: false,
        completo: false,
        requisito: 'classico',
        verificar: (tempo) => tempo < 45
    },
    {
        id: 'precisao',
        nome: 'Precisão Total',
        descricao: 'Complete sem erros',
        icone: '🎯',
        desbloqueado: false,
        completo: false,
        requisito: 'classico',
        verificar: (tempo, erros) => erros === 0
    },
    {
        id: 'memoria',
        nome: 'Memória Espacial',
        descricao: 'Os nomes desaparecem após 10 segundos!',
        icone: '🧠',
        desbloqueado: false,
        completo: false,
        requisito: 'velocista',
        modoMemoria: true,
        verificar: () => true
    },
    {
        id: 'mestre',
        nome: 'Mestre Solar',
        descricao: 'Complete todos os challenges',
        icone: '👑',
        desbloqueado: false,
        completo: false,
        requisito: 'todos',
        verificar: () => {
            const stats = carregarChallenges();
            return stats.classico && stats.velocista && stats.precisao && stats.memoria;
        }
    }
];

// Variáveis do Jogo
let jogoAtivo = false;
let tempoInicio = 0;
let cronometroInterval = null;
let erros = 0;
let challengeAtual = 'classico';
let planetasEmbaralhados = [];
let slotsPreenchidos = new Array(8).fill(null);

// Navegação entre Telas
function mostrarTela(nomeTela) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(nomeTela).classList.add('ativa');
}

function voltarInicio() {
    mostrarTela('telaInicial');
    pararCronometro();
}

// Iniciar Jogo
function iniciarJogo(challengeId = 'classico') {
    challengeAtual = challengeId;
    erros = 0;
    slotsPreenchidos = new Array(8).fill(null);
    jogoAtivo = true;

    mostrarTela('telaJogo');

    // Atualizar header
    const challenge = challenges.find(c => c.id === challengeId);
    document.getElementById('challengeAtual').textContent = challenge.nome;
    document.getElementById('tentativas').textContent = `❌ Erros: 0`;

    // Embaralhar e criar planetas
    criarPlanetas();
    criarSlots();

    // Iniciar cronômetro
    iniciarCronometro();

    // Modo Memória: esconder nomes após 10 segundos
    if (challenge.modoMemoria) {
        setTimeout(() => {
            document.querySelectorAll('.planeta-nome').forEach(nome => {
                nome.style.display = 'none';
            });
        }, 10000);
    }
}

// Criar Planetas Embaralhados
function criarPlanetas() {
    planetasEmbaralhados = [...planetas].sort(() => Math.random() - 0.5);
    const container = document.getElementById('planetasContainer');
    container.innerHTML = '';

    planetasEmbaralhados.forEach((planeta, index) => {
        const div = document.createElement('div');
        div.className = `planeta ${planeta.classe}`;
        div.draggable = true;
        div.dataset.planetaId = planeta.id;
        div.innerHTML = `
            <span class="planeta-emoji">${planeta.emoji}</span>
            <span class="planeta-nome">${planeta.nome}</span>
        `;

        // Eventos de arrastar
        div.addEventListener('dragstart', arrastarInicio);
        div.addEventListener('dragend', arrastarFim);

        container.appendChild(div);
    });
}

// Criar Slots com Órbitas
function criarSlots() {
    const container = document.getElementById('orbitasContainer');
    container.innerHTML = '';

    // Ângulos para posicionar os planetas em círculo
    const angulos = [0, 45, 90, 135, 180, 225, 270, 315];

    for (let i = 0; i < 8; i++) {
        const orbita = document.createElement('div');
        orbita.className = `orbita orbita-${i + 1}`;

        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.posicao = i + 1;
        slot.innerHTML = `<span class="slot-numero">${i + 1}º</span>`;

        // Posicionar slot no topo da órbita
        const angulo = angulos[i] * (Math.PI / 180);
        const raio = (40 + (i * 35)); // Raio progressivo
        const x = Math.cos(angulo) * raio;
        const y = Math.sin(angulo) * raio;

        slot.style.position = 'absolute';
        slot.style.left = `calc(50% + ${x}px)`;
        slot.style.top = `calc(50% + ${y}px)`;
        slot.style.transform = 'translate(-50%, -50%)';

        // Eventos de drop
        slot.addEventListener('dragover', arrastarSobre);
        slot.addEventListener('dragleave', arrastarSair);
        slot.addEventListener('drop', soltar);
        slot.addEventListener('click', removerPlanetaDoSlot);

        orbita.appendChild(slot);
        container.appendChild(orbita);
    }
}

// Sistema de Drag and Drop
let planetaArrastado = null;

function arrastarInicio(e) {
    planetaArrastado = e.target.closest('.planeta');
    planetaArrastado.style.opacity = '0.5';
}

function arrastarFim(e) {
    if (planetaArrastado) {
        planetaArrastado.style.opacity = '1';
    }
}

function arrastarSobre(e) {
    e.preventDefault();
    const slot = e.target.closest('.slot');
    if (slot && !slot.querySelector('.planeta')) {
        slot.classList.add('drag-over');
    }
}

function arrastarSair(e) {
    const slot = e.target.closest('.slot');
    if (slot) {
        slot.classList.remove('drag-over');
    }
}

function soltar(e) {
    e.preventDefault();
    const slot = e.target.closest('.slot');

    if (!slot || !planetaArrastado) return;

    slot.classList.remove('drag-over');

    // Se o slot já está ocupado, devolver o planeta antigo para a área de planetas
    const planetaExistente = slot.querySelector('.planeta');
    if (planetaExistente) {
        const containerPlanetas = document.getElementById('planetasContainer');
        containerPlanetas.appendChild(planetaExistente);
        planetaExistente.style.position = 'relative';
        planetaExistente.style.left = 'auto';
        planetaExistente.style.top = 'auto';
        planetaExistente.style.transform = 'none';
    }

    const posicao = parseInt(slot.dataset.posicao);
    const planetaId = parseInt(planetaArrastado.dataset.planetaId);

    // Mover planeta para o slot
    slot.appendChild(planetaArrastado);
    planetaArrastado.style.opacity = '1';
    planetaArrastado.style.position = 'relative';
    planetaArrastado.style.left = 'auto';
    planetaArrastado.style.top = 'auto';
    planetaArrastado.style.transform = 'none';

    // Registrar no array
    slotsPreenchidos[posicao - 1] = planetaId;

    // Verificar se está correto
    if (planetaId === posicao) {
        slot.classList.add('correto');
        setTimeout(() => slot.classList.remove('correto'), 500);
    } else {
        slot.classList.add('incorreto');
        erros++;
        document.getElementById('tentativas').textContent = `❌ Erros: ${erros}`;
        setTimeout(() => slot.classList.remove('incorreto'), 500);
    }

    planetaArrastado = null;

    // Verificar vitória
    verificarVitoria();
}

// Remover Planeta do Slot (clique duplo ou botão direito)
function removerPlanetaDoSlot(e) {
    const slot = e.target.closest('.slot');
    if (!slot) return;

    const planeta = slot.querySelector('.planeta');
    if (!planeta) return;

    // Devolver para a área de planetas
    const containerPlanetas = document.getElementById('planetasContainer');
    containerPlanetas.appendChild(planeta);
    planeta.style.position = 'relative';
    planeta.style.left = 'auto';
    planeta.style.top = 'auto';
    planeta.style.transform = 'none';

    // Limpar o registro
    const posicao = parseInt(slot.dataset.posicao);
    slotsPreenchidos[posicao - 1] = null;
}

// Cronômetro
function iniciarCronometro() {
    tempoInicio = Date.now();
    cronometroInterval = setInterval(atualizarCronometro, 100);
}

function pararCronometro() {
    if (cronometroInterval) {
        clearInterval(cronometroInterval);
        cronometroInterval = null;
    }
}

function atualizarCronometro() {
    const tempoDecorrido = Math.floor((Date.now() - tempoInicio) / 1000);
    const minutos = Math.floor(tempoDecorrido / 60);
    const segundos = tempoDecorrido % 60;
    document.getElementById('cronometro').textContent =
        `⏱️ ${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function obterTempoFinal() {
    return Math.floor((Date.now() - tempoInicio) / 1000);
}

// Verificar Vitória
function verificarVitoria() {
    // Verificar se todos os slots estão preenchidos
    if (slotsPreenchidos.includes(null)) {
        return;
    }

    // Verificar se todos estão corretos
    const todosCorretos = slotsPreenchidos.every((id, index) => id === index + 1);

    if (todosCorretos) {
        jogoAtivo = false;
        pararCronometro();

        const tempoFinal = obterTempoFinal();

        // Mostrar tela de vitória
        setTimeout(() => {
            mostrarTelaVitoria(tempoFinal);
        }, 500);
    }
}

function mostrarTelaVitoria(tempoFinal) {
    const minutos = Math.floor(tempoFinal / 60);
    const segundos = tempoFinal % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

    document.getElementById('tempoFinal').textContent = tempoFormatado;
    document.getElementById('errosFinal').textContent = erros;

    // Verificar se completou o challenge
    const challenge = challenges.find(c => c.id === challengeAtual);
    let mensagem = '';

    if (challenge.verificar(tempoFinal, erros)) {
        mensagem = `✨ Challenge "${challenge.nome}" completado! ✨`;
        marcarChallengeCompleto(challengeAtual);
    }

    document.getElementById('mensagemChallenge').textContent = mensagem;

    mostrarTela('telaVitoria');
}

// Sistema de Ranking (Permanente e Temporário)
let tipoRankingAtual = 'permanente';

function salvarRanking() {
    const nome = document.getElementById('nomeJogador').value.trim();

    if (!nome) {
        alert('Por favor, digite seu nome!');
        return;
    }

    const tempoFinal = obterTempoFinal();

    const novoRegistro = {
        nome: nome,
        tempo: tempoFinal,
        erros: erros,
        challenge: challengeAtual,
        data: new Date().toISOString()
    };

    // Salvar em ambos os rankings
    salvarEmRanking('permanente', novoRegistro);
    salvarEmRanking('temporario', novoRegistro);

    alert('Pontuação salva no ranking!');
    mostrarRanking();
}

function salvarEmRanking(tipo, registro) {
    const chave = tipo === 'permanente' ? 'rankingSolarPermanente' : 'rankingSolarTemporario';
    const ranking = carregarRanking(tipo);

    ranking.push(registro);

    // Ordenar por tempo (menor primeiro)
    ranking.sort((a, b) => a.tempo - b.tempo);

    // Manter apenas os 50 melhores
    const rankingLimitado = ranking.slice(0, 50);

    localStorage.setItem(chave, JSON.stringify(rankingLimitado));
}

function carregarRanking(tipo = tipoRankingAtual) {
    const chave = tipo === 'permanente' ? 'rankingSolarPermanente' : 'rankingSolarTemporario';
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

function alternarTipoRanking(tipo) {
    tipoRankingAtual = tipo;

    // Atualizar botões ativos
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');

    // Mostrar/Ocultar botão limpar
    const btnLimpar = document.getElementById('btnLimparContainer');
    if (tipo === 'temporario') {
        btnLimpar.style.display = 'block';
    } else {
        btnLimpar.style.display = 'none';
    }

    // Resetar filtro e mostrar ranking
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('ativo');
    });
    document.querySelector('.btn-filtro').classList.add('ativo');

    mostrarRanking('todos');
}

function limparRankingTemporario() {
    if (confirm('Tem certeza que deseja limpar todo o ranking temporário? Esta ação não pode ser desfeita!')) {
        localStorage.removeItem('rankingSolarTemporario');
        alert('Ranking temporário limpo com sucesso!');
        mostrarRanking('todos');
    }
}

function mostrarRanking(filtro = 'todos') {
    mostrarTela('telaRanking');

    let ranking = carregarRanking(tipoRankingAtual);

    // Filtrar por challenge
    if (filtro !== 'todos') {
        ranking = ranking.filter(r => r.challenge === filtro);
    }

    const container = document.getElementById('listaRanking');

    if (ranking.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px;">Nenhum registro ainda. Seja o primeiro!</p>';
        return;
    }

    container.innerHTML = ranking.map((registro, index) => {
        const minutos = Math.floor(registro.tempo / 60);
        const segundos = registro.tempo % 60;
        const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

        let classeTop = '';
        let medalha = `${index + 1}º`;

        if (index === 0) {
            classeTop = 'top1';
            medalha = '🥇';
        } else if (index === 1) {
            classeTop = 'top2';
            medalha = '🥈';
        } else if (index === 2) {
            classeTop = 'top3';
            medalha = '🥉';
        }

        const challenge = challenges.find(c => c.id === registro.challenge);

        return `
            <div class="item-ranking ${classeTop}">
                <span class="ranking-posicao">${medalha}</span>
                <div class="ranking-info">
                    <div class="ranking-nome">${registro.nome}</div>
                    <div class="ranking-challenge">${challenge ? challenge.nome : 'Clássico'} - ${registro.erros} erros</div>
                </div>
                <span class="ranking-tempo">${tempoFormatado}</span>
            </div>
        `;
    }).join('');
}

function filtrarRanking(filtro) {
    // Atualizar botões ativos
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');

    mostrarRanking(filtro);
}

// Sistema de Challenges
function carregarChallenges() {
    const dados = localStorage.getItem('challengesSolar');
    return dados ? JSON.parse(dados) : {
        classico: false,
        velocista: false,
        precisao: false,
        memoria: false,
        mestre: false
    };
}

function salvarChallenges(stats) {
    localStorage.setItem('challengesSolar', JSON.stringify(stats));
}

function marcarChallengeCompleto(challengeId) {
    const stats = carregarChallenges();
    stats[challengeId] = true;
    salvarChallenges(stats);

    // Desbloquear próximos challenges
    desbloquearChallenges();
}

function desbloquearChallenges() {
    const stats = carregarChallenges();

    // Velocista e Precisão desbloqueiam após Clássico
    if (stats.classico) {
        challenges.find(c => c.id === 'velocista').desbloqueado = true;
        challenges.find(c => c.id === 'precisao').desbloqueado = true;
    }

    // Memória desbloqueia após Velocista
    if (stats.velocista) {
        challenges.find(c => c.id === 'memoria').desbloqueado = true;
    }

    // Mestre desbloqueia após todos os outros
    if (stats.classico && stats.velocista && stats.precisao && stats.memoria) {
        challenges.find(c => c.id === 'mestre').desbloqueado = true;
    }

    // Marcar challenges como completos
    Object.keys(stats).forEach(id => {
        const challenge = challenges.find(c => c.id === id);
        if (challenge) {
            challenge.completo = stats[id];
        }
    });
}

function mostrarChallenges() {
    mostrarTela('telaChallenges');
    desbloquearChallenges();

    const container = document.getElementById('challengesGrid');

    container.innerHTML = challenges.map(challenge => {
        let statusTexto = '';
        let statusClasse = '';
        let cadeado = '';
        let cardClasse = '';

        if (challenge.completo) {
            statusTexto = '✅ Completo';
            statusClasse = 'completo';
            cardClasse = 'completo';
        } else if (challenge.desbloqueado) {
            statusTexto = '🎮 Jogar';
            statusClasse = 'desbloqueado';
        } else {
            statusTexto = '🔒 Bloqueado';
            statusClasse = 'bloqueado';
            cardClasse = 'bloqueado';
            cadeado = '<span class="cadeado">🔒</span>';
        }

        const onclick = challenge.desbloqueado && !challenge.completo ?
            `onclick="iniciarJogo('${challenge.id}')"` : '';

        return `
            <div class="challenge-card ${cardClasse}" ${onclick}>
                ${cadeado}
                <div class="challenge-icone">${challenge.icone}</div>
                <div class="challenge-nome">${challenge.nome}</div>
                <div class="challenge-descricao">${challenge.descricao}</div>
                <div class="challenge-status ${statusClasse}">${statusTexto}</div>
            </div>
        `;
    }).join('');
}

function jogarNovamente() {
    iniciarJogo(challengeAtual);
}

// Inicialização
desbloquearChallenges();
