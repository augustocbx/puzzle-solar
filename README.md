# Puzzle do Sistema Solar

Um jogo educativo interativo sobre o Sistema Solar, desenvolvido para estudantes do 5º ano.

## Sobre o Jogo

Os alunos precisam organizar os 8 planetas do nosso Sistema Solar na ordem correta, arrastando-os para suas posições. O jogo inclui um sistema de ranking baseado no tempo de conclusão e diversos challenges para aumentar o desafio.

## Funcionalidades

### Jogabilidade Principal
- **Arrastar e Soltar**: Interface intuitiva de drag and drop
- **Cronômetro**: Acompanhe seu tempo em tempo real
- **Contador de Erros**: Veja quantas tentativas incorretas você fez
- **Feedback Visual**: Animações indicam acertos e erros
- **Animação de Vitória**: Comemoração especial ao completar o puzzle

### Sistema de Ranking
- Salve seu nome e tempo
- Visualize os melhores jogadores
- Filtre por tipo de challenge
- Medalhas para os 3 primeiros colocados
- Armazenamento local (localStorage)

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

## Como Jogar

1. Abra o arquivo `index.html` no navegador
2. Clique em "Começar Jogo" para o modo clássico
3. Ou visite "Challenges" para escolher um desafio específico
4. Arraste os planetas para os slots numerados na ordem correta
5. Complete o puzzle e salve seu tempo no ranking!

## Tecnologias Utilizadas

- HTML5
- CSS3 (com animações e gradientes)
- JavaScript Vanilla (sem dependências)
- localStorage para persistência de dados

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

Você pode abrir diretamente o arquivo `index.html` no navegador, ou usar um servidor local:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (com npx)
npx http-server
```

Depois acesse: `http://localhost:8000`

## Objetivo Educacional

Este jogo foi desenvolvido como material didático para o projeto de ciências do 5º ano, com os seguintes objetivos:

- Ensinar a ordem dos planetas no Sistema Solar
- Desenvolver coordenação motora (arrastar e soltar)
- Estimular a memorização através da gamificação
- Incentivar a competição saudável através do ranking
- Apresentar desafios progressivos que mantêm o interesse

## Licença

Projeto educacional de código aberto. Livre para uso em escolas e instituições de ensino.
