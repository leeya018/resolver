import { useEffect, useRef, useState } from "react";

const initPersons = [
  { name: "lee", amount: 20 },
  { name: "roni", amount: 100 },
  { name: "eden", amount: 50 },
  { name: "radri", amount: 30 },
  { name: "idaen", amount: 500 },
];
export default function SplitDebts({}) {
  const [persons, setPersons] = useState(initPersons);
  const [person, setPerson] = useState({ name: "", amount: "" });
  const [error, setError] = useState("");
  const [resDebtsArr, setResDebtsArr] = useState([]);
  console.log(person);

  const nameRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleAddPreson = () => {
    const { name, amount } = person;
    if (!name || !amount) {
      setError("you have to fill both fields");
      return;
    }
    setPersons((prev) => [...prev, { name, amount }]);
    setPerson({ name: "", amount: "" });
    nameRef.current.focus();
  };

  const handleAddPresonPress = (e) => {
    if (e.key === "Enter") {
      handleAddPreson();
    }
  };

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    console.log(e);
    console.log(value);

    setPerson((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  const splitDebts = () => {
    if (!persons.length) {
      setError("you must have at least one person");
      return;
    }
    const totalSum = persons.reduce((sum, person) => sum + person.amount, 0);
    const averageSum = (totalSum / persons.length).toFixed(2);
    const sortedPersons = persons.sort(
      (p1, p2) => p1.amount - p2.amount - p2.amount
    );
    let sortedMinusAvg = sortedPersons
      .map((person) => ({
        ...person,
        amount: person.amount - averageSum,
      }))
      .filter((person) => person.amount !== 0);
    // console.log(totalSum);
    console.log(averageSum);
    // console.log(sortedPersons);
    // console.log(sortedMinusAvg);
    let arrOfDebtes = [];
    while (sortedMinusAvg.length) {
      const first = sortedMinusAvg[0];
      const last = sortedMinusAvg[sortedMinusAvg.length - 1];
      if (sortedMinusAvg.length === 2) {
        sortedMinusAvg.shift();
        sortedMinusAvg.pop();
      } else if (first.amount + last.amount > 0) {
        sortedMinusAvg[sortedMinusAvg.length - 1].amount += first.amount;
        sortedMinusAvg[sortedMinusAvg.length - 1].amount = parseFloat(
          sortedMinusAvg[sortedMinusAvg.length - 1].amount.toFixed(2)
        );
        sortedMinusAvg.shift();
      } else if (first.amount + last.amount < 0) {
        sortedMinusAvg[0].amount += parseFloat(last.amount.toFixed(2));

        sortedMinusAvg.pop();
      }
      arrOfDebtes.push({
        from: first.name,
        amount: Math.abs(first.amount),
        to: last.name,
      });
    }
    setResDebtsArr(arrOfDebtes);
    console.log(resDebtsArr);
  };
  return (
    <div>
      <div className="absolute top-0 left-0 w-[25vw]">
        <h2 className="font-bold">how to use</h2>
        <p className="">
          when you are going to a trip and while those days each one gonna pay
          for something. and in the end you need to know who do you need to give
          money to. this program will help you to calculate which person have to
          give money to. it will show the smallest amount of transfers that can
          be made. in those text boxes, just put the name of the person and the
          amount of money he spend . you can add as many people that you want .
          after 2 people that you add, you can start make the calculations by
          clicking on split debts
        </p>
      </div>
      <div className="relative flex flex-col items-center w-[50%] mx-auto">
        <h2 className="font-bold">Debts between friends</h2>
        <div>
          {error && <div className="bg-red-400">{error}</div>}
          <input
            type="text"
            name="name"
            onKeyDown={handleAddPresonPress}
            value={person.name}
            placeholder="name"
            ref={nameRef}
            onChange={handleChange}
          />
          <input
            name="amount"
            type="number"
            onKeyDown={handleAddPresonPress}
            value={person.amount}
            placeholder="amount"
            ref={amountRef}
            onChange={handleChange}
          />

          <button onClick={handleAddPreson}> add person</button>
        </div>
        {persons.length >= 2 && (
          <button onClick={splitDebts}>split debts</button>
        )}
        <ul>
          {persons.map((person, key) => (
            <li key={key}>
              {person.name + " pays " + person.amount + " shekels"}
            </li>
          ))}
        </ul>
        {resDebtsArr.length > 0 && (
          <h2 className="font-bold my-5">who needs to pay to whom:</h2>
        )}
        <ul>
          {resDebtsArr.map((p, key) => (
            <li key={key}>
              <span className="font-bold">{p.from}</span>
              <span> should give </span>
              <span className="font-bold">{p.amount}</span>
              <span> shekels to </span>
              <span className="font-bold">{p.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
