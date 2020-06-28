import React, { useState, useContext, useEffect } from "react";
import AppointmentService from "../Services/AppointmentService";
import { AuthContext } from "../Context/AuthContext";
import Message from "../components/Message";
import DatePicker from "react-datepicker";
import "../App.css";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes } from "date-fns";

const Home = (props) => {
  const [current_datetime, setCurrent_datetime] = useState(null);
  const [message, setMessage] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);
  const authContext = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    AppointmentService.getAppointment(authContext.user.username).then(
      (data) => {
        if (data) {
          setAppointments(data);
          setSlotStatus("initialize");
        }
      }
    );
  }, []);

  //to check if the selected slot has already been booked. if yes, ask to choose another slot. else, proceed with the booking
  const handleClick = () => {
    if (!authContext.isAuthenticated) setSlotStatus("not logged in");
    else {
      setCurrent_datetime(current_datetime);
      //cannot click submit if no date is selected
      if (!current_datetime) {
        setCurrent_datetime(null);
        return;
      }
      const current_datetimeString = current_datetime.toString();
      const currentDate = current_datetime.toString().split(" ")[2];
      const currentHour = current_datetime
        .toString()
        .split(" ")[4]
        .split(":")[0];

      const today = new Date();
      const date = today.getDate();
      const hour = today.getHours();

      if (currentDate === date && currentHour <= hour) {
        setSlotStatus("invalid");
      } else {
        if (appointments) {
          appointments.map((appointment) => {
            if (appointment.slot_datetime) {
              setSlotStatus("existing");
              return;
            } else {
              AppointmentService.checkAppointments(current_datetimeString).then(
                (data) => {
                  if (data.length >= 4) {
                    setSlotStatus("full");
                  } else if (
                    data.length >= 2 &&
                    current_datetime.toString().split(" ")[0] !== "Sat"
                  ) {
                    setSlotStatus("full");
                  } else {
                    AppointmentService.postAppointment({
                      slot_datetime: current_datetimeString,
                    }).then((data) => {
                      const { slot_datetime } = data;
                      if (slot_datetime) {
                        setSlotStatus("available");
                      } else {
                        setSlotStatus("error");
                        setMessage(message);
                      }
                    });
                    AppointmentService.postAppointmentUser(
                      appointment.username,
                      {
                        slot_datetime: current_datetimeString,
                      }
                    ).then((data) => {
                      setSlotStatus("available");
                    });
                  }
                }
              );
            }
          });
        }
      }
    }
  };

  const displayStatus = () => {
    if (slotStatus === "invalid") {
      return "Cannot book for past and current hour";
    } else if (slotStatus === "available") {
      return "This slot has been reserved for you. See you soon!";
    } else if (slotStatus === "invalid") {
      return "Cannot book for past and current hour";
    } else if (slotStatus === "toConfirm") {
      return "(Kindly click confirm to proceed)";
    } else if (slotStatus === "existing") {
      return "You have already made an appointment. Kindly check the appointment page";
    } else if (slotStatus === "error") {
      return "An error has occurred. Kindly try again later";
    } else if (slotStatus === "full") {
      return "This slot is not available. Kindly choose another slot";
    } else if (slotStatus === "not logged in") {
      return "Kindly register and login to make an appointment";
    } else {
      return "(No date selected yet)";
    }
  };

  return (
    <div className="App">
      <h1>LET'S GET YOUR CAR INSPECTED!</h1>
      <div className="App-container">
        <h2>MAKE AN APPOINTMENT</h2>
        <div className="operating-hours">
          Our operating hours is from Monday to Saturday, 9.00 am to 6.00 pm
        </div>
        <div className="datepicker-container">
          <DatePicker
            showPopperArrow={false}
            todayButton="Today"
            placeholderText="Click to select a date"
            minDate={new Date()}
            maxDate={addDays(new Date(), 20)}
            filterDate={(date) => date.getDay() !== 0}
            showTimeSelect
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 30), 16)}
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={current_datetime}
            onChange={(date) => setCurrent_datetime(date)}
          />
        </div>
        <div className="button-container">
          <button className="button" onClick={handleClick}>
            Confirm
          </button>
        </div>

        <div className="status">Status: {displayStatus()}</div>
      </div>
      {message ? <Message message={message} /> : null}
      {/* <Appointment appointments={appointments} /> */}
    </div>
  );
};

export default Home;
