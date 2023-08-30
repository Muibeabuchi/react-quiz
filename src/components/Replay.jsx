import React from "react";

// import Question from "./Question";

export default function Replay({ answers, questions }) {
  let failedAnswers = answers?.filter(
    (q, i) => q !== questions[i]?.correctOption
  );

  let failedQuestions = questions?.filter(
    (q, i) => q?.correctOption !== answers[i]
  );
  // console.log(failedQuestions);
  // console.log(failedAnswers);
  if (failedAnswers.length > 0) {
    return (
      <div>
        <h2>These are the questions you got wrong 👇</h2>

        <section>
          {failedQuestions?.map((fq, i) => {
            return (
              <React.Fragment key={i}>
                <h4>{fq.question}</h4>

                <div className="options">
                  {fq?.options?.map((option, index) => (
                    <div key={index}>
                      <button
                        className={`btn btn-option  ${
                          index === fq.correctOption ? "correct" : "wrong"
                        } ${failedAnswers[i] === index ? "answer" : ""}`}

                        // disabled={hasAnswered}
                        //   onClick={() => dispatch({ type: "newAnswer", payload: index })}
                      >
                        {option}
                      </button>
                      {/* {failedAnswers[i] === index && <p>your choice</p>} */}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </section>
      </div>
    );
  }
}
