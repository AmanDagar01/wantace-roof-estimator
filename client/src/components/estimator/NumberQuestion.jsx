const NumberQuestion = ({
    question,
    value,
    onChange,
  }) => {
    return (
      <div>
        <label className="mb-3 block text-lg font-semibold text-gray-900">
          {question.label}
        </label>
  
        {question.unit && (
          <p className="mb-2 text-sm text-gray-500">
            Enter the value in {question.unit}.
          </p>
        )}
  
        <input
          type="number"
          value={value ?? ""}
          min={question.min}
          max={question.max}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={`Between ${question.min} and ${question.max}`}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        />
  
        <p className="mt-2 text-sm text-gray-500">
          Range: {question.min}–{question.max}{" "}
          {question.unit}
        </p>
      </div>
    );
  };
  
  export default NumberQuestion;