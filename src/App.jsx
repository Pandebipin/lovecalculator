import { useEffect, useState } from "react";
import "./App.css";
import { saveLovePercentToFirestore } from "./store/userSlice";
import { useDispatch } from "react-redux";
import Heart from "./component/Heart";

function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState("");
  const [quote, setquote] = useState("");
  const [showCard, setShowCard] = useState(false);
  const dispatch = useDispatch();
  const calculatepercentage = () => {
    if (!name1 || !name2) {
      setError("Please enter both names.");
      setShowCard(false); // Hide card if error exists
      return;
    }

    setError("");
    const combinedTwoName = name1.trim() + name2.trim();
    let sum = 0;
    for (let i = 0; i < combinedTwoName.length; i++) {
      sum += combinedTwoName.charCodeAt(i);
    }
    const lovepercentage = sum % 100;
    setPercentage(lovepercentage);
    const loveData = {
      name1: name1,
      name2: name2,
      lovepercentage: percentage,
    };

    if (lovepercentage >= 80) {
      setquote("Youre are a perfect match! true love indeed");
    } else if (lovepercentage >= 60) {
      setquote("you have a strong connection.Nurture it!");
    } else if (lovepercentage >= 40) {
      setquote("there is potential,but love needs more work.");
    } else if (lovepercentage == 0) {
      setquote(
        "This shows that u are not going to a good relationships or by some reasons of being relatives.Based on your situation"
      );
    } else {
      setquote("love is unpredictable.Give it time and care.");
    }
    dispatch(saveLovePercentToFirestore(loveData));
    console.log(loveData);

    setShowCard(true);
  };
  return (
    <div className="app1">
      <div className="bg-img"></div>
      <div className="app">
        <h1 className="h1">love percentage calculator</h1>
        <p className="p">
          Here is the Love Calculator that lets you calculate love compatibility
          and your chances of a successful relationship.
        </p>

        <Heart />
        <div className="inputs">
          <input
            type="text"
            className="input"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <input
            className="input"
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />

          <button className="submit" onClick={calculatepercentage}>
            submit
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
        {showCard && (
          <div className="love-card">
            <p className="h1">Love percentage: {percentage}%</p>
            <p className="quote">{quote}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
