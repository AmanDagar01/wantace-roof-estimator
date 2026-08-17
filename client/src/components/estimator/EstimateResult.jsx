const EstimateResult = ({
    estimate,
    currency = "USD",
  }) => {
    const formatter = new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }
    );
  
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Estimated roofing cost
        </p>
  
        <div className="mt-3">
          <span className="text-4xl font-bold text-gray-900">
            {formatter.format(estimate.low)}
          </span>
  
          <span className="mx-2 text-2xl text-gray-400">
            –
          </span>
  
          <span className="text-4xl font-bold text-gray-900">
            {formatter.format(estimate.high)}
          </span>
        </div>
  
        <p className="mt-4 text-sm leading-6 text-gray-500">
          This is an estimate based on the information
          you provided. A Northline Roofing & Exteriors
          representative can provide a more detailed
          quote after reviewing your property.
        </p>
      </div>
    );
  };
  
  export default EstimateResult;