import Options from "./Options";

function Question({ question, dispatch, answer, index }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        index={index}
        answer={answer}
      />
    </div>
  );
}

export default Question;
