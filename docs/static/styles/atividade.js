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

    if(totalCorrect <= 5){
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
         <a href="./Ciclo2.html"> Voce passou</a>
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
        question: "Metodologia Agil - Scrum Master",
        conteudo: "Qual é a função do Scrum Master em uma equipe ágil que utiliza a metodologia Scrum?",
        answer: [
            {text: "Gerenciar o backlog de produtos", correct: false},
            {text: "Desenvolver código e funcionalidades do produto", correct: false},
            {text: "Facilitar o processo Scrum e remover impedimentos", correct: true},
            {text: "Definir as metas de lançamento do produto", correct: false},
            
        ]
    },
    {
        question: "Metodologia ágil- Product Owner",
        conteudo: "Qual é a função principal do Product Owner em uma equipe ágil que utiliza a metodologia Scrum?",
        answer: [
            {text: "Definir a arquitetura técnica do produto", correct: false},
            {text: "Priorizar o backlog do produto e representar os interesses do cliente", correct: true},
            {text: "Facilitar as reuniões diárias da equipe de desenvolvimento", correct: false},
            {text: "Garantir que as tarefas diárias estejam de acordo com o plano do projeto", correct: false},
           
        ]
    },
    {
        question: "Metodologia ágil- Dev Team",
        conteudo: "Qual é a principal responsabilidade do time de desenvolvimento em uma equipe ágil que segue a metodologia Scrum?",
        answer: [
            {text: "Definir as metas de lançamento do produto", correct: false},
            {text: "Priorizar o backlog de produtos e representar os interesses do cliente", correct: false},
            {text: "Desenvolver, testar e entregar as funcionalidades do produto", correct: true},
            {text: "Facilitar as reuniões de retrospectiva da equipe", correct: false},
         
        ]
    },
    {
        question: "História Scrum - Scrum Master",
        conteudo: "Na história do Scrum, qual motivo pelo qual a função do Scrum Master foi introduzida?",
        answer: [
            {text: "Para liderar o desenvolvimento de software", correct: false},
            {text: "Para representar os interesses do cliente. ", correct: false},
            {text: "Para facilitar o processo Scrum e remover impedimentos. ", correct: true},
            {text: "Para definir as metas de lançamento do produto", correct: false},
           
        ]
    },
    {
        question: "História Scrum - Product Owner",
        conteudo: "Qual é a função central desempenhada pelo Product Owner na história Scrum?",
        answer: [
            {text: "Definir a arquitetura técnica do produto", correct: false},
            {text: "Gerenciar o cronograma de desenvolvimento da equipe", correct: false},
            {text: "Priorizar o backlog do produto e representar os interesses do cliente", correct: true},
            {text: "Facilitar as reuniões de planejamento de sprint", correct: false}
        ]
    },
    {
        question: "História Scrum - Dev Team",
        conteudo: "Na história do Scrum, qual é o principal papel desempenhado pelo time de desenvolvimento?",
        answer: [
            {text: "Definir as metas de lançamento do produto", correct: false},
            {text: "Priorizar o backlog do produto e representar os interesses do cliente", correct: false},
            {text: "Executar a criação, teste e entrega das funcionalidades do produto. ", correct: true},
            {text: "Facilitar as reuniões de retrospectiva da equipe", correct: false}
        ]
    },
    {
        question: "Funções - Scrum Master",
        conteudo: "Dos itens citados abaixo, qual NÃO é de responsabilidade do Scrum Master?",
        answer: [
            {text: "Ter contato com o cliente para construir o Backlog", correct: true },
            {text: "Auxiliar a Dev Team na gestão das Sprints ", correct: false},
            {text: "Tratar dos impedimentos ao projeto", correct: false },
            {text: "Dirigir, liderar e aplicar a metodologia Scrum", correct: false},
        ]
    },
    {
        question: "Funções - Product Owner",
        conteudo: "Qual item abaixo é responsabilidade do PO (Product Owner)?",
        answer: [
            {text: "Ter contato com o cliente e elaborar o Backlog", correct: true},
            {text: "Treinar a equipe em autogestão", correct: false},
            {text: "Ajudar o Dev. Team com os Incrementos", correct: false},
            {text: "Criar um plano para o Sprint", correct: false}
        ]
    },
    {
        question: "Funções - Dev Team",
        conteudo: "Dentro do processo SCRUM, qual atividade é realizada pela Dev Team?",
        answer: [
            {text: "Elaboração do Backlog", correct: false},
            {text: "Comunicar os clientes quanto ao projeto", correct: false},
            {text: "Planejar reuniões diárias ", correct: false},
            {text: "Adaptar os planos em direção ao Sprint Goal", correct: true}
        ]
    },
    {
        question: "MVP - Geral",
        conteudo: "Qual o principal objetivo do MVP?",
        answer: [
            {text: "Validar hipóteses e testar viabilidade", correct: true},
            {text: "Organizar a Equipe de Desenvolvimento", correct: false},
            {text: "Listar os requisitos do cliente", correct: false},
            {text: "Auxiliar o Scrum Master na designação de tarefas", correct: false},
           
        ]
    },
    {
        question: "MVP - Geral",
        conteudo: "Em que área o conceito de MVP é amplamente utilizado?",
        answer: [
            {text: "Marketing digital", correct: false},
            {text: "Empreendedorismo e desenvolvimento de produtos", correct: true},
            {text: "Recursos humanos.", correct: false},
            {text: "Gerenciamento de pessoas", correct: false}
        ]
    },
    {
        question: "MVP - Geral",
        conteudo: "O que o MVP busca oferecer aos clientes??",
        answer: [
            {text: "Uma solução complexa para todos os seus problemas", correct: false},
            {text: "Uma versão simplificada que ainda atenda às suas necessidades básicas", correct: true},
            {text: "Um produto sem funcionalidade inicial ", correct: false},
            {text: "Todas as demandas finalizadas desde o início", correct: false}
        ]
    }
]
