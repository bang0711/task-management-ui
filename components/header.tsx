import React from "react";

type Props = {
  title: string;
  description?: string;
};

function Header({ title, description }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm font-medium">{description}</p>
    </div>
  );
}

export default Header;
