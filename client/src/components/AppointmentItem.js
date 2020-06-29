import React from "react";

const AppointmentItem = ({ appointment, handleClick }) => {
  return (
    <div className="appointment-content-container">
      <h1>Appointment</h1>
      <div className="appointment">
        <div>
          {appointment.slot_datetime ? (
            <div>
              {appointment.slot_datetime}
              <div className="button-container">
                <button className="button" onClick={handleClick}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            "You don't have any appointment yet"
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
