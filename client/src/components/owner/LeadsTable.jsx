const LeadsTable = ({ leads }) => {
    const formatDate = (value) => {
      return new Date(value).toLocaleString();
    };
  
    const formatCurrency = (value) => {
      return new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }
      ).format(value);
    };
  
    if (!leads.length) {
      return (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          No leads have been submitted yet.
        </div>
      );
    }
  
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Homeowner
                </th>
  
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Contact
                </th>
  
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Estimate
                </th>
  
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Config
                </th>
  
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Submitted
                </th>
              </tr>
            </thead>
  
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {lead.name}
                    </p>
                  </td>
  
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-900">
                      {lead.email}
                    </p>
  
                    <p className="mt-1 text-sm text-gray-500">
                      {lead.phone}
                    </p>
                  </td>
  
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-medium">
                      {formatCurrency(
                        lead.estimate_low
                      )}
                      {" – "}
                      {formatCurrency(
                        lead.estimate_high
                      )}
                    </p>
                  </td>
  
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                      v{lead.config_version}
                    </span>
                  </td>
  
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(
                      lead.captured_at
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default LeadsTable;