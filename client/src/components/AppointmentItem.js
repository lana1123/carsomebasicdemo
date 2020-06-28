import React from "react";

const AppointmentItem = ({ appointment }) => {
  console.log("APPOINTMENT ITEM HERE");
  console.log(appointment);

  return (
    <div className="appointment-content-container">
      <h1>Appointment</h1>
      <div className="appointment">
        <div>
          {appointment.slot_datetime
            ? appointment.slot_datetime
            : "You don't have any appointment yet"}
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
