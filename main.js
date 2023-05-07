fetch("http://localhost:3000/questions")
.then(resp => resp.json())
.then(questions => {
    const container = document.querySelector("ul#optionList");
    const ques = document.querySelector("#question");
    ques.textContent = questions[0].question;
    questions[0].options.forEach(element => {
        const opt = document.createElement("ul")
        opt.textContent = element;
        container.appendChild(opt);
    });
})