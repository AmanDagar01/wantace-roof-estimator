import NumberQuestion from "./NumberQuestion";
import SelectQuestion from "./SelectQuestion";

const QuestionRenderer = ({
  question,
  value,
  onChange,
}) => {
  switch (question.type) {
    case "number":
      return (
        <NumberQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "select":
      return (
        <SelectQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    default:
      return (
        <p className="text-red-600">
          Unsupported question type:{" "}
          {question.type}
        </p>
      );
  }
};

export default QuestionRenderer;