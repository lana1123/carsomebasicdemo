import React from "react";
import Registration from "./components/auth/Registration";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes } from "date-fns";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slot_datetime: null,
      current_datetime: null,
      slotStatus: null, //available, full, invalid
    };
  }

  //to display the selected slot on the calendar
  handleChange = (value) => {
    console.log(value);

    this.setState({ current_datetime: value });
  };

  //to check if the selected slot has already been booked. if yes, ask to choose another slot. else, proceed with the booking
  handleClick = () => {
    const current_datetime = this.state.current_datetime;

    //cannot click submit if no date is selected
    if (!current_datetime) {
      this.setState({ slotStatus: "null" });
      return;
    }

    const current_datetimeString = current_datetime.toString();
    const getURL = "http://localhost:8000/api/" + current_datetimeString;

    const currentDate = current_datetime.toString().split(" ")[2];
    const currentHour = current_datetime.toString().split(" ")[4].split(":")[0];

    const today = new Date();
    const date = today.getDate();
    const hour = today.getHours();

    if (currentDate == date && currentHour <= hour) {
      this.setState({ slotStatus: "invalid" });
    } else {
      fetch(getURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length >= 4) {
            console.log(data.length);
            console.log("Slot is full. Please select another slot");
            this.setState({ slotStatus: "full" });
          } else if (
            data.length >= 2 &&
            current_datetime.toString().split(" ")[0] !== "Sat"
          ) {
            this.setState({ slotStatus: "full" });
          } else {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slot_datetime: current_datetimeString }),
            };
            fetch("http://localhost:8000/api/bookSlot", requestOptions)
              .then((response) => response.json())
              .then((data) =>
                this.setState({ slot_datetime: current_datetimeString })
              );
            this.setState({ slotStatus: "available" });
          }
        });
    }
  };

  render() {
    const slotStatus = this.state.slotStatus;
    let status = "";

    if (slotStatus === "full") {
      status = "This slot is not available. Kindly choose another slot.";
    } else if (slotStatus === "available") {
      status = "This slot has been reserved for you. See you soon!";
    } else if (slotStatus === "invalid") {
      status = "Cannot book for past and current hour";
    } else {
      status = "(No date selected yet)";
    }

    return (
      <div className="App">
        <h1>LET'S GET YOUR CAR INSPECTED!</h1>
        <div className="App-container">
          {/* <Registration /> */}
          <h2>MAKE AN APPOINTMENT</h2>
          <div className="operating-hours">
            Our operating hours is from Monday to Saturday, 9.00 am to 6.00 pm
          </div>
          <div className="datepicker-container">
            <DatePicker
              showPopperArrow={false}
              todayButton="Today"
              placeholderText="Click to select a date"
              locale="en-GB"
              minDate={new Date()}
              maxDate={addDays(new Date(), 20)}
              filterDate={(date) => date.getDay() !== 0}
              showTimeSelect
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 30), 17)}
              dateFormat="dd/MM/yyyy h:mm aa"
              selected={this.state.current_datetime}
              onChange={this.handleChange}
            />
          </div>
          <div className="button-container">
            <button className="button" onClick={this.handleClick}>
              Confirm
            </button>
          </div>

          <div className="status">Status: {status}</div>
        </div>
      </div>
    );
  }
}

export default App;
