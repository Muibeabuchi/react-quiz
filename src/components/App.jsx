import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import BackButton from "./BackButton";
import Replay from "./Replay";

import { data } from "../data/questions.js";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questionIndex: 0,
  answers: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 10 * SECS_PER_QUESTION
      };
    case "newAnswer": {
      // const questionarrayindex =  state.answers.findIndex(index=> index)

      // CHECK IF ANSWER EXISTS
      // function checkifanswerexists(array){
      // }
      const question = state.questions.at(state.questionIndex);
      const answer = state.answers[state.questionIndex];
      let oldanswers = [...state.answers];

      if (answer === action.payload) {
        oldanswers.splice(state.questionIndex, 1, -1);
      } else {
        oldanswers.splice(state.questionIndex, 1, action.payload);
      }
      // console.log(oldanswers);

      return {
        ...state,
        answers: oldanswers,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      };
    }
    case "previousquestion": {
      return { ...state, questionIndex: state.questionIndex - 1 };
    }
    case "nextQuestion": {
      // const question = state.questions.at(state.questionIndex);

      let answer;
      const answerexist = state.answers[state.questionIndex];
      if (answerexist === undefined) {
        answer = -1;
      } else if (answerexist !== undefined) {
        answer = answerexist;
      }
      const oldanswers = [...state.answers];
      const newanswers = oldanswers.splice(state.questionIndex, 1, answer);

      // console.log(answer);
      console.log(oldanswers);

      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answers: oldanswers
        // points:
        //   action.payload === question.correctOption
        //     ? state.points + question.points
        //     : state.points,
      };
    }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // return {
    //   ...state,
    //   points: 0,
    //   highscore: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",
    // };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      };

    default:
      throw new Error("Action unkonwn");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      questionIndex,
      answers,
      points,
      highscore,
      secondsRemaining
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    dispatch({ type: "dataReceived", payload: data });
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={questionIndex}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answers}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              answer={answers}
              index={questionIndex}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answers}
                numQuestions={numQuestions}
                index={questionIndex}
              />
              <BackButton
                dispatch={dispatch}
                answer={answers}
                numQuestions={numQuestions}
                index={questionIndex}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <div className="finished">
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
            <Replay
              answers={answers}
              questions={questions}
              // question={questions[questionIndex]}
              dispatch={dispatch}
              // answer={answers}
              // index={questionIndex}
            />
          </div>
        )}
      </Main>
    </div>
  );
}
