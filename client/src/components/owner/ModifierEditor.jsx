const ModifierEditor = ({
    modifiers,
    onChange,
  }) => {
    const update = (
      field,
      value
    ) => {
      onChange({
        ...modifiers,
        [field]: Number(value),
      });
    };
  
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Pricing Modifiers
          </h2>
  
          <p className="mt-1 text-sm text-gray-500">
            Adjust the global pricing modifiers used
            by the estimator.
          </p>
        </div>
  
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Waste Factor
            </label>
  
            <input
              type="number"
              step="0.01"
              value={modifiers.waste_factor}
              onChange={(event) =>
                update(
                  "waste_factor",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
  
            <p className="mt-1 text-xs text-gray-500">
              Example: 0.10 = 10%
            </p>
          </div>
  
          <div>
            <label className="mb-2 block text-sm font-medium">
              Permit Flat Fee
            </label>
  
            <input
              type="number"
              min="0"
              value={
                modifiers.permit_flat_fee
              }
              onChange={(event) =>
                update(
                  "permit_flat_fee",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>
  
          <div>
            <label className="mb-2 block text-sm font-medium">
              Range Spread %
            </label>
  
            <input
              type="number"
              min="0"
              value={
                modifiers.range_spread_pct
              }
              onChange={(event) =>
                update(
                  "range_spread_pct",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default ModifierEditor;