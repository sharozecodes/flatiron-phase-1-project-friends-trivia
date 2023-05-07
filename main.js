fetch("http://localhost:3000/questions")
.then(resp => resp.json())
.then(questions => console.log(questions[0]))