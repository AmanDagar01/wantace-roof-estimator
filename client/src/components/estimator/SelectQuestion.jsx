const SelectQuestion = ({
    question,
    value,
    onChange,
  }) => {
    return (
      <div>
        <label className="mb-4 block text-lg font-semibold text-gray-900">
          {question.label}
        </label>
  
        <div className="space-y-3">
          {question.options.map((option) => {
            const selected =
              value === option.value;
  
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onChange(option.value)
                }
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-black bg-gray-100"
                    : "border-gray-200 bg-white hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
  
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? "border-black bg-black"
                        : "border-gray-300"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default SelectQuestion;