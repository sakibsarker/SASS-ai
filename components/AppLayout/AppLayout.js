import React from "react";

export const AppLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-[300px_1fr]">
      <div>this is app layout</div>
      <div>{children}</div>
    </div>
  );
};
