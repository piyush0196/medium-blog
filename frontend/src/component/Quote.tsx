import React from "react";

const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-2xl font-bold">
            "The customer servoce I receiver was exceptional. The support team
            went above & beyond to address my concerns."
          </div>
          <div className="max-w-md text-left text-xl font-semibold mt-4">
            Julies winfield
          </div>
          <div className="max-w-md text-left text-sm text-slate-400 font-light">
            CEO, Acme inc
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
