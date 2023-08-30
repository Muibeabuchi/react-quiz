function Options({ question, dispatch, answer, index }) {
  const hasAnswered = answer[index] !== undefined;
  const optionanswer = answer[index];
  // console.log(answer[index]);
  // console.log(hasAnswered);

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            index === optionanswer ? "answer" : ""
          } `}
          key={option}
          // disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

// ${
// hasAnswered
//   ? index === question.correctOption
//     ? "correct"
//     : "wrong"
//   : ""
// }
