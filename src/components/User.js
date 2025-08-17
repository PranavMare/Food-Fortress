import React from "react";
import { useState } from "react";

const User = ({ name, location, contact }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {});

  const fetchData = async () => {
    const data = await fetch("https://api.github.com/users/PranavMare");
  };

  return (
    <div className="user-card">
      <h1>Functional Component</h1>
      <h1>{count}</h1>
      <h2>Name: {name}</h2>
      <h3>Location: {location}</h3>
      <h4>Contact: {contact}</h4>
    </div>
  );
};

export default User;
