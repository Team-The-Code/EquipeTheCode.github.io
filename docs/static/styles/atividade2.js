/*elementos existentes no html*/
const $starGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".question-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $questionText2 = document.querySelector(".texto")
const $nextQuestionButton = document.querySelector(".next-question")
const $next = document.querySelector(".btn")

let currentQuestionAtividade = 0
let totalCorrect = 0

/*Função para iniciar a atividade
  - Ao clicar no botão "começar" a atividade será iniciada*/

$starGameButton.addEventListener("click", startGame)

function startGame(){
    $starGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

/* Transição das perguntas */
function displayNextQuestion(){
    resetState()
    
    if(questions.length === currentQuestionAtividade){
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionAtividade].conteudo
    $questionText2.textContent = questions[currentQuestionAtividade].question

    questions[currentQuestionAtividade].answer.forEach(answer =>{
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct){
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    while($answersContainer.firstChild){
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    $nextQuestionButton.classList.add("hide")
}


/*Selecionar resposta correta*/
function selectAnswer (event){
    const answerClicked = event.target 
    if(answerClicked.dataset.correct){
        document.body.classList.add("correct1")
        totalCorrect++
    }
    else {
        document.body.classList.add("incorrect1")
    }
    document.querySelectorAll(".answer").forEach(button =>{
        if(button.dataset.correct) {
            button.classList.add("correct")
        }
        else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionAtividade++
}

/*Passsar para proxima pergunta */
$nextQuestionButton.addEventListener("click", displayNextQuestion)

/*Resultado*/
function finishGame() {
    const totalQuestions = questions.length;
    const performance = Math.floor(totalCorrect * 10 / totalQuestions);

    let message = ""
    switch (true) {
        case (performance >= 90):
        message = "Excelente"
         break

        case (performance >= 70):
        message = "Muito bom"
         break

        case (performance >= 50):
        message = "Bom"
         break

        default:
        message = "Pode melhorar"
    }
    if(totalCorrect <= 9){
        $questionsContainer.innerHTML = 
        `
        <p class="final-message">
          Você acertou ${totalCorrect} de ${totalQuestions} questões!
        </p>
        <button 
          onclick=window.location.reload() 
          class="button"
        >
          Refazer teste
        </button>
      `
    
      }
        else{
          $questionsContainer.innerHTML = 
        `
          <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestions} questões!
          </p>
          <button 
          class="button"
        >
         <a href="./Ciclo3.html"> Voce passou</a>
        </button>
          
        `
       }
    
    
    
    
}
 

/*Banco de perguntas
  - Propriedades:
   question;
   answers (array com as respostas);
   correct (respostas certas e erradas).

  - Variável question com array onde cada posição é um objeto com as respostas*/

const questions = [
    {
        question: "Processo Scrum  - Scrum Master",
        conteudo: "Qual é o papel desempenhado pelo Scrum Master no contexto do processo Scrum?",
        answer: [
            {text: "Elaborar o Product Backlog e definir os requisitos do cliente", correct: false},
            {text: "Dividir tarefas entre os membros da equipe durante a sprint", correct: false},
            {text: "Conduzir reuniões diárias de acompanhamento, abordando impedimentos e progresso individual", correct: true},
            {text: "Garantir a entrega bem-sucedida do MVP (Minimum Viable Product) ao final de cada sprint", correct: false},
            
        ]
    },
    {
        question: "Processo Scrum - Product Owner",
        conteudo: "Qual é a principal responsabilidade do Product Owner no contexto do processo Scrum?",
        answer: [
            {text: "Conduzir reuniões diárias e resolver impedimentos da equipe", correct: false},
            {text: "Elaborar o Sprint Backlog e definir as atividades diárias dos membros da equipe", correct: false},
            {text: "Gerenciar o relacionamento com o cliente e adquirir os requisitos necessários", correct: true},
            {text: "Assegurar que a equipe atinja as metas de produtividade estabelecidas para cada sprint", correct: false},
           
        ]
    },
    {
        question: "Processo Scrum - Dev Team",
        conteudo: "Qual é a função principal do time de desenvolvimento no contexto do processo Scrum?",
        answer: [
            {text: "Elaborar o Product Backlog e definir as metas de cada sprint", correct: false},
            {text: "Gerenciar o relacionamento com o cliente e adquirir feedback", correct: false},
            {text: "Desenvolver o código, implementar as funcionalidades e entregar incrementos do produto", correct: true},
            {text: "Estabelecer metas de produtividade e qualidade para a equipe", correct: false},
         
        ]
    },
    {
        question: "Sprint Planning - Scrum Master",
        conteudo: "Escolha a opção que melhor descreve o papel do Scrum Master durante o Sprint Planning.",
        answer: [
            {text: "Facilitar a reunião, garantindo que todos os membros da equipe estejam presentes, mas não participando ativamente nas discussões", correct: false},
            {text: "Atuar como um líder autoritário, tomando decisões unilaterais sobre o plano do sprint, com base em sua experiência", correct: false},
            {text: "Auxiliar a equipe na compreensão e aplicação dos princípios ágeis, remover obstáculos e garantir que a reunião ocorra de forma eficiente", correct: true},
            {text: "Fornecer inputs detalhados sobre as tarefas específicas que cada membro da equipe deve realizar durante o sprint", correct: false},
           
        ]
    },
    {
        question: "Sprint Planning - Product Owner",
        conteudo: "Escolha a opção que melhor descreve o papel do Product Owner durante o Sprint Planning.",
        answer: [
            {text: "Desenvolver o plano do sprint de forma isolada, sem a necessidade de interação com a equipe de desenvolvimento", correct: false},
            {text: "Priorizar o backlog do produto, esclarecer dúvidas da equipe e garantir que as metas de negócio sejam compreendidas durante a reunião", correct: true},
            {text: "Dirigir a reunião, definindo as tarefas específicas para cada membro da equipe e supervisionando a execução do plano durante o sprint", correct: false},
            {text: "Fornecer atualizações diárias sobre o progresso do desenvolvimento aos stakeholders, deixando a responsabilidade de planejamento para a equipe de desenvolvimento", correct: false}
        ]
    },
    {
        question: "Sprint Planning - Dev Team",
        conteudo: "Escolha a opção que melhor descreve o papel do time de desenvolvimento durante o Sprint Planning",
        answer: [
            {text: "Observar passivamente enquanto o Scrum Master e o Product Owner tomam decisões sobre as tarefas a serem realizadas durante o sprint ", correct: false},
            {text: "Participar ativamente da discussão, compartilhando conhecimento, estimativas de esforço e comprometendo-se com as tarefas que podem ser realizadas durante o sprint. ", correct: true},
            {text: "Delegar a responsabilidade de planejamento para o Scrum Master, concentrando-se exclusivamente na execução das tarefas atribuídas ", correct: false},
            {text: "Ignorar o Sprint Planning e focar apenas na execução das tarefas, uma vez que o plano já foi definido pelo Scrum Master e Product Owner ", correct: false},
        ]
    },
    {
        question: "Planning poker - Scrum Master ",
        conteudo: "Como o Scrum Master pode contribuir efetivamente durante uma sessão de Planning Poker?",
        answer: [
            {text: "Desempenhando o papel de facilitador, garantindo que todos os membros da equipe tenham a oportunidade de expressar suas opiniões e que as discussões sejam focadas nas estimativas ", correct: true},
            {text: "Assumindo o papel de juiz, impondo estimativas específicas com base em sua experiência, independentemente das opiniões da equipe ", correct: false},
            {text: "Abstraindo-se completamente do processo, permitindo que a equipe conduza a sessão de Planning Poker sem intervenção ", correct: false},
            {text: "Fornecendo estimativas detalhadas para cada história de usuário, uma vez que o Scrum Master é geralmente mais experiente em termos técnicos ", correct: false},
        ]
    },
    {
        question: "Planning poker - Product Owner ",
        conteudo: "Qual é o papel do Product Owner durante uma sessão de Planning Poker?",
        answer: [
            {text: "Atuando como um moderador neutro, assegurando que as estimativas reflitam adequadamente o valor do produto para o cliente e alinhando-se com as prioridades do backlog ", correct: true},
            {text: "Procurar dificultar o entendimento sobre as tarefas ", correct: false},
            {text: "Abstendo-se de participar, pois as estimativas são responsabilidade exclusiva da equipe de desenvolvimento ", correct: false},
            {text: "Aprovando ou rejeitando as estimativas sem considerar as opiniões da equipe, com base apenas em suas próprias expectativas ", correct: false},
        
        ]
    },
    {
        question: "Planning poker - Dev Team ",
        conteudo: "Como o time de desenvolvimento pode otimizar sua participação durante uma sessão de Planning Poker?",
        answer: [
            {text: "Limitando-se a aceitar as estimativas sugeridas pelo Scrum Master, uma vez que ele é responsável pelo planejamento do sprint ", correct: false},
            {text: "Contribuindo ativamente, compartilhando perspectivas técnicas, discutindo desafios potenciais e propondo estimativas realistas ", correct: true},
            {text: "Focando exclusivamente em suas tarefas individuais, sem participar das discussões coletivas sobre as estimativas das histórias de usuário ", correct: false},
            {text: "Delegando a responsabilidade de estimar para um único representante do time, a fim de acelerar o processo ", correct: false},           
        ]
    },
    {
        question: "Daily - Scrum Master ",
        conteudo: "Que papel é desempenhado pelo Scrum Master durante a Daily Scrum?",
        answer: [
            {text: "Assumindo o controle da reunião, ditando as tarefas diárias para cada membro da equipe e monitorando o progresso sem permitir discussões adicionais ", correct: false},
            {text: "Facilitando a reunião, removendo obstáculos e garantindo que a equipe esteja focada em alcançar as metas do sprint ", correct: true},
            {text: "Observando passivamente, permitindo que a equipe conduza a Daily Scrum sem intervenção ", correct: false},
            {text: "Designando tarefas específicas para cada membro da equipe durante a reunião, sem considerar o feedback ou as contribuições individuais ", correct: false},
        ]
    },
    {
        question: "Daily - Product Owner ",
        conteudo: "Qual é a contribuição mais apropriada do Product Owner durante a Daily Scrum?",
        answer: [
            {text: "Participando ativamente, oferecendo insights sobre as prioridades do backlog e esclarecendo dúvidas da equipe sobre os requisitos das histórias de usuário ", correct: true},
            {text: "Delegando a responsabilidade da Daily Scrum exclusivamente à equipe de desenvolvimento, sem participar ativamente nas discussões ", correct: false},
            {text: "Ditando as tarefas diárias para a equipe, garantindo que as atividades estejam alinhadas com as expectativas de entrega do produto ", correct: false},
            {text: "Observando passivamente, sem contribuir com informações ou esclarecimentos sobre as histórias de usuário em andamento ", correct: false},
        ]
    },
    {
        question: "Daily - Dev Team ",
        conteudo: "Como o time de desenvolvimento pode maximizar sua participação efetiva durante a Daily Scrum?",
        answer: [
            {text: "Limitando as atualizações apenas às tarefas individuais, sem compartilhar informações sobre possíveis obstáculos ou dependências ", correct: false},
            {text: "Colaborando abertamente, compartilhando o progresso das tarefas, identificando obstáculos e solicitando ajuda quando necessário ", correct: true},
            {text: "Designando um porta-voz para falar em nome de toda a equipe, evitando que todos participem ativamente das discussões ", correct: false},
            {text: "Ignorando a reunião, pois as atualizações podem ser fornecidas por meio de ferramentas de gerenciamento de projetos. ", correct: false},
        ]
    },
    {
        question: "Sprint Review - Scrum Master  ",
        conteudo: "Qual a responsabilidade do Scrum Master em uma reunião de Sprint Review?",
        answer: [
            {text: "O Scrum master não tem responsabilidades na reunião, ele apenas participa", correct: false},
            {text: "O Scrum Master é responsável por agendar a reunião, informar os participantes sobre seu propósito e garantir que se mantenha dentro do tempo estipulado, que varia de acordo cm a duração da sprint", correct: true},
            {text: "O Scrum Master é responsável por dificultar a reunião, colocando obstáculos difíceis a serem resolvidos", correct: false},
            {text: "O Scrum Master é responsável por comandar a reunião, como um chefe, avaliando e julgando o trabalho do time Scrum", correct: false},
        ]
    },
    {
        question: "Sprint Review - Product Owner  ",
        conteudo: "Qual é a função do PO na reunião de Sprint Review",
        answer: [
            {text: "A função do PO é garantir que o evento ocorra e que os participantes entendam o seu propósito, ensinando a todos os envolvidos a manter a reunião dentro do tempo limite", correct: false},
            {text: "A função do PO é assegurar que apenas os integrantes do time Scrum participem da reunião, sem a presença de pessoas externas", correct: false},
            {text: "O Product Owner deve convidar a pessoas externas envolvidas para participar, reportar os itens no Product Backlog; quais backlog itens já foram feitos e os que ainda são prováveis para as próximas datas de entrega", correct: true},
            {text: "O PO não tem função na reunião, ele não precisa participar", correct: false},
        ]
    },
    {
        question: "Sprint Review - Dev Team",
        conteudo: "Como Dev. Team tenho qual papel dentro da Sprint Review? ",
        answer: [
            {text: "O papel do Dev. Team é somente escutar as orientações do PO e do Scrum Master, sem dar seu feedback", correct: false},
            {text: "O papel do Dev. Team é o mais importante, responsável pelas tomadas de decisão e por apresentar os resultados aos utilizadores finais e às partes interessadas", correct: false},
            {text: "O Dev. Team não tem um papel importante, ele pode ou não participar da reunião", correct: false},
            {text: "Discutir o que correu bem e que problemas enfrentaram. Também devem informar o grupo sobre o que foi feito para resolver esses mesmos problemas, demonstrar o seu trabalho completo, respondendo às questões sobre o seu incremento", correct: true},
        ]
    },
    {
        question: "Burndown - Scrum Master",
        conteudo: "Qual é o papel desempenhado pelo Scrum Master em relação ao Burndown em um contexto ágil?",
        answer: [
            {text: "Criar e manter o Burndown, garantindo a precisão das informações ", correct: false},
            {text: "Definir as metas de produtividade para a equipe ", correct: false},
            {text: "Resolver conflitos entre os membros da equipe durante o acompanhamento do Burndown ", correct: false},
            {text: "Ajudar a equipe a compreender e usar o Burndown, removendo obstáculos que impactem seu progresso ", correct: true},
        ]
    },
    {
        question: "Burndown - Product Owner",
        conteudo: "Como o Product Owner pode influenciar positivamente o gráfico de Burndown em um projeto ágil?",
        answer: [
            {text: "Definindo prazos rígidos para cada sprint, independentemente da capacidade da equipe, para acelerar o ritmo do Burndown ", correct: false},
            {text: "Participando ativamente das reuniões diárias do Scrum para ajustar as estimativas e garantir que o Burndown esteja sempre alinhado com as expectativas do Product Owner ", correct: false},
            {text: "Colaborando na priorização do backlog para garantir que as histórias mais cruciais sejam entregues primeiro, otimizando o progresso no gráfico de Burndown ", correct: true},
            {text: "Delegando a responsabilidade do Burndown inteiramente à equipe de desenvolvimento, sem envolvimento ativo nas decisões relacionadas ao progresso do projeto ", correct: false},
        ]
    },
    {
        question: "Burndown - Dev Team",
        conteudo: "Como o time de desenvolvimento pode impactar de maneira construtiva no gráfico de Burndown?",
        answer: [
            {text: "Atualizando o Burndown diariamente sem levar em consideração as estimativas iniciais, para refletir com precisão o progresso real da equipe ", correct: false},
            {text: "Comunicando proativamente os desafios e impedimentos que podem afetar o ritmo do desenvolvimento, permitindo ajustes no gráfico de Burndown ", correct: true},
            {text: "Minimizando a transparência, compartilhando apenas informações básicas para evitar discussões prolongadas sobre o progresso durante as reuniões ágeis ", correct: false},
            {text: "Designando um único membro para manter e atualizar o gráfico de Burndown, a fim de evitar distrações da execução das tarefas técnicas ", correct: false},
        ]
    },
    {
        question: "Sprint Retrospectiva - Geral",
        conteudo: "Como a equipe pode otimizar a Sprint Retrospectiva para promover uma cultura de melhoria contínua?",
        answer: [
            {text: "Limitando a discussão apenas aos pontos positivos, evitando abordar áreas que podem demandar mudanças ", correct: false},
            {text: "Encorajando a transparência e a honestidade, permitindo que todos os membros expressem suas opiniões sobre o sprint, incluindo desafios e sugestões de melhoria ", correct: true},
            {text: "Designando um único membro para liderar a reunião, evitando a colaboração coletiva ", correct: false},
            {text: "Ignorando completamente a Sprint Retrospectiva, pois é vista como uma formalidade desnecessária ", correct: false},
        ]
    },
    {
        question: "Sprint Retrospectiva - Geral",
        conteudo: "Qual é a função principal da Sprint Retrospectiva no contexto do desenvolvimento ágil?",
        answer: [
            {text: "Celebrar exclusivamente os sucessos individuais dos membros da equipe ", correct: false},
            {text: "Identificar áreas de melhoria no processo de desenvolvimento e definir ações concretas para implementar melhorias no próximo sprint ", correct: true},
            {text: "Atribuir culpas pelos desafios enfrentados durante o sprint, buscando responsáveis por eventuais falhas. ", correct: false},
            {text: "Ignorar as discussões sobre o sprint anterior, concentrando-se apenas no planejamento futuro ", correct: false},
        ]
    },
    
]
