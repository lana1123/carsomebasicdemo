export default {
  //to get appointment for that user
  getAppointment: (user) => {
    return fetch("/api/userSlot/" + user).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  //to cancel appointment
  cancelAppointment: (user) => {
    return fetch("/api/updateUser/cancelSlot/" + user, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  //to get all appointments at that particular slot
  getAllAppointmentBySlot: (slot) => {
    return fetch("/api/userSlot/slot/" + slot).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },

  //to update slot_datetime for user db
  postAppointmentUser: (user, slot) => {
    return fetch("/api/updateUser/" + user, {
      method: "post",
      body: JSON.stringify(slot),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },
};
