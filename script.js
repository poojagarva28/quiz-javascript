const body = document.body;
body.style.backgroundColor = "#54c3ef";

const quizHeading = document.createElement("h2");
quizHeading.innerHTML = "The Quiz App";
body.appendChild(quizHeading);

const quizContainer = document.createElement("div");
quizContainer.classList.add("quizcontainer");
body.appendChild(quizContainer);

let score = 0;

const scoreBoard = document.createElement("div");
scoreBoard.classList.add("scoreboard");
const scoreHeading = document.createElement("h4");
scoreHeading.innerHTML = "Score:";
scoreBoard.appendChild(scoreHeading);
const scoreresult = document.createElement("h4");
scoreresult.innerHTML = `${score} / 5`;
scoreBoard.appendChild(scoreresult);
body.appendChild(scoreBoard);

const getQuizdata = function () {
  axios
    .get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz")
    .then((resp) => {
      const responseData = resp.data;

      const formContainer = document.createElement("form");
      quizContainer.appendChild(formContainer);

      responseData.map((item) => {
        const question = document.createElement("h3");
        question.innerHTML = `Q${item.id}. ${item.question}`;
        formContainer.appendChild(question);

        item.options.map((option, j) => {
          const quizOptions = document.createElement("input");
          quizOptions.value = option;
          quizOptions.type = "radio";
          quizOptions.name = `option for question ${item.id}`;
          quizOptions.id = option;
          const quizLabel = document.createElement("label");
          quizLabel.setAttribute("for", option);
          quizLabel.innerText = option;
          formContainer.appendChild(quizOptions);
          formContainer.appendChild(quizLabel);
          const br = document.createElement("br");
          formContainer.appendChild(br);
          const br2 = document.createElement("br");
          formContainer.appendChild(br2);

          // answer checking
          quizOptions.addEventListener("change", function (e) {
            let selectedAnswer;
            let answer;
            selectedAnswer = j + 1;
            answer = item.answer;
            console.log(selectedAnswer);
            if (selectedAnswer === answer) {
              score++;
            }
          });
        });
        const hr = document.createElement("hr");
        const br = document.createElement("br");
        formContainer.appendChild(br);
        formContainer.appendChild(hr);
        formContainer.appendChild(br);
      });

      // submit
      const btnContainer = document.createElement("div");
      btnContainer.style.textAlign = "center";
      const btn = document.createElement("input");
      btn.type = "submit";
      btnContainer.appendChild(btn);
      formContainer.appendChild(btnContainer);

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("final score", score);
        scoreresult.innerHTML = `${score} / 5`;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getQuizdata();
