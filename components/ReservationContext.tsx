"use client";

import { createContext, useContext } from "react";
import { useState } from "react";

interface ReservationContextType {
  range: { from: Date | undefined; to: Date | undefined };
  setRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType>({
  range: { from: undefined, to: undefined },
  setRange: () => {},
  resetRange: () => {},
});
    
function ReservationProvider({ children }: { children: React.ReactNode }) {
    
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const resetRange = () => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
