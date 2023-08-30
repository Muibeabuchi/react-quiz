// import React from 'react'

export default function BackButton({ dispatch, answer, numQuestions, index }) {
  if (index < 1) return null;
  if (index >= 1) {
    return (
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "previousquestion" })}
      >
        Back
      </button>
    );
  }
}
