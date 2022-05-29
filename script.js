// UNCOMMENT THE LINE NO.119 IF YOU WANT TO CONSOLE THE SELECTED RESULT
// UNCOMMENT THE LINE NO.132 IF YOU WANT TO CHECK CORRECT RESULT FROM BACKEND

const body = document.body;
body.style.backgroundColor = "#54c3ef";

const quizHeading = document.createElement("h2");
quizHeading.innerHTML = "The Quiz App";
body.appendChild(quizHeading);

const flexContainer = document.createElement("div");
flexContainer.classList.add("flexcontainer");
body.appendChild(flexContainer);

const quizContainer = document.createElement("div");
quizContainer.classList.add("quizcontainer");
flexContainer.appendChild(quizContainer);

let score = 0;
const checkItem = [];

const scoreBoard = document.createElement("div");
scoreBoard.classList.add("scoreboard");
const scoreHeading = document.createElement("h4");
scoreHeading.innerHTML = "Score:";
scoreBoard.appendChild(scoreHeading);
const scoreresult = document.createElement("h4");
scoreresult.innerHTML = `${score} / 5`;
scoreBoard.appendChild(scoreresult);
flexContainer.appendChild(scoreBoard);

const btn = document.createElement("input");

let backendAns = [];

const getQuizdata = function () {
  axios
    .get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz")
    .then((resp) => {
      const responseData = resp.data;

      const formContainer = document.createElement("form");
      quizContainer.appendChild(formContainer);

      responseData.map((item, i) => {
        backendAns.push(item.options[item.answer - 1]);
        const question = document.createElement("h3");
        question.innerHTML = `Q${item.id}. ${item.question}`;
        formContainer.appendChild(question);
        // let answer = item.answer;

        item.options.map((option, j) => {
          const quizOptions = document.createElement("input");
          quizOptions.value = option;
          quizOptions.type = "radio";
          quizOptions.required = true;
          quizOptions.name = `option for question ${item.id}`;
          quizOptions.id = option + i;
          const quizLabel = document.createElement("label");
          quizLabel.setAttribute("for", option + i);
          quizLabel.innerText = option;
          formContainer.appendChild(quizOptions);
          formContainer.appendChild(quizLabel);
          const br = document.createElement("br");
          formContainer.appendChild(br);
          const br2 = document.createElement("br");
          formContainer.appendChild(br2);

          // BElOW COMMENTED CODE WON'T WORK | REASON : WHEN WE CLICK CORRECT ANSWER, THEN INCORRECT, THEN AGAIN CORRECT; IT WILL INCREASE COUNT
          // answer checking -
          // quizOptions.addEventListener("change", function (e) {
          // let selectedAnswer;
          // selectedAnswer = j + 1;
          // if (selectedAnswer === answer) {
          //   score++;
          // }
          // console.log("score", score);
          //   });
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
      btn.type = "submit";
      btnContainer.appendChild(btn);
      formContainer.appendChild(btnContainer);

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedAnswer = document.getElementsByTagName("input");
        const selectRadio = [];
        const answerLength = selectedAnswer.length - 1;
        for (i = 0; i < answerLength; i++) {
          if (selectedAnswer[i].checked) {
            selectRadio.push(selectedAnswer[i].value);
          } else {
            selectRadio.push("");
          }
        }

        // get every questions' options
        const chunkSize = 4;
        let chunk;
        var filtered;
        for (let i = 0; i < selectRadio.length; i += chunkSize) {
          chunk = selectRadio.slice(i, i + chunkSize);
          filtered = chunk.filter(function (el) {
            return el != "";
          });
          filtered = filtered.toString();
          checkItem.push(filtered);
        }
        // console.log("selected answers", checkItem);

        // checking selected answers with correct backend answers
        for (let i = 0; i < backendAns.length; i++) {
          if (backendAns[i] === checkItem[i]) {
            score++; // increasing count if answer is correct
          }
        }
        // console.log("score", score);
        scoreresult.innerHTML = `${score} / 5`;

        btn.disabled = true;
      });
      // console.log("backend answers", backendAns);
    })
    .catch((err) => {
      console.log("there is some error, Please try again", err);
    });
};

getQuizdata();
