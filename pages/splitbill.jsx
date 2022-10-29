import { useState } from "react";

export default function SplitBill({}) {
  const [persons, setPersons] = useState([]);
  // const [name, setName] = useState('');
  // const [amount, setAmount] = useState("");
  const [person, setPerson] = useState({});
  const [error, setError] = useState("");
  console.log(person);
  const handleAddPreson = () => {
    const { name, amount } = person;
    if (!name || !amount) {
      setError("you have to fill both fields");
      return;
    }
    setPersons((prev) => [...prev, { name, amount }]);
    setPerson({});
    // setName("");
    // setAmount("");
  };

  const handleAddPresonPress = (e) => {
    if (e.key === "Enter") {
      handleAddPreson();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    console.log(value);
    setPerson((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          onKeyDown={handleAddPresonPress}
          value={person.name}
          placeholder="name"
          onChange={handleChange}
        />
        <input
          name="amount"
          type="number"
          onKeyDown={handleAddPresonPress}
          value={person.amount}
          placeholder="amount"
          onChange={handleChange}
        />

        <button onClick={handleAddPreson}> add person</button>
      </div>
      <ul>
        {persons.map((person) => (
          <li>{person.name + " " + person.amount}</li>
        ))}
      </ul>
    </div>
  );
}
