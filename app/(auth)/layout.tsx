import React from "react";
import "../globals.css";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export default AuthLayout;
