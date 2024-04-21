import "./GetChambers.css";
import { URL_ORIGIN } from "../../constants";
import { useState } from "react";
export default function GetChambers(props) {
  const [capacity, setCapacity] = useState("");
  const [commodities, setCommodities] = useState("");
  const [duration, setDuration] = useState("");
  async function handleSubmit(e) {
    // This will prevent page refresh
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const chambers = await fetch(`${URL_ORIGIN}/customers/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          space: capacity,
          item: commodities,
          duration: duration,
          token: token,
        }),
      });
      console.log("chambers = ",chambers);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.toggle}>
          X
        </span>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            className="txt"
            placeholder="Volume in meter cube"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
          <label htmlFor="commodities">Commodities</label>
          <input
            id="commodities"
            type="text"
            className="txt"
            placeholder="Commodity Name"
            value={commodities}
            onChange={(e) => setCommodities(e.target.value)}
            required
          />
          <label htmlFor="duration">Duration</label>
          <input
            id="duration"
            type="number"
            className="txt"
            placeholder="Storage Duration in Days"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <br />
          <button className="chamberAdd" type="submit" onClick={handleSubmit}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
