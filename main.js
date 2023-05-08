fetch("http://localhost:3000/questions")
    .then(resp => resp.json())
    .then(questions => {
        let corrects = 0;
        const container = document.querySelector('#question-container');
        const optionsContainer = document.querySelector('#options-container');
        const nextBtn = document.querySelector('#next-btn');
        let currentQuestionIndex = 0;

        function showQuestion() {
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
            return;
        }
        showQuestion();
        console.log(corrects)
        });

        function endTrivia() {

            const element = document.querySelector("#container");
            element.remove();
            const newContainer = document.createElement("div");
            newContainer.id = "container";


        }
    });

// .then(questions => {
//     const container = document.querySelector("ul#optionList");
//     const ques = document.querySelector("#question");
//     ques.textContent = questions[0].question;
//     questions[0].options.forEach(element => {
//         const opt = document.createElement("ul")
//         opt.textContent = element;
//         container.appendChild(opt);
//     });
// })