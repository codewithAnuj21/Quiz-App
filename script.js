const question = [
    {
      question: "What is a correct syntax to output 'Hello World' in Python?",
      answers:[
    {text: 'echo "Hello World"'  , correct:false},
    {text: "p ('Hello World') " , correct:false},
    {text: 'print "Hello World" ' , correct:true},
    {text: 'echo ("Hello World") ' , correct:false},
      ]
    },
  
      {
        question: "How do you insert COMMENTS in Python code?",
        answers:[
      {text: "#"  , correct:true},
      {text: "//" , correct:false},
      {text: "<--!" , correct:false},
      {text: "/** / */" , correct:false},
        ]
      },
    {
      question:"How do you insert COMMENTS in JS code?",
      answers:[
        {text: "#"  , correct:false},
        {text: "//" , correct:false},
        {text: "<--!" , correct:false},
        {text: "/* */" , correct:true},
        ]
    }
  ];
  
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-button");
  const nextbutton = document.getElementById("next-btn");
  
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz(){
     currentQuestionIndex = 0;
     score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
  }
  
   function showQuestion(){
     // befor display question we add a function ( resetStat that will hide previous question and answer)
     resetState();
     let currentQuestion = question[currentQuestionIndex];
     let questionNo = currentQuestionIndex+1;
     questionElement.innerHTML = questionNo + "." + currentQuestion.question;
  
     // code to display answer
     currentQuestion.answers.forEach(answer =>{
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
  
       if(answer.correct){
         button.dataset.correct = answer.correct; // it will add true or false in data set
       }
       button.addEventListener("click",selectAnswer);
     });
   }
  
  function resetState(){
    nextbutton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else{
      selectedBtn.classList.add("incorrect");
    }
    // if we click on wrong answer then automaticallt it show right ans
    Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct == "true"){
        button.classList.add("correct")
      }
      button.disabled = true;
    });
    nextbutton.style.display = "block"
  }
  
  
  function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score is ${score}out of ${question.length}`
    nextbutton.innerHTML = "Play Again"
    nextbutton.style.display = "block  "
  }
  
  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
      showQuestion();
    }else {
      showScore()
    }
  }
  
  
  nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex < question.length){
      handleNextButton(); // function
    }else{
      startQuiz()
    }
  })
  startQuiz()
  
  
  
  