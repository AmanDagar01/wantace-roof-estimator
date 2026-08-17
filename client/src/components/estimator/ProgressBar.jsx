const ProgressBar = ({
    current,
    total,
  }) => {
    const percentage =
      total === 0
        ? 0
        : ((current + 1) / total) * 100;
  
    return (
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
          <span>
            Step {current + 1} of {total}
          </span>
  
          <span>
            {Math.round(percentage)}%
          </span>
        </div>
  
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-black transition-all duration-300"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  };
  
  export default ProgressBar;