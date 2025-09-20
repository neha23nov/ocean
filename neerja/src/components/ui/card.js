import * as React from "react";

export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-xl border bg-white/5 shadow p-4 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={`mb-2 font-semibold text-lg ${className}`} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={`text-sm ${className}`} {...props} />;
}
