import * as React from "react";

export function Accordion({ children }) {
  return <div className="divide-y divide-gray-700">{children}</div>;
}

export function AccordionItem({ children }) {
  return <div className="py-2">{children}</div>;
}

export function AccordionTrigger({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left font-medium py-2 hover:text-blue-400"
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children }) {
  return <div className="text-sm text-gray-400 pl-2">{children}</div>;
}
