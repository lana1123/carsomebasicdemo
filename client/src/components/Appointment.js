import React, { useState, useContext, useEffect } from "react";
import AppointmentService from "../Services/AppointmentService";
import { AuthContext } from "../Context/AuthContext";
import AppointmentItem from "../components/AppointmentItem";
import "./Appointment.css";

const Appointment = ({ props }) => {
  const [appointments, setAppointments] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    AppointmentService.getAppointment(authContext.user.username).then(
      (data) => {
        if (data) {
          setAppointments(data);
          console.log("USE EFFECT DATA");
          console.log(data);
        }
      }
    );
  }, []);

  return (
    <div className="appointment-container">
      <div className="appointment-content">
        {appointments.map((appointment) => {
          return (
            <AppointmentItem
              key={appointment.username}
              appointment={appointment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Appointment;
