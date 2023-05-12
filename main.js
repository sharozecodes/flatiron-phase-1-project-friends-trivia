fetch("http://localhost:3000/questions")
    .then(resp => resp.json())
    .then(questions => {

        let corrects = 0;
        let formContainer = document.querySelector('#form-container');
        let container = document.querySelector('#question-container');
        let optionsContainer = document.querySelector('#options-container');
        let nextBtn = document.querySelector('#next-btn');
        let currentQuestionIndex = 0;
        let playerName = '';
        //container.style.display = "none";

        function showQuestion() {
          //  formContainer.style.display = "none";
            // container.display = "block";
            const currentQuestion = questions[currentQuestionIndex];
            container.textContent = currentQuestion.question;
            optionsContainer.textContent = '';
            currentQuestion.options.forEach(option => {
                const label = document.createElement('label');
                const radioBtn = document.createElement('input');
                radioBtn.type = 'radio';
                radioBtn.name = 'option';
                radioBtn.value = option;
                label.appendChild(radioBtn);
                label.append(option);
                label.style.display = 'block';
                optionsContainer.appendChild(label);
            })
        }
        

        function checkAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        const answer = questions[currentQuestionIndex].answer;
        if (selectedOption === answer) {
            console.log('Correct!');
            corrects++;
        } else {
            console.log('Incorrect!');
        }
        }

        showQuestion();

        nextBtn.addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex === questions.length) {
            console.log('End of questionnaire!');
            endTrivia();
        }
        showQuestion();
        // console.log(corrects);
        });
        
        const form = document.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            playerName = event.target[0].value;
            //console.log(playerName);
            form.reset()
            let container = document.querySelector('#container');
            container.style.display = "block"
            formContainer.style.display = "none"


        })


        function endTrivia() {
            console.log(corrects);
            viewScoreBoard();


            let newPlayer = { player: playerName, score: corrects };

            fetch("http://localhost:3000/players", {
            method: "POST",
            body: JSON.stringify(newPlayer),
            headers: {
                "Content-Type": "application/json"
            }
            })



            const element = document.querySelector("#container");
            element.remove();
            let formCont = document.querySelector('#form-container');
            formCont.style.display = "flex";
            const newContainer = document.createElement("div");
            newContainer.id = "container";
            document.body.appendChild(newContainer);
            


            const tagLine = document.createElement('h2');
            tagLine.textContent = "Could this task BE any easier?";
            const questionContainer = document.createElement("div");
            questionContainer.id = "question-container";
            const optContainer = document.createElement("div");
            optContainer.id = "options-container";
            const btn = document.createElement("button");
            btn.id = "next-btn";
            btn.textContent = "Next";
            newContainer.appendChild(tagLine);
            newContainer.appendChild(questionContainer);
            newContainer.appendChild(optContainer);
            newContainer.appendChild(btn);
            corrects = 0;
            currentQuestionIndex = 0;
            container = document.querySelector('#question-container');
            optionsContainer = document.querySelector('#options-container');
            nextBtn = document.querySelector('#next-btn');
            showQuestion();
            nextBtn.addEventListener('click', () => {
                checkAnswer();
                currentQuestionIndex++;
                if (currentQuestionIndex === questions.length) {
                    console.log('End of questionnaire!');
                    newContainer.style.display = "none";
                    endTrivia();
                }
                showQuestion();
                console.log(corrects)
                });
        
        



        }
    });


    function viewScoreBoard(){
        fetch("http://localhost:3000/players")
            .then(resp => resp.json())
            .then(players => {

                console.log(players)})


    }


