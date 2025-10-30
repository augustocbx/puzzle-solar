# Puzzle do Sistema Solar 🌟

Um jogo educativo interativo e instalável (PWA) sobre o Sistema Solar, desenvolvido para estudantes do 5º ano.

## Sobre o Jogo

Os alunos precisam organizar os 8 planetas do nosso Sistema Solar na ordem correta, arrastando-os para órbitas visuais ao redor do Sol. O jogo inclui sistema de pontuação, ranking duplo (permanente e temporário), diversos challenges desbloqueáveis e rica gamificação para manter os estudantes engajados.

## Funcionalidades

### Jogabilidade Principal
- **Órbitas Visuais**: Planetas organizados em órbitas circulares ao redor do Sol
- **Arrastar e Soltar**: Interface intuitiva de drag and drop
- **Substituição de Planetas**: Clique em um slot para devolver o planeta e reposicioná-lo
- **Sistema de Pontos**: Ganhe 100 pontos por acerto, perca 20 por erro
- **Bônus de Tempo**: Quanto mais rápido completar, mais pontos extras
- **Bônus de Precisão**: 500 pontos extras por completar sem erros
- **Barra de Progresso**: Visualize quantos planetas já posicionou corretamente
- **Mensagens Motivacionais**: Receba encorajamento a cada acerto
- **Partículas de Celebração**: Efeitos visuais animados quando acertar
- **Cronômetro**: Acompanhe seu tempo em tempo real
- **Contador de Erros**: Veja quantas tentativas incorretas você fez
- **Animação de Vitória**: Comemoração especial ao completar o puzzle

### Sistema de Ranking Duplo
- **Ranking Permanente**: Histórico de todos os tempos, nunca é apagado
- **Ranking Temporário**: Pode ser limpo com um botão para começar nova competição
- Salve seu nome, tempo, erros e pontos
- Visualize os melhores jogadores
- Filtre por tipo de challenge (Todos, Clássico, Velocista, Precisão, Memória)
- Medalhas especiais para os 3 primeiros colocados (🥇 🥈 🥉)
- Armazenamento local (localStorage) - dados salvos no navegador

### Challenges Desbloqueáveis

1. **Modo Clássico** - Complete o puzzle sem limites
   - Sempre disponível
   - Desbloqueia outros challenges

2. **Velocista** - Complete em menos de 45 segundos
   - Desbloqueado após completar o Modo Clássico
   - Teste sua velocidade!

3. **Precisão Total** - Complete sem erros
   - Desbloqueado após completar o Modo Clássico
   - Nenhum erro permitido!

4. **Memória Espacial** - Os nomes dos planetas desaparecem após 10 segundos
   - Desbloqueado após completar Velocista
   - Teste sua memória!

5. **Mestre Solar** - Complete todos os outros challenges
   - O desafio final!

### Progressive Web App (PWA)
- **Instalável**: Instale como aplicativo no celular, tablet ou computador
- **Funciona Offline**: Jogue mesmo sem internet (após primeira visita)
- **Ícone Personalizado**: Ícone bonito do sistema solar na tela inicial
- **Experiência Nativa**: Funciona em tela cheia como app nativo

#### Como Instalar o App
1. **No celular/tablet (Android/iOS)**:
   - Abra no navegador (Chrome, Safari, etc.)
   - Toque no menu (três pontos) e selecione "Adicionar à tela inicial" ou "Instalar app"

2. **No computador (Chrome/Edge)**:
   - Abra no navegador
   - Clique no ícone de instalação (+) na barra de endereços
   - Ou vá em Menu → Instalar Puzzle do Sistema Solar

## Como Jogar

1. Abra o arquivo `index.html` no navegador (ou acesse via servidor local)
2. Clique em "Começar Jogo" para o modo clássico
3. Ou visite "Challenges" para escolher um desafio específico
4. **Arraste os planetas** para as órbitas ao redor do Sol, na ordem correta (1º a 8º)
5. **Substituir planetas**: Clique em um planeta já posicionado para devolvê-lo à área de seleção
6. **Acompanhe**: Veja seu progresso, pontos, tempo e erros no topo da tela
7. **Complete o puzzle** e salve seu nome no ranking!
8. **Tente os challenges** para desbloquear novos modos de jogo

## Tecnologias Utilizadas

- HTML5
- CSS3 (com animações, gradientes e transformações)
- JavaScript Vanilla (sem dependências externas)
- localStorage para persistência de dados
- Service Worker para PWA
- Manifest.json para instalação
- ImageMagick para geração de ícones

## Ordem Correta dos Planetas

1. Mercúrio
2. Vênus
3. Terra
4. Marte
5. Júpiter
6. Saturno
7. Urano
8. Netuno

## Design

O jogo foi desenvolvido com um design lúdico e colorido, apropriado para crianças:
- Tema espacial com estrelas animadas
- Cores vibrantes e gradientes
- Animações suaves e divertidas
- Interface responsiva (funciona em tablets e computadores)

## Executar Localmente

### Opção 1: Abrir Diretamente
Abra o arquivo `index.html` diretamente no navegador (duplo clique).
**Nota**: O Service Worker só funciona com HTTPS ou localhost via servidor.

### Opção 2: Servidor Local (Recomendado para PWA)

```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (com npx)
npx http-server -p 8080
```

Depois acesse: `http://localhost:8080`

### Gerando Ícones Personalizados

Se quiser modificar os ícones:

```bash
# Edite o arquivo icons/icon.svg
# Depois execute:
python3 generate-icons.py

# Ou instale as dependências primeiro:
pip install cairosvg Pillow
```

## Objetivos Educacionais

Este jogo foi desenvolvido como material didático para o projeto de ciências do 5º ano, com os seguintes objetivos:

### Aprendizado
- Ensinar a ordem dos planetas no Sistema Solar
- Reforçar conceitos de astronomia de forma lúdica
- Desenvolver raciocínio espacial com as órbitas visuais

### Habilidades
- Desenvolver coordenação motora (arrastar e soltar)
- Estimular a memorização através da gamificação
- Treinar velocidade e precisão
- Desenvolver pensamento estratégico (sistema de pontos)

### Engajamento
- Incentivar competição saudável através do ranking duplo
- Apresentar desafios progressivos que mantêm o interesse
- Recompensar o progresso com mensagens motivacionais
- Permitir instalação como app para fácil acesso
- Funcionar offline para uso em qualquer lugar

## Licença

Projeto educacional de código aberto. Livre para uso em escolas e instituições de ensino.
