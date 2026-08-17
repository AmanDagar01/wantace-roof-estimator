const ContactForm = ({
    contact,
    onChange,
  }) => {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Where should we send your estimate?
          </h2>
  
          <p className="mt-2 text-gray-500">
            Enter your contact details so Northline
            Roofing & Exteriors can follow up.
          </p>
        </div>
  
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>
  
            <input
              type="text"
              value={contact.name}
              onChange={(event) =>
                onChange("name", event.target.value)
              }
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
  
          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone
            </label>
  
            <input
              type="tel"
              value={contact.phone}
              onChange={(event) =>
                onChange(
                  "phone",
                  event.target.value
                )
              }
              placeholder="+1 614 555 0100"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
  
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>
  
            <input
              type="email"
              value={contact.email}
              onChange={(event) =>
                onChange(
                  "email",
                  event.target.value
                )
              }
              placeholder="john@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactForm;