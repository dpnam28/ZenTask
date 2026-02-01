import React from "react";
import "@/app/globals.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default layout;
