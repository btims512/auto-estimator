import React, { createContext, useState } from "react";

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [data, setData] = useState({});
  const updateData = (fields) => setData((prev) => ({ ...prev, ...fields }));
  return (
    <FormContext.Provider value={{ data, updateData }}>
      {children}
    </FormContext.Provider>
  );
}
