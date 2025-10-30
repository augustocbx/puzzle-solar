// Dados dos Planetas
const planetas = [
    { id: 1, nome: 'Mercúrio', classe: 'mercurio', tamanho: 'pequeno' },
    { id: 2, nome: 'Vênus', classe: 'venus', tamanho: 'pequeno' },
    { id: 3, nome: 'Terra', classe: 'terra', tamanho: 'pequeno' },
    { id: 4, nome: 'Marte', classe: 'marte', tamanho: 'pequeno' },
    { id: 5, nome: 'Júpiter', classe: 'jupiter', tamanho: 'grande' },
    { id: 6, nome: 'Saturno', classe: 'saturno', tamanho: 'grande' },
    { id: 7, nome: 'Urano', classe: 'urano', tamanho: 'medio' },
    { id: 8, nome: 'Netuno', classe: 'netuno', tamanho: 'medio' }
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

// Sistema de Badges
const badges = [
    // Badges de Iniciante
    {
        id: 'primeira-vitoria',
        nome: 'Primeira Vitória',
        descricao: 'Complete o puzzle pela primeira vez',
        icone: '🌟',
        categoria: 'iniciante',
        verificar: (stats) => stats.jogosCompletos >= 1
    },
    {
        id: 'explorador',
        nome: 'Explorador Espacial',
        descricao: 'Jogue 5 partidas completas',
        icone: '🚀',
        categoria: 'iniciante',
        verificar: (stats) => stats.jogosCompletos >= 5
    },
    {
        id: 'persistente',
        nome: 'Persistente',
        descricao: 'Jogue 10 partidas completas',
        icone: '💪',
        categoria: 'iniciante',
        verificar: (stats) => stats.jogosCompletos >= 10
    },
    // Badges de Velocidade
    {
        id: 'rapido',
        nome: 'Relâmpago',
        descricao: 'Complete em menos de 1 minuto',
        icone: '⚡',
        categoria: 'velocidade',
        verificar: (stats) => stats.melhorTempo > 0 && stats.melhorTempo < 60
    },
    {
        id: 'super-rapido',
        nome: 'Supersônico',
        descricao: 'Complete em menos de 45 segundos',
        icone: '💨',
        categoria: 'velocidade',
        verificar: (stats) => stats.melhorTempo > 0 && stats.melhorTempo < 45
    },
    {
        id: 'luz',
        nome: 'Velocidade da Luz',
        descricao: 'Complete em menos de 30 segundos',
        icone: '✨',
        categoria: 'velocidade',
        verificar: (stats) => stats.melhorTempo > 0 && stats.melhorTempo < 30
    },
    // Badges de Precisão
    {
        id: 'perfeito',
        nome: 'Perfeição',
        descricao: 'Complete sem erros',
        icone: '🎯',
        categoria: 'precisao',
        verificar: (stats) => stats.zerarErros >= 1
    },
    {
        id: 'cirurgiao',
        nome: 'Cirurgião Espacial',
        descricao: 'Complete 5 vezes sem erros',
        icone: '💎',
        categoria: 'precisao',
        verificar: (stats) => stats.zerarErros >= 5
    },
    {
        id: 'infalivel',
        nome: 'Infalível',
        descricao: 'Complete 10 vezes sem erros',
        icone: '👑',
        categoria: 'precisao',
        verificar: (stats) => stats.zerarErros >= 10
    },
    // Badges de Pontuação
    {
        id: 'milhares',
        nome: 'Milhares',
        descricao: 'Alcance 11.000 pontos',
        icone: '⭐',
        categoria: 'pontuacao',
        verificar: (stats) => stats.melhorPontuacao >= 11000
    },
    {
        id: 'elite',
        nome: 'Elite',
        descricao: 'Alcance 12.000 pontos',
        icone: '🌠',
        categoria: 'pontuacao',
        verificar: (stats) => stats.melhorPontuacao >= 12000
    },
    {
        id: 'lendario',
        nome: 'Lendário',
        descricao: 'Alcance 13.000 pontos (pontuação máxima)',
        icone: '🏆',
        categoria: 'pontuacao',
        verificar: (stats) => stats.melhorPontuacao >= 13000
    },
    // Badges de Dedicação
    {
        id: 'dedicado',
        nome: 'Dedicado',
        descricao: 'Jogue 25 partidas',
        icone: '🎮',
        categoria: 'dedicacao',
        verificar: (stats) => stats.totalPartidas >= 25
    },
    {
        id: 'viciado',
        nome: 'Viciado Espacial',
        descricao: 'Jogue 50 partidas',
        icone: '🎪',
        categoria: 'dedicacao',
        verificar: (stats) => stats.totalPartidas >= 50
    },
    {
        id: 'astronomo',
        nome: 'Astrônomo Profissional',
        descricao: 'Jogue 100 partidas',
        icone: '🔭',
        categoria: 'dedicacao',
        verificar: (stats) => stats.totalPartidas >= 100
    },
    // Badges Especiais
    {
        id: 'todos-challenges',
        nome: 'Mestre dos Desafios',
        descricao: 'Complete todos os challenges',
        icone: '🎖️',
        categoria: 'especial',
        verificar: (stats) => {
            const challengeStats = carregarChallenges();
            return challengeStats.classico && challengeStats.velocista &&
                   challengeStats.precisao && challengeStats.memoria && challengeStats.mestre;
        }
    },
    {
        id: 'top-ranking',
        nome: 'Top do Ranking',
        descricao: 'Alcance o 1º lugar no ranking',
        icone: '🥇',
        categoria: 'especial',
        verificar: (stats) => stats.primeiroLugar >= 1
    },
    {
        id: 'todos-badges',
        nome: 'Colecionador',
        descricao: 'Desbloqueie todos os badges',
        icone: '🌌',
        categoria: 'especial',
        verificar: (stats) => {
            const badgesDesbloqueados = carregarBadgesGlobais();
            const totalBadges = badges.filter(b => b.id !== 'todos-badges').length;
            const desbloqueados = Object.keys(badgesDesbloqueados).length;
            return desbloqueados >= totalBadges;
        }
    }
];

// Lista de Nomes Espaciais Aleatórios
const nomesEspaciais = [
    'Armstrong', 'Aldrin', 'Gagarin', 'Tereshkova', 'Shepard', 'Glenn', 'Collins', 'Lovell',
    'Cernan', 'Duke', 'Bean', 'Conrad', 'Scott', 'Irwin', 'Young', 'Mitchell',
    'Hubble', 'Sagan', 'Hawking', 'Einstein', 'Newton', 'Galileu', 'Kepler', 'Copérnico',
    'Tycho', 'Halley', 'Herschel', 'Lowell', 'Cassini', 'Huygens', 'Voyager', 'Pioneer',
    'Apollo', 'Gemini', 'Mercury', 'Skylab', 'Soyuz', 'Orion', 'Artemis', 'Discovery',
    'Endeavour', 'Atlantis', 'Columbia', 'Challenger', 'Enterprise', 'Pathfinder', 'Spirit', 'Opportunity',
    'Curiosity', 'Perseverance', 'Ingenuity', 'Juno', 'Cassini', 'Galileo', 'Magellan', 'Viking',
    'Nebulosa', 'Quasar', 'Pulsar', 'Supernova', 'Cosmos', 'Astro', 'Stellar', 'Lunar',
    'Solar', 'Estelar', 'Orbital', 'Galático', 'Sirius', 'Vega', 'Altair', 'Deneb',
    'Rigel', 'Betelgeuse', 'Antares', 'Polaris', 'Arcturus', 'Aldebaran', 'Spica', 'Regulus',
    'Andrômeda', 'Orion', 'Cassiopeia', 'Pegasus', 'Lyra', 'Aquila', 'Cygnus', 'Phoenix',
    'Draco', 'Centaurus', 'Hydra', 'Perseus', 'Auriga', 'Bootes', 'Corvus', 'Crater',
    'Kosmos', 'Astral', 'Celeste', 'Zenith'
];

// Variáveis do Jogo
let jogoAtivo = false;
let tempoInicio = 0;
let cronometroInterval = null;
let erros = 0;
let pontos = 0;
let acertos = 0;
let challengeAtual = 'classico';
let planetasEmbaralhados = [];
let slotsPreenchidos = new Array(8).fill(null);

// Mensagens Motivacionais
const mensagensMotivacionais = [
    '🌟 Ótimo trabalho!',
    '⭐ Incrível!',
    '🎯 Perfeito!',
    '✨ Você é um gênio espacial!',
    '🚀 Excelente!',
    '💫 Mandou bem!',
    '🌠 Fantástico!',
    '🎉 Isso aí!'
];

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
    pontos = 0;
    acertos = 0;
    slotsPreenchidos = new Array(8).fill(null);
    jogoAtivo = true;

    mostrarTela('telaJogo');

    // Atualizar header
    const challenge = challenges.find(c => c.id === challengeId);
    document.getElementById('challengeAtual').textContent = challenge.nome;
    document.getElementById('tentativas').textContent = `❌ Erros: 0`;
    document.getElementById('pontos').textContent = `⭐ 0 pontos`;

    // Resetar progresso
    atualizarProgresso();

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

    // Adicionar eventos de drop na área de planetas
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        container.classList.add('drag-over-area');
    });

    container.addEventListener('dragleave', () => {
        container.classList.remove('drag-over-area');
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        container.classList.remove('drag-over-area');

        if (!planetaArrastado) return;

        // Se o planeta está vindo de um slot, removê-lo
        if (slotOrigem) {
            const posicaoOrigem = parseInt(slotOrigem.dataset.posicao);
            const planetaIdOrigem = slotsPreenchidos[posicaoOrigem - 1];

            // Se estava correto, descontar pontos e acertos
            if (planetaIdOrigem === posicaoOrigem) {
                acertos--;
                pontos = Math.max(0, pontos - 50);
                document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;
            }

            // Limpar o slot
            slotsPreenchidos[posicaoOrigem - 1] = null;

            // Devolver para a área de planetas
            devolverPlaneta(planetaArrastado);

            // Atualizar progresso
            atualizarProgresso();

            planetaArrastado = null;
            slotOrigem = null;
        }
    });

    planetasEmbaralhados.forEach((planeta, index) => {
        const div = document.createElement('div');
        div.className = `planeta ${planeta.classe} ${planeta.tamanho}`;
        div.draggable = true;
        div.dataset.planetaId = planeta.id;

        // Usar SVG do planeta
        div.innerHTML = `
            <div class="planeta-visual">
                ${planetasSVG[planeta.classe]}
            </div>
            <span class="planeta-nome">${planeta.nome}</span>
        `;

        // Eventos de arrastar (desktop)
        div.addEventListener('dragstart', arrastarInicio);
        div.addEventListener('dragend', arrastarFim);

        // Eventos de touch (mobile)
        div.addEventListener('touchstart', touchInicio, { passive: false });
        div.addEventListener('touchmove', touchMover, { passive: false });
        div.addEventListener('touchend', touchFim, { passive: false });

        container.appendChild(div);
    });
}

// Criar Slots com Órbitas Circulares Concêntricas
function criarSlots() {
    const container = document.getElementById('orbitasContainer');
    container.innerHTML = '';

    // Raios das órbitas (do Sol para fora)
    const raios = [60, 90, 120, 150, 190, 230, 270, 310];

    // Ângulos iniciais variados para cada órbita (em graus)
    const angulosIniciais = [0, 45, 120, 200, 280, 330, 90, 170];

    // Criar órbitas com slots dentro
    for (let i = 0; i < 8; i++) {
        const orbita = document.createElement('div');
        orbita.className = `orbita orbita-${i + 1}`;
        orbita.style.width = `${raios[i] * 2}px`;
        orbita.style.height = `${raios[i] * 2}px`;

        // Aplicar rotação inicial para posicionar o slot
        orbita.style.setProperty('--angulo-inicial', `${angulosIniciais[i]}deg`);

        // Criar slot para esta órbita
        const slot = document.createElement('div');
        slot.className = 'slot slot-orbital';
        slot.dataset.posicao = i + 1;

        // Posicionar o slot no topo da órbita (a rotação da órbita vai movê-lo)
        slot.style.left = '50%';
        slot.style.top = '0';

        // SEM nome do planeta - apenas o número
        slot.innerHTML = `
            <span class="slot-numero">${i + 1}º</span>
        `;

        // Eventos de drop
        slot.addEventListener('dragover', arrastarSobre);
        slot.addEventListener('dragleave', arrastarSair);
        slot.addEventListener('drop', soltar);
        slot.addEventListener('click', removerPlanetaDoSlot);

        // Adicionar slot dentro da órbita
        orbita.appendChild(slot);
        container.appendChild(orbita);
    }
}

// Sistema de Drag and Drop
let planetaArrastado = null;
let slotOrigem = null;

function arrastarInicio(e) {
    planetaArrastado = e.target.closest('.planeta');
    planetaArrastado.style.opacity = '0.5';

    // Verificar se o planeta está em um slot
    slotOrigem = planetaArrastado.closest('.slot');
}

function arrastarFim(e) {
    if (planetaArrastado) {
        planetaArrastado.style.opacity = '1';
    }
    slotOrigem = null;
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

    const posicaoDestino = parseInt(slot.dataset.posicao);
    const planetaId = parseInt(planetaArrastado.dataset.planetaId);

    // Limpar pontuação e acerto da posição de origem se o planeta estava correto
    if (slotOrigem) {
        const posicaoOrigem = parseInt(slotOrigem.dataset.posicao);
        const planetaIdOrigem = slotsPreenchidos[posicaoOrigem - 1];
        if (planetaIdOrigem === posicaoOrigem) {
            acertos--;
            pontos = Math.max(0, pontos - 100);
        }
        slotsPreenchidos[posicaoOrigem - 1] = null;
    }

    // Se o slot de destino já está ocupado E estamos vindo de outro slot, fazer SWAP
    const planetaExistente = slot.querySelector('.planeta');
    if (planetaExistente && slotOrigem) {
        // SWAP: Trocar os planetas de lugar
        const planetaIdDestino = parseInt(planetaExistente.dataset.planetaId);

        // Limpar pontuação e acerto da posição de destino se o planeta estava correto
        if (planetaIdDestino === posicaoDestino) {
            acertos--;
            pontos = Math.max(0, pontos - 100);
        }

        // Mover planeta existente para o slot de origem
        slotOrigem.appendChild(planetaExistente);
        const posicaoOrigem = parseInt(slotOrigem.dataset.posicao);
        slotsPreenchidos[posicaoOrigem - 1] = planetaIdDestino;

        // Verificar se o planeta movido para origem ficou correto
        if (planetaIdDestino === posicaoOrigem) {
            slotOrigem.classList.add('correto');
            setTimeout(() => slotOrigem.classList.remove('correto'), 500);
            acertos++;
            pontos += 100;
            mostrarMensagemMotivacional();
            criarParticulas(slotOrigem);
        }
    } else if (planetaExistente) {
        // Se estamos vindo da área de planetas, apenas devolver o existente
        devolverPlaneta(planetaExistente);
    }

    // Mover planeta arrastado para o slot de destino
    slot.appendChild(planetaArrastado);
    planetaArrastado.style.opacity = '1';
    planetaArrastado.draggable = true;

    // Registrar no array
    slotsPreenchidos[posicaoDestino - 1] = planetaId;

    // Verificar se está correto
    if (planetaId === posicaoDestino) {
        slot.classList.add('correto');
        setTimeout(() => slot.classList.remove('correto'), 500);

        // Acertou!
        acertos++;
        pontos += 100;
        document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;

        // Mostrar mensagem motivacional
        mostrarMensagemMotivacional();

        // Criar partículas de celebração
        criarParticulas(slot);

        // Atualizar progresso
        atualizarProgresso();
    } else {
        slot.classList.add('incorreto');
        erros++;
        pontos = Math.max(0, pontos - 20);
        document.getElementById('tentativas').textContent = `❌ Erros: ${erros}`;
        document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;
        setTimeout(() => slot.classList.remove('incorreto'), 500);
    }

    // Atualizar pontos exibidos
    document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;

    planetaArrastado = null;
    slotOrigem = null;

    // Verificar vitória
    verificarVitoria();
}

// Função auxiliar para devolver planeta
function devolverPlaneta(planeta) {
    const containerPlanetas = document.getElementById('planetasContainer');
    containerPlanetas.appendChild(planeta);
    planeta.draggable = true;
}

// Mostrar Mensagem Motivacional
function mostrarMensagemMotivacional() {
    const mensagem = mensagensMotivacionais[Math.floor(Math.random() * mensagensMotivacionais.length)];
    const elemento = document.getElementById('mensagemMotivacional');
    elemento.textContent = mensagem;

    // Remover após 2 segundos
    setTimeout(() => {
        elemento.textContent = '';
    }, 2000);
}

// Criar Partículas de Celebração
function criarParticulas(elemento) {
    const rect = elemento.getBoundingClientRect();
    const particulas = ['✨', '⭐', '🌟', '💫', '🎉'];

    for (let i = 0; i < 5; i++) {
        const particula = document.createElement('div');
        particula.textContent = particulas[Math.floor(Math.random() * particulas.length)];
        particula.style.position = 'fixed';
        particula.style.left = rect.left + rect.width / 2 + 'px';
        particula.style.top = rect.top + rect.height / 2 + 'px';
        particula.style.fontSize = '2em';
        particula.style.pointerEvents = 'none';
        particula.style.zIndex = '9999';
        particula.style.transition = 'all 1s ease-out';

        document.body.appendChild(particula);

        // Animar
        setTimeout(() => {
            const angulo = (Math.PI * 2 * i) / 5;
            const distancia = 100;
            particula.style.transform = `translate(${Math.cos(angulo) * distancia}px, ${Math.sin(angulo) * distancia}px)`;
            particula.style.opacity = '0';
        }, 10);

        // Remover após animação
        setTimeout(() => {
            document.body.removeChild(particula);
        }, 1000);
    }
}

// Atualizar Progresso
function atualizarProgresso() {
    const total = 8;
    const corretos = slotsPreenchidos.filter((id, index) => id === index + 1).length;
    const percentual = (corretos / total) * 100;

    document.getElementById('progressoTexto').textContent = `${corretos}/${total}`;
    document.getElementById('progressoPreenchimento').style.width = `${percentual}%`;
}

// Remover Planeta do Slot (clique no slot)
function removerPlanetaDoSlot(e) {
    // Só remover se clicar no slot, não no planeta
    if (e.target.closest('.planeta')) return;

    const slot = e.target.closest('.slot');
    if (!slot) return;

    const planeta = slot.querySelector('.planeta');
    if (!planeta) return;

    // Devolver para a área de planetas
    devolverPlaneta(planeta);

    // Limpar o registro
    const posicao = parseInt(slot.dataset.posicao);
    const planetaId = slotsPreenchidos[posicao - 1];

    // Se era correto, descontar pontos e acertos
    if (planetaId === posicao) {
        acertos--;
        pontos = Math.max(0, pontos - 50);
        document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;
    }

    slotsPreenchidos[posicao - 1] = null;

    // Atualizar progresso
    atualizarProgresso();
}

// Limpar todas as órbitas
function limparOrbitas() {
    const slots = document.querySelectorAll('.slot');

    slots.forEach((slot, index) => {
        const planeta = slot.querySelector('.planeta');
        if (planeta) {
            // Devolver para a área de planetas
            devolverPlaneta(planeta);

            // Se era correto, descontar pontos e acertos
            const posicao = index + 1;
            const planetaId = slotsPreenchidos[posicao - 1];
            if (planetaId === posicao) {
                acertos--;
                pontos = Math.max(0, pontos - 50);
            }
        }
    });

    // Limpar todos os registros
    slotsPreenchidos = new Array(8).fill(null);

    // Atualizar interface
    document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;
    atualizarProgresso();
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

    // Pontos base por completar o jogo: 10.000 pontos
    pontos = 10000;

    // Bônus de tempo: quanto mais rápido, mais pontos (até 2000)
    const bonusTempo = Math.max(0, Math.min(2000, Math.floor((300 - tempoFinal) * 10)));
    pontos += bonusTempo;

    // Bônus de precisão: sem erros ganha bônus (1000 pontos)
    if (erros === 0) {
        pontos += 1000;
    } else {
        // Penalidade por erros: -50 pontos por erro
        pontos = Math.max(10000, pontos - (erros * 50));
    }

    document.getElementById('tempoFinal').textContent = tempoFormatado;
    document.getElementById('errosFinal').textContent = erros;
    document.getElementById('pontosFinal').textContent = pontos;

    // Verificar se completou o challenge
    const challenge = challenges.find(c => c.id === challengeAtual);
    let mensagem = '';

    if (challenge.verificar(tempoFinal, erros)) {
        mensagem = `✨ Challenge "${challenge.nome}" completado! ✨`;
        marcarChallengeCompleto(challengeAtual);
    }

    document.getElementById('mensagemChallenge').textContent = mensagem;

    // Limpar campo de nome para novo jogo
    document.getElementById('nomeJogador').value = '';

    mostrarTela('telaVitoria');
}

// Função para desistir do jogo
function desistirJogo() {
    if (!confirm('Deseja realmente desistir e salvar sua pontuação parcial?')) {
        return;
    }

    jogoAtivo = false;
    pararCronometro();

    const tempoFinal = obterTempoFinal();
    const minutos = Math.floor(tempoFinal / 60);
    const segundos = tempoFinal % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

    // Calcular pontos parciais baseado no progresso
    const planetasCorretos = slotsPreenchidos.filter((id, index) => id === index + 1).length;
    pontos = planetasCorretos * 500; // 500 pontos por planeta correto (max 4000 se colocar 8)

    // Bônus de precisão parcial
    if (erros === 0 && planetasCorretos > 0) {
        pontos += 200;
    }

    document.getElementById('tempoFinal').textContent = tempoFormatado;
    document.getElementById('errosFinal').textContent = erros;
    document.getElementById('pontosFinal').textContent = pontos;
    document.getElementById('mensagemChallenge').textContent = `⚠️ Jogo incompleto: ${planetasCorretos}/8 planetas corretos`;

    // Limpar campo de nome para novo jogo
    document.getElementById('nomeJogador').value = '';

    mostrarTela('telaVitoria');
}

// Sistema de Ranking (Permanente e Temporário)
let tipoRankingAtual = 'temporario'; // Temporário é o padrão

function salvarRanking() {
    const nome = document.getElementById('nomeJogador').value.trim();

    if (!nome) {
        alert('Por favor, digite seu nome!');
        return;
    }

    const tempoFinal = obterTempoFinal();
    const completou = slotsPreenchidos.every((id, index) => id === index + 1);

    const novoRegistro = {
        nome: nome,
        tempo: tempoFinal,
        erros: erros,
        pontos: pontos,
        completou: completou,
        planetasCorretos: slotsPreenchidos.filter((id, index) => id === index + 1).length,
        challenge: challengeAtual,
        data: new Date().toISOString()
    };

    // Salvar em ambos os rankings
    salvarEmRanking('permanente', novoRegistro);
    salvarEmRanking('temporario', novoRegistro);

    // Atualizar estatísticas do jogador
    atualizarEstatisticas(tempoFinal, pontos, erros, completou);

    // Verificar se está em primeiro lugar (para badge)
    const ranking = carregarRanking('permanente');
    if (ranking.length > 0 && ranking[0].nome === nome) {
        const stats = carregarEstatisticasJogador();
        stats.primeiroLugar = 1;
        localStorage.setItem('estatisticasSolar', JSON.stringify(stats));
    }

    // Verificar e desbloquear badges
    const badgesNovos = verificarBadges(nome);

    // Mostrar notificações de badges desbloqueados
    if (badgesNovos.length > 0) {
        let delay = 500;
        badgesNovos.forEach((badge, index) => {
            setTimeout(() => {
                mostrarNotificacaoBadge(badge);
            }, delay + (index * 4500)); // 4500ms entre cada badge (4s de exibição + 500ms de intervalo)
        });
    }

    alert('Pontuação salva no ranking!');
    mostrarRanking();
}

function salvarEmRanking(tipo, registro) {
    const chave = tipo === 'permanente' ? 'rankingSolarPermanente' : 'rankingSolarTemporario';
    const ranking = carregarRanking(tipo);

    ranking.push(registro);

    // Ordenação PRIORITÁRIA:
    // 1. Quem completou SEMPRE fica na frente de quem não completou
    // 2. Entre quem completou: ordenar por tempo (mais rápido primeiro)
    // 3. Entre quem não completou: ordenar por pontos (mais pontos primeiro)
    ranking.sort((a, b) => {
        // Prioridade 1: Completou ou não?
        const aCompletou = a.completou !== undefined ? a.completou : true; // Compatibilidade com registros antigos
        const bCompletou = b.completou !== undefined ? b.completou : true;

        if (aCompletou && !bCompletou) return -1; // A completou, B não = A vem primeiro
        if (!aCompletou && bCompletou) return 1;  // B completou, A não = B vem primeiro

        // Prioridade 2: Se ambos completaram ou ambos não completaram
        if (aCompletou && bCompletou) {
            // Ambos completaram: ordenar por tempo (menor é melhor)
            return a.tempo - b.tempo;
        } else {
            // Ambos não completaram: ordenar por pontos (maior é melhor)
            return (b.pontos || 0) - (a.pontos || 0);
        }
    });

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

        const completou = registro.completou !== undefined ? registro.completou : true;
        const planetasCorretos = registro.planetasCorretos || 8;

        let classeTop = '';
        let medalha = `${index + 1}º`;

        // Medalhas apenas para quem completou
        if (completou) {
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
        }

        const challenge = challenges.find(c => c.id === registro.challenge);
        const statusCompleto = completou ?
            `✅ Completo - ${registro.erros} erros` :
            `⚠️ Incompleto (${planetasCorretos}/8) - ${registro.pontos || 0} pts`;

        // Adicionar classe para jogos incompletos
        const classeIncompleto = !completou ? 'incompleto' : '';

        return `
            <div class="item-ranking ${classeTop} ${classeIncompleto}" onclick='mostrarDetalhesRanking(${JSON.stringify(registro)}, ${index + 1}, "${medalha}")' style="cursor: pointer;">
                <span class="ranking-posicao">${medalha}</span>
                <div class="ranking-info">
                    <div class="ranking-nome">${registro.nome}</div>
                    <div class="ranking-challenge">${challenge ? challenge.nome : 'Clássico'} - ${statusCompleto}</div>
                </div>
                <span class="ranking-tempo">${tempoFormatado}</span>
            </div>
        `;
    }).join('');
}

// Mostrar Detalhes do Ranking em Modal
function mostrarDetalhesRanking(registro, posicao, medalha) {
    const minutos = Math.floor(registro.tempo / 60);
    const segundos = registro.tempo % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

    const completou = registro.completou !== undefined ? registro.completou : true;
    const planetasCorretos = registro.planetasCorretos || 8;

    const challenge = challenges.find(c => c.id === registro.challenge);
    const challengeNome = challenge ? challenge.nome : 'Modo Clássico';
    const challengeIcone = challenge ? challenge.icone : '🌟';

    // Formatar data em português brasileiro
    const data = new Date(registro.data);
    const dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const horaFormatada = data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Calcular estatísticas extras
    const tempoPorPlaneta = completou ? (registro.tempo / 8).toFixed(1) :
                           planetasCorretos > 0 ? (registro.tempo / planetasCorretos).toFixed(1) : '0';
    const taxaAcerto = completou ? '100%' : `${((planetasCorretos / 8) * 100).toFixed(1)}%`;
    const precisao = planetasCorretos > 0 ?
                     `${((planetasCorretos / (planetasCorretos + registro.erros)) * 100).toFixed(1)}%` : '0%';

    // Calcular bônus (se completo)
    let bonusInfo = '';
    if (completou) {
        const bonusTempo = Math.max(0, Math.min(2000, Math.floor((300 - registro.tempo) * 10)));
        const bonusPrecisao = registro.erros === 0 ? 1000 : 0;
        bonusInfo = `
            <div class="info-extra-item">
                <span class="info-extra-label">⚡ Bônus de Tempo</span>
                <span class="info-extra-valor">+${bonusTempo} pts</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">🎯 Bônus de Precisão</span>
                <span class="info-extra-valor">+${bonusPrecisao} pts</span>
            </div>
        `;
    }

    const statusClass = completou ? 'completo' : 'incompleto';
    const statusTexto = completou ? '✅ Jogo Completo' : `⚠️ Jogo Incompleto (${planetasCorretos}/8)`;

    const conteudo = `
        <div class="detalhes-header">
            <div class="detalhes-medalha">${medalha}</div>
            <div class="detalhes-nome">${registro.nome}</div>
            <div class="detalhes-challenge">${challengeIcone} ${challengeNome}</div>
            <div class="detalhes-status ${statusClass}">${statusTexto}</div>
        </div>

        <div class="detalhes-grid">
            <div class="detalhe-item">
                <div class="detalhe-icone">⏱️</div>
                <div class="detalhe-label">Tempo Total</div>
                <div class="detalhe-valor">${tempoFormatado}</div>
            </div>

            <div class="detalhe-item">
                <div class="detalhe-icone">⭐</div>
                <div class="detalhe-label">Pontuação</div>
                <div class="detalhe-valor">${registro.pontos || 0}</div>
            </div>

            <div class="detalhe-item">
                <div class="detalhe-icone">❌</div>
                <div class="detalhe-label">Erros</div>
                <div class="detalhe-valor">${registro.erros}</div>
            </div>

            <div class="detalhe-item">
                <div class="detalhe-icone">🪐</div>
                <div class="detalhe-label">Planetas Corretos</div>
                <div class="detalhe-valor">${planetasCorretos}/8</div>
            </div>
        </div>

        <div class="detalhes-info-extra">
            <div class="info-extra-item">
                <span class="info-extra-label">📅 Data</span>
                <span class="info-extra-valor">${dataFormatada}</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">🕐 Horário</span>
                <span class="info-extra-valor">${horaFormatada}</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">📊 Posição no Ranking</span>
                <span class="info-extra-valor">${posicao}º lugar</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">⏲️ Tempo por Planeta</span>
                <span class="info-extra-valor">${tempoPorPlaneta}s</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">✓ Taxa de Acerto</span>
                <span class="info-extra-valor">${taxaAcerto}</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">🎯 Precisão</span>
                <span class="info-extra-valor">${precisao}</span>
            </div>
            ${bonusInfo}
        </div>
    `;

    document.getElementById('conteudoModalDetalhes').innerHTML = conteudo;
    document.getElementById('modalDetalhesRanking').classList.add('ativo');
}

// Fechar Modal de Detalhes
function fecharModalDetalhes(event) {
    // Se clicar no overlay ou no botão fechar
    if (!event || event.target.id === 'modalDetalhesRanking' || event.target.classList.contains('btn-fechar-modal')) {
        document.getElementById('modalDetalhesRanking').classList.remove('ativo');
    }
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

// Suporte a Touch (Mobile)
let touchPlaneta = null;
let touchClone = null;
let touchSlotOrigem = null;

function touchInicio(e) {
    e.preventDefault();
    touchPlaneta = e.target.closest('.planeta');
    if (!touchPlaneta) return;

    // Verificar se o planeta está em um slot
    touchSlotOrigem = touchPlaneta.closest('.slot');

    // Criar clone visual
    touchClone = touchPlaneta.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.zIndex = '10000';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.opacity = '0.8';
    touchClone.style.transform = 'scale(1.1)';
    document.body.appendChild(touchClone);

    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - 50) + 'px';
    touchClone.style.top = (touch.clientY - 50) + 'px';

    touchPlaneta.style.opacity = '0.3';
}

function touchMover(e) {
    e.preventDefault();
    if (!touchClone) return;

    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - 50) + 'px';
    touchClone.style.top = (touch.clientY - 50) + 'px';

    // Detectar elemento sob o dedo
    const elementoSob = document.elementFromPoint(touch.clientX, touch.clientY);
    const slotSob = elementoSob ? elementoSob.closest('.slot') : null;
    const areaPlanetas = elementoSob ? elementoSob.closest('.planetas-container') : null;

    // Remover highlight de todos os slots e área de planetas
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('drag-over'));
    document.querySelectorAll('.planetas-container').forEach(c => c.classList.remove('drag-over-area'));

    // Adicionar highlight ao slot ou área atual
    if (slotSob) {
        slotSob.classList.add('drag-over');
    } else if (areaPlanetas && touchSlotOrigem) {
        areaPlanetas.classList.add('drag-over-area');
    }
}

function touchFim(e) {
    e.preventDefault();
    if (!touchPlaneta || !touchClone) return;

    const touch = e.changedTouches[0];
    const elementoSob = document.elementFromPoint(touch.clientX, touch.clientY);
    const slotSob = elementoSob ? elementoSob.closest('.slot') : null;
    const areaPlanetas = elementoSob ? elementoSob.closest('.planetas-container') : null;

    // Verificar se está soltando na área de planetas (para remover da órbita)
    if (areaPlanetas && touchSlotOrigem) {
        const posicaoOrigem = parseInt(touchSlotOrigem.dataset.posicao);
        const planetaIdOrigem = slotsPreenchidos[posicaoOrigem - 1];

        // Se estava correto, descontar pontos e acertos
        if (planetaIdOrigem === posicaoOrigem) {
            acertos--;
            pontos = Math.max(0, pontos - 50);
        }

        // Limpar o slot
        slotsPreenchidos[posicaoOrigem - 1] = null;

        // Devolver para a área de planetas
        devolverPlaneta(touchPlaneta);
        touchPlaneta.style.opacity = '1';

        // Atualizar interface
        document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;
        atualizarProgresso();
    } else if (slotSob) {
        // Soltar em um slot
        const posicaoDestino = parseInt(slotSob.dataset.posicao);
        const planetaId = parseInt(touchPlaneta.dataset.planetaId);

        // Limpar pontuação e acerto da posição de origem se o planeta estava correto
        if (touchSlotOrigem) {
            const posicaoOrigem = parseInt(touchSlotOrigem.dataset.posicao);
            const planetaIdOrigem = slotsPreenchidos[posicaoOrigem - 1];
            if (planetaIdOrigem === posicaoOrigem) {
                acertos--;
                pontos = Math.max(0, pontos - 100);
            }
            slotsPreenchidos[posicaoOrigem - 1] = null;
        }

        // Se o slot de destino já está ocupado E estamos vindo de outro slot, fazer SWAP
        const planetaExistente = slotSob.querySelector('.planeta');
        if (planetaExistente && touchSlotOrigem) {
            // SWAP: Trocar os planetas de lugar
            const planetaIdDestino = parseInt(planetaExistente.dataset.planetaId);

            // Limpar pontuação e acerto da posição de destino se o planeta estava correto
            if (planetaIdDestino === posicaoDestino) {
                acertos--;
                pontos = Math.max(0, pontos - 100);
            }

            // Mover planeta existente para o slot de origem
            touchSlotOrigem.appendChild(planetaExistente);
            const posicaoOrigem = parseInt(touchSlotOrigem.dataset.posicao);
            slotsPreenchidos[posicaoOrigem - 1] = planetaIdDestino;

            // Verificar se o planeta movido para origem ficou correto
            if (planetaIdDestino === posicaoOrigem) {
                touchSlotOrigem.classList.add('correto');
                setTimeout(() => touchSlotOrigem.classList.remove('correto'), 500);
                acertos++;
                pontos += 100;
                mostrarMensagemMotivacional();
                criarParticulas(touchSlotOrigem);
            }
        } else if (planetaExistente) {
            // Se estamos vindo da área de planetas, apenas devolver o existente
            devolverPlaneta(planetaExistente);
        }

        // Mover planeta para o slot
        slotSob.appendChild(touchPlaneta);
        touchPlaneta.style.opacity = '1';

        // Registrar no array
        slotsPreenchidos[posicaoDestino - 1] = planetaId;

        // Verificar se está correto
        if (planetaId === posicaoDestino) {
            slotSob.classList.add('correto');
            setTimeout(() => slotSob.classList.remove('correto'), 500);

            acertos++;
            pontos += 100;
            document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;

            mostrarMensagemMotivacional();
            criarParticulas(slotSob);
            atualizarProgresso();
        } else {
            slotSob.classList.add('incorreto');
            erros++;
            pontos = Math.max(0, pontos - 20);
            document.getElementById('tentativas').textContent = `❌ Erros: ${erros}`;
            document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;
            setTimeout(() => slotSob.classList.remove('incorreto'), 500);
        }

        // Atualizar pontos exibidos
        document.getElementById('pontos').textContent = `⭐ ${pontos} pontos`;

        verificarVitoria();
    } else {
        // Devolver ao container original
        touchPlaneta.style.opacity = '1';
    }

    // Limpar
    if (touchClone && touchClone.parentNode) {
        document.body.removeChild(touchClone);
    }
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('drag-over'));
    document.querySelectorAll('.planetas-container').forEach(c => c.classList.remove('drag-over-area'));
    touchPlaneta = null;
    touchClone = null;
    touchSlotOrigem = null;
}

// ==================== SISTEMA DE BADGES ====================

// Carregar Badges Desbloqueados Globalmente
function carregarBadgesGlobais() {
    const dados = localStorage.getItem('badgesSolarGlobais');
    return dados ? JSON.parse(dados) : {};
}

// Salvar Badge Desbloqueado Globalmente (primeiro usuário)
function salvarBadgeGlobal(badgeId, nomeUsuario) {
    const badgesGlobais = carregarBadgesGlobais();

    // Só salva se ainda não foi desbloqueado (primeiro usuário)
    if (!badgesGlobais[badgeId]) {
        badgesGlobais[badgeId] = {
            desbloqueado: true,
            primeiroUsuario: nomeUsuario,
            dataDesbloqueio: new Date().toISOString(),
            conquistadoPor: [nomeUsuario]
        };
        localStorage.setItem('badgesSolarGlobais', JSON.stringify(badgesGlobais));
        return true; // É o primeiro
    } else {
        // Adiciona usuário à lista de conquistadores
        if (!badgesGlobais[badgeId].conquistadoPor.includes(nomeUsuario)) {
            badgesGlobais[badgeId].conquistadoPor.push(nomeUsuario);
            localStorage.setItem('badgesSolarGlobais', JSON.stringify(badgesGlobais));
        }
        return false; // Não é o primeiro
    }
}

// Carregar Estatísticas do Jogador
function carregarEstatisticasJogador() {
    const dados = localStorage.getItem('estatisticasSolar');
    return dados ? JSON.parse(dados) : {
        jogosCompletos: 0,
        totalPartidas: 0,
        melhorTempo: 0,
        melhorPontuacao: 0,
        zerarErros: 0,
        primeiroLugar: 0
    };
}

// Atualizar Estatísticas do Jogador
function atualizarEstatisticas(tempoFinal, pontosFinais, errosFinais, completou) {
    const stats = carregarEstatisticasJogador();

    stats.totalPartidas++;

    if (completou) {
        stats.jogosCompletos++;

        // Atualizar melhor tempo
        if (stats.melhorTempo === 0 || tempoFinal < stats.melhorTempo) {
            stats.melhorTempo = tempoFinal;
        }

        // Atualizar melhor pontuação
        if (pontosFinais > stats.melhorPontuacao) {
            stats.melhorPontuacao = pontosFinais;
        }

        // Contar jogos sem erros
        if (errosFinais === 0) {
            stats.zerarErros++;
        }
    }

    localStorage.setItem('estatisticasSolar', JSON.stringify(stats));
    return stats;
}

// Verificar se está em primeiro lugar no ranking
function verificarPrimeiroLugar() {
    const ranking = carregarRanking('permanente');
    if (ranking.length === 0) return false;

    // Pegar o nome do jogador atual do input (se existir)
    const nomeAtual = document.getElementById('nomeJogador')?.value.trim();
    if (!nomeAtual) return false;

    // Verificar se está em primeiro
    const primeiro = ranking[0];
    return primeiro.nome === nomeAtual;
}

// Verificar e Desbloquear Badges
function verificarBadges(nomeUsuario) {
    const stats = carregarEstatisticasJogador();
    const badgesGlobais = carregarBadgesGlobais();
    const badgesDesbloqueados = [];

    // Verificar cada badge
    badges.forEach(badge => {
        // Se já foi desbloqueado globalmente, pular
        if (badgesGlobais[badge.id]) return;

        // Verificar se o usuário conquistou o badge
        if (badge.verificar(stats)) {
            const ehPrimeiro = salvarBadgeGlobal(badge.id, nomeUsuario);

            if (ehPrimeiro) {
                badgesDesbloqueados.push(badge);
            }
        }
    });

    return badgesDesbloqueados;
}

// Mostrar Notificação de Badge Desbloqueado
function mostrarNotificacaoBadge(badge) {
    const notificacao = document.getElementById('notificacaoBadge');
    document.getElementById('notificacaoBadgeIcone').textContent = badge.icone;
    document.getElementById('notificacaoBadgeNome').textContent = badge.nome;
    document.getElementById('notificacaoBadgeDescricao').textContent = badge.descricao;

    notificacao.classList.add('mostrar');

    // Remover após 4 segundos
    setTimeout(() => {
        notificacao.classList.remove('mostrar');
    }, 4000);
}

// Mostrar Tela de Badges
function mostrarBadges() {
    mostrarTela('telaBadges');
    filtrarBadges('todos');
}

// Filtrar Badges por Categoria
function filtrarBadges(categoria) {
    // Atualizar botões ativos
    document.querySelectorAll('.btn-filtro-badge').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');

    const badgesGlobais = carregarBadgesGlobais();
    const badgesFiltrados = categoria === 'todos' ?
        badges : badges.filter(b => b.categoria === categoria);

    const container = document.getElementById('badgesGrid');

    // Calcular progresso
    const totalBadges = badges.length;
    const badgesDesbloqueadosCount = Object.keys(badgesGlobais).length;
    const percentual = (badgesDesbloqueadosCount / totalBadges) * 100;

    document.getElementById('badgesDesbloqueadosTexto').textContent =
        `${badgesDesbloqueadosCount}/${totalBadges}`;
    document.getElementById('progressoBadge').style.width = `${percentual}%`;

    // Renderizar badges
    container.innerHTML = badgesFiltrados.map(badge => {
        const badgeGlobal = badgesGlobais[badge.id];
        const desbloqueado = badgeGlobal !== undefined;
        const classeCard = desbloqueado ? 'desbloqueado' : 'bloqueado';
        const classeStatus = desbloqueado ? 'desbloqueado' : 'bloqueado';
        const textoStatus = desbloqueado ? '✅ Desbloqueado' : '🔒 Bloqueado';

        const onclick = desbloqueado ?
            `onclick='mostrarDetalhesBadge(${JSON.stringify(badge.id)})' style="cursor: pointer;"` : '';

        return `
            <div class="badge-card ${classeCard}" ${onclick}>
                <div class="badge-icone">${badge.icone}</div>
                <div class="badge-nome">${badge.nome}</div>
                <div class="badge-descricao">${badge.descricao}</div>
                <div class="badge-status ${classeStatus}">${textoStatus}</div>
            </div>
        `;
    }).join('');
}

// Mostrar Detalhes do Badge
function mostrarDetalhesBadge(badgeId) {
    const badge = badges.find(b => b.id === badgeId);
    const badgeGlobal = carregarBadgesGlobais()[badgeId];

    if (!badge || !badgeGlobal) return;

    // Formatar data
    const data = new Date(badgeGlobal.dataDesbloqueio);
    const dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const horaFormatada = data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const totalConquistadores = badgeGlobal.conquistadoPor.length;

    const conteudo = `
        <div class="detalhes-header">
            <div class="detalhes-medalha">${badge.icone}</div>
            <div class="detalhes-nome">${badge.nome}</div>
            <div class="detalhes-challenge" style="color: rgba(255, 255, 255, 0.8);">${badge.descricao}</div>
            <div class="detalhes-status desbloqueado">✅ Badge Desbloqueado</div>
        </div>

        <div class="detalhes-info-extra" style="margin-top: 20px;">
            <h3 style="text-align: center; color: #ffd700; margin-bottom: 20px; font-size: 1.4em;">
                🏆 Primeiro a Desbloquear
            </h3>
            <div class="info-extra-item">
                <span class="info-extra-label">👤 Pioneiro</span>
                <span class="info-extra-valor" style="color: #ffd700; font-size: 1.2em;">
                    ${badgeGlobal.primeiroUsuario}
                </span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">📅 Data do Desbloqueio</span>
                <span class="info-extra-valor">${dataFormatada}</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">🕐 Horário</span>
                <span class="info-extra-valor">${horaFormatada}</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">🎖️ Total de Conquistadores</span>
                <span class="info-extra-valor">${totalConquistadores} jogador${totalConquistadores !== 1 ? 'es' : ''}</span>
            </div>
            <div class="info-extra-item">
                <span class="info-extra-label">📊 Categoria</span>
                <span class="info-extra-valor" style="text-transform: capitalize;">${badge.categoria}</span>
            </div>
        </div>

        ${totalConquistadores > 1 ? `
            <div class="detalhes-info-extra" style="margin-top: 20px;">
                <h4 style="color: rgba(255, 255, 255, 0.8); margin-bottom: 15px; text-align: center;">
                    Outros Conquistadores
                </h4>
                <div style="max-height: 200px; overflow-y: auto;">
                    ${badgeGlobal.conquistadoPor.slice(1).map((nome, index) => `
                        <div class="info-extra-item">
                            <span class="info-extra-label">${index + 2}º</span>
                            <span class="info-extra-valor">${nome}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;

    document.getElementById('conteudoModalBadge').innerHTML = conteudo;
    document.getElementById('modalDetalhesBadge').classList.add('ativo');
}

// Fechar Modal de Badge
function fecharModalBadge(event) {
    if (!event || event.target.id === 'modalDetalhesBadge' || event.target.classList.contains('btn-fechar-modal')) {
        document.getElementById('modalDetalhesBadge').classList.remove('ativo');
    }
}

// ==================== GERADOR DE NOME ALEATÓRIO ====================

// Gerar Nome Aleatório
function gerarNomeAleatorio() {
    const nomeAleatorio = nomesEspaciais[Math.floor(Math.random() * nomesEspaciais.length)];
    const inputNome = document.getElementById('nomeJogador');
    inputNome.value = nomeAleatorio;

    // Atualizar estado do botão
    atualizarBotaoNomeAleatorio();

    // Focar no input para o usuário ver a mudança
    inputNome.focus();
}

// Atualizar Estado do Botão de Nome Aleatório
function atualizarBotaoNomeAleatorio() {
    const inputNome = document.getElementById('nomeJogador');
    const botao = document.getElementById('btnNomeAleatorio');

    if (!botao) return; // Se o botão não existir, sair

    // Desabilitar se tiver texto, habilitar se estiver vazio
    if (inputNome.value.trim() === '') {
        botao.disabled = false;
        botao.style.opacity = '1';
        botao.style.cursor = 'pointer';
    } else {
        botao.disabled = true;
        botao.style.opacity = '0.5';
        botao.style.cursor = 'not-allowed';
    }
}

// Inicialização
desbloquearChallenges();
