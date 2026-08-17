const QuestionEditor = ({
    question,
    onChange,
  }) => {
    const updateQuestion = (
      changes
    ) => {
      onChange({
        ...question,
        ...changes,
      });
    };
  
    const updateOption = (
      index,
      changes
    ) => {
      const options = [
        ...question.options,
      ];
  
      options[index] = {
        ...options[index],
        ...changes,
      };
  
      updateQuestion({
        options,
      });
    };
  
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {question.key}
            </p>
  
            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              {question.label}
            </h3>
          </div>
  
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={question.active}
              onChange={(event) =>
                updateQuestion({
                  active:
                    event.target.checked,
                })
              }
              className="h-4 w-4"
            />
  
            Active
          </label>
        </div>
  
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">
            Question label
          </label>
  
          <input
            type="text"
            value={question.label}
            onChange={(event) =>
              updateQuestion({
                label:
                  event.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>
  
        {question.type === "number" && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Minimum
              </label>
  
              <input
                type="number"
                value={question.min ?? ""}
                onChange={(event) =>
                  updateQuestion({
                    min: Number(
                      event.target.value
                    ),
                  })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>
  
            <div>
              <label className="mb-2 block text-sm font-medium">
                Maximum
              </label>
  
              <input
                type="number"
                value={question.max ?? ""}
                onChange={(event) =>
                  updateQuestion({
                    max: Number(
                      event.target.value
                    ),
                  })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>
          </div>
        )}
  
        {question.type === "select" && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900">
              Options
            </h4>
  
            <div className="mt-3 space-y-4">
              {question.options.map(
                (option, index) => (
                  <div
                    key={option.value}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Label
                        </label>
  
                        <input
                          type="text"
                          value={
                            option.label
                          }
                          onChange={(
                            event
                          ) =>
                            updateOption(
                              index,
                              {
                                label:
                                  event
                                    .target
                                    .value,
                              }
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                        />
                      </div>
  
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Value
                        </label>
  
                        <input
                          type="text"
                          value={
                            option.value
                          }
                          disabled
                          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-500"
                        />
                      </div>
                    </div>
  
                    {option.rate_per_sqft !==
                      undefined && (
                      <div className="mt-3">
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Rate per sq ft
                        </label>
  
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={
                            option.rate_per_sqft
                          }
                          onChange={(
                            event
                          ) =>
                            updateOption(
                              index,
                              {
                                rate_per_sqft:
                                  Number(
                                    event
                                      .target
                                      .value
                                  ),
                              }
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                        />
                      </div>
                    )}
  
                    {option.multiplier !==
                      undefined && (
                      <div className="mt-3">
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Multiplier
                        </label>
  
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={
                            option.multiplier
                          }
                          onChange={(
                            event
                          ) =>
                            updateOption(
                              index,
                              {
                                multiplier:
                                  Number(
                                    event
                                      .target
                                      .value
                                  ),
                              }
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                        />
                      </div>
                    )}
  
                    {option.tear_off_per_sqft !==
                      undefined && (
                      <div className="mt-3">
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Tear-off per sq ft
                        </label>
  
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={
                            option.tear_off_per_sqft
                          }
                          onChange={(
                            event
                          ) =>
                            updateOption(
                              index,
                              {
                                tear_off_per_sqft:
                                  Number(
                                    event
                                      .target
                                      .value
                                  ),
                              }
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>
    );
  };
  
  export default QuestionEditor;