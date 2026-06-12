# Plano de Implementação: Site Surpresa de Dia dos Namorados (Anabeatriz)

Queremos criar um site extremamente especial, emocionante e interativo para surpreender a **Anabeatriz**.
O design será moderno, elegante e responsivo para celular, com uma paleta de cores inspirada na estética de **Euphoria** (tons profundos de roxo, azul neon, violeta e glitter/brilhos suaves).

---

## Detalhes Personalizados Confirmados

1. **Nome:** Anabeatriz.
2. **Trilha Sonora:** Música "Tua Boca" do Belo tocando de fundo de forma suave (com botão de controle).
3. **Linha do Tempo (Momentos):**
   - **31 de Dezembro de 2025:** O primeiro beijo no Ano Novo (com uma piada fofa sobre ela não ter gostado de primeira!).
   - **06 de Fevereiro:** O pedido oficial de namoro.
   - **Nosso Primeiro Pagode:** Curtindo juntinhos o som que a gente ama.
   - **Meu Aniversário:** Aquela noite especial que guardamos no coração.
4. **Cupons Interativos:**
   - **Vale Beijo de Cinema** 🎬💋
   - **Vale Massagem Relaxante** 💆‍♀️✨
5. **Seção Especial Euphoria:**
   - Uma seção inteiramente dedicada com a estética visual marcante da série (maquiagem com glitter, luzes neon roxas/azuis, efeitos visuais).
   - Frases românticas adaptadas da série ou que usam a vibe de Euphoria (ex: *"Você é a minha cena favorita de toda a história"*, *"Nenhuma maquiagem de glitter brilha tanto quanto seu olhar"*).

---

## Estrutura do Site Proposta

A aplicação será criada em `C:\Users\Artur Costa\.gemini\antigravity\scratch\surpresa-namorada` e terá:

1. **Tela de Entrada (Lock Screen):**
   - Uma pergunta/senha fofa para liberar o site. Exemplo: *"Qual o dia oficial do nosso sim?"* ou *"Quem não gostou do primeiro beijo de primeira?"*.
   - Ao responder corretamente, a música "Tua Boca" do Belo começa a tocar suavemente e o site se revela com transições suaves.

2. **Nossa Linha do Tempo (Our Story):**
   - Uma linha do tempo vertical interativa.
   - Animação e texto descontraído sobre o dia 31/12/2025 ("Ela fingiu que não gostou, mas o destino já sabia...").

3. **Seção Especial "Euphoria Vibes" 💜✨:**
   - Um carrossel ou galeria interativa com estética neon.
   - Declaração de amor usando referências visuais e conceituais de Euphoria.

4. **Cupons do Amor (Vouchers):**
   - Cartões clicáveis (Vale Massagem e Vale Beijo de Cinema) que revelam uma animação e instruções divertidas de como "resgatar".

5. **A Carta de Amor:**
   - Texto com efeito typewriter revelando uma mensagem carinhosa para ela ler durante a viagem dela.

---

## Proposta de Arquivos

### [Componente Frontend]

#### [NEW] [index.html](file:///C:/Users/Artur%20Costa/.gemini/antigravity/scratch/surpresa-namorada/index.html)
Estrutura principal HTML com as seções integradas e tags de áudio para a música.

#### [NEW] [style.css](file:///C:/Users/Artur%20Costa/.gemini/antigravity/scratch/surpresa-namorada/style.css)
Visual dark-romantic inspirado em Euphoria (efeitos neon de box-shadow, fontes modernas, gradientes roxo/azul e design totalmente responsivo para celular).

#### [NEW] [script.js](file:///C:/Users/Artur%20Costa/.gemini/antigravity/scratch/surpresa-namorada/script.js)
Lógica do desbloqueio, controle da música do Belo, animação de partículas de glitter e corações, e efeito de digitação da carta.

---

## Plano de Verificação

### Verificação Manual
- Executaremos o servidor local para verificar a harmonia visual, a reprodução de áudio de fundo, a interatividade dos botões e a adaptabilidade para telas de smartphones.
