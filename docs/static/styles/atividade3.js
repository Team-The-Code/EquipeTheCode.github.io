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

    if(totalCorrect <= 7 ){
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
         <a href="./certificado.html"> Voce passou</a>
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
        question: "Product Backlog - Scrum Master",
        conteudo: "Como o Scrum Master pode colaborar efetivamente na gestão do Product Backlog?",
        answer: [
            {text: "Atuando como o único responsável pela priorização das histórias, sem a necessidade de envolvimento da equipe de desenvolvimento ", correct: false},
            {text: "Facilitando sessões de refinamento do backlog, garantindo a participação da equipe e promovendo a compreensão compartilhada das histórias ", correct: true},
            {text: "Ignorando as atividades relacionadas ao Product Backlog, já que a gestão é responsabilidade exclusiva do Product Owner ", correct: false},
            {text: "Ditando as estimativas de esforço para cada item do backlog, sem considerar as opiniões da equipe ", correct: false},
        ]
    },
    {
        question: "Product Backlog  - Product Owner",
        conteudo: "Qual é a responsabilidade principal do Product Owner em relação ao Product Backlog?",
        answer: [
            {text: "Priorizar as histórias de acordo com sua preferência pessoal, sem levar em consideração as necessidades da equipe ou do cliente ", correct: false},
            {text: "Atualizar o Product Backlog apenas no início de cada sprint, sem a necessidade de ajustes contínuos ", correct: false},
            {text: "Colaborar com a equipe de desenvolvimento na elaboração das histórias de usuário, compartilhando completamente a responsabilidade da criação do backlog ", correct: false},
            {text: "Garantir que o Product Backlog esteja sempre alinhado com as necessidades do cliente, refletindo as prioridades do negócio ", correct: true},           
        ]
    },
    {
        question: "Product Backlog - Dev Team",
        conteudo: "Como o time de desenvolvimento pode contribuir ativamente para o refinamento do Product Backlog?",
        answer: [
            {text: "Envolvendo-se proativamente nas sessões de refinamento, oferecendo insights técnicos, esclarecendo dúvidas e ajudando a dimensionar o esforço necessário ", correct: false},
            {text: "Limitando-se a executar as tarefas sem participar do processo de refinamento, pois essa é uma responsabilidade do Product Owner ", correct: true},
            {text: "Delegando completamente a responsabilidade do Product Backlog para o Scrum Master, sem considerar as necessidades técnicas ", correct: false},
            {text: "Exigindo que o Product Owner forneça todas as especificações detalhadas antes do início de cada sprint, sem participar do processo de refinamento ", correct: false},         
        ]
    },
    {
        question: "Sprint Backlog - Scrum Master",
        conteudo: "Como o Scrum Master pode contribuir efetivamente para o sucesso do Sprint Backlog?",
        answer: [
            {text: "Atribuindo tarefas específicas a cada membro da equipe sem levar em consideração suas habilidades individuais ", correct: false},
            {text: "Facilitando reuniões diárias para revisar o progresso, remover impedimentos e garantir a colaboração eficaz dentro da equipe ", correct: true},
            {text: "Ignorando as atividades relacionadas ao Sprint Backlog, pois a responsabilidade principal é do Product Owner ", correct: false},
            {text: "Estabelecendo prazos inflexíveis para cada tarefa, independentemente da capacidade real da equipe ", correct: false},
        ]
    },
    {
        question: "Sprint Backlog  - Product Owner",
        conteudo: "Qual é a responsabilidade primordial do Product Owner em relação ao Sprint Backlog?",
        answer: [
            {text: "Delegar a criação do Sprint Backlog exclusivamente para o Scrum Master, sem sua participação ativa ", correct: false},
            {text: "Atualizar o Sprint Backlog somente no início do sprint, sem ajustes contínuos durante o ciclo ", correct: false},
            {text: "Colaborar com a equipe de desenvolvimento na elaboração do Sprint Backlog, garantindo que esteja alinhado com as prioridades do Product Owner ", correct: true},
            {text: "Atribuir tarefas específicas a cada membro da equipe sem considerar suas habilidades individuais ", correct: false},
        ]
    },
    {
        question: "Sprint Backlog - Dev Team",
        conteudo: "Como o time de desenvolvimento pode maximizar sua eficiência durante a execução do Sprint Backlog?",
        answer: [
            {text: "Realizando atualizações detalhadas apenas no final do sprint, sem a necessidade de comunicação contínua durante o ciclo ", correct: false},
            {text: "Delegando a responsabilidade de atualizar o Sprint Backlog para o Scrum Master, evitando participação direta ", correct: false},
            {text: "Limitando a colaboração apenas à equipe de desenvolvimento, excluindo o Product Owner do processo de execução do Sprint Backlog ", correct: false},
            {text: "Colaborando ativamente, atualizando o progresso diariamente, compartilhando impedimentos e trabalhando de maneira transparente ", correct: true},
        ]
    },
    {
        question: "Kanban - Scrum Master",
        conteudo: "No processo de execução do quadro kanban, o master tem como função?",
        answer: [
            {text: "Não acompanha o quadro kanban ", correct: false},
            {text: "Montar sem a participação da equipe ", correct: false},
            {text: "Guiar a equipe ao entendimento geral das tarefas, e procurar ajudar os membros que tiverem com dificuldade nas atribuições e delegar novas funções a quem terminou suas tarefas antes da sprint ", correct: true},
            {text: "Deve criar um clima desfavorável com equipe se tarefas não esteja sendo entregue. ", correct: false},
        ]
    },
    {
        question: "Kanban  - Product Owner",
        conteudo: "Na visão do PO qual a importância da metodologia Kanban?",
        answer: [
            {text: "Garantir um fluxo contínuo entre a execução das tarefas. ", correct: true},
            {text: "Controlar e equipe e retirar a flexibilidade dos membros na realização das tarefas ", correct: false},
            {text: "Não entregar um fluxo contínuo de tarefas ", correct: false},
            {text: "Não permitir melhores nas tarefas por ser uma metodologia fixa ", correct: false},
        ]
    },
    {
        question: "Kanban - Dev Team",
        conteudo: "Na visão do PO qual a importância da metodologia Kanban?",
        answer: [
            {text: "Um ambiente inflexível com poucas mudanças ", correct: false},
            {text: "Predominar poucas entregas e realizações de tarefas para equipe ", correct: false},
            {text: "Um ambiente flexível onde mudanças serão implementadas conforme necessidade e permite comemorar as entregas e motivar realizar novas tarefas em um fluxo contínuo de trabalho ", correct: true},
            {text: "Desfavorecer o trabalho da equipe ", correct: false},
        ]
    },
    {
        question: "DOR - Scrum Master",
        conteudo: "Como o Scrum Master pode contribuir para estabelecer uma sólida Definition of Ready?",
        answer: [
            {text: "Definindo unilateralmente os critérios de prontidão sem levar em consideração a opinião da equipe ", correct: false},
            {text: "Facilitando sessões de refinamento e colaborando com a equipe para desenvolver critérios claros e alcançáveis para as histórias ", correct: true},
            {text: "Ignorando completamente a definição de prontidão, já que é responsabilidade do Product Owner ", correct: false},
            {text: "Delegando a responsabilidade da Definition of Ready exclusivamente para o Product Owner ", correct: false},        ]
    },
    {
        question: "DOR  - Product Owner",
        conteudo: "Qual é a principal responsabilidade do Product Owner em relação à Definition of Ready?",
        answer: [
            {text: "Garantir que as histórias de usuário estejam prontas para serem desenvolvidas, colaborando com a equipe para estabelecer a Definition of Ready ", correct: true},
            {text: "Delegar a criação dos critérios de prontidão para o Scrum Master, sem sua participação ativa ", correct: false},
            {text: "Exigir que a equipe desenvolva a Definition of Ready sem sua supervisão ou envolvimento ", correct: false},
            {text: " Ignorar a necessidade de critérios de prontidão, pois isso atrasa o início do desenvolvimento ", correct: false},
        ]
    },
    {
        question: "DOR - Dev Team",
        conteudo: "Como o time de desenvolvimento pode contribuir para a definição eficaz da Definition of Ready?",
        answer: [
            {text: "Limitando-se a seguir cegamente os critérios de prontidão sem fornecer feedback ou sugestões ", correct: false},
            {text: "Delegando a responsabilidade da Definition of Ready para o Scrum Master, sem participação ativa ", correct: false},
            {text: "Ignorando a Definition of Ready, pois isso adiciona complexidade desnecessária ao processo ", correct: false},
            {text: "Participando ativamente das discussões para estabelecer critérios realistas, compartilhando preocupações e garantindo a compreensão coletiva ", correct: true},
        ]
    },
    {
        question: "DONE - Scrum Master",
        conteudo: "Como o Scrum Master pode desempenhar um papel efetivo na definição e aplicação da Definition of Done?",
        answer: [
            {text: "Impondo rigidamente critérios sem considerar o contexto ou as sugestões da equipe ", correct: false},
            {text: "Facilitando discussões colaborativas para estabelecer critérios realistas e garantindo que a equipe compreenda e adote a Definition of Done ", correct: true},
            {text: "Ignorando as atividades relacionadas à Definition of Done, uma vez que a responsabilidade principal é do Product Owner ", correct: false},
            {text: "Delegando a criação da Definition of Done exclusivamente para o time de desenvolvimento ", correct: false},
        ]
    },
    {
        question: "DONE  - Product Owner",
        conteudo: "Qual é o papel do Product Owner na definição e aplicação da Definition of Done?",
        answer: [
            {text: "Ignorar completamente a Definition of Done, pois a prioridade é apenas a entrega rápida de funcionalidades ", correct: false},
            {text: "Delegar a responsabilidade da Definition of Done para o Scrum Master, sem sua participação ativa ", correct: false},
            {text: "Colaborar com a equipe para garantir que a Definition of Done reflita as expectativas de qualidade e prontidão para entrega ", correct: true},
            {text: "Impor critérios rígidos sem levar em consideração a capacidade real da equipe ", correct: false},
        ]
    },
    {
        question: "DONE - Dev Team",
        conteudo: "Como o time de desenvolvimento pode garantir que a Definition of Done seja efetivamente aplicada em cada incremento?",
        answer: [
            {text: "Participar ativamente na revisão e atualização contínua da Definition of Done, garantindo que ela seja adaptada conforme necessário ", correct: true},
            {text: "Seguir cegamente os critérios, sem questionar ou sugerir melhorias ", correct: false},
            {text: "Ignorar a Definition of Done, uma vez que isso pode atrasar a entrega de funcionalidades ", correct: false},
            {text: "Delegar a responsabilidade da aplicação da Definition of Done para o Scrum Master ", correct: false},
        ]
    },

]
