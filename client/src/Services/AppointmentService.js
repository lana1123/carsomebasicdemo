export default {
  getAppointment: (user) => {
    return fetch("/api/userSlot/" + user).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  getAppointments: () => {
    return fetch("/api").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  checkAppointments: (slot) => {
    return fetch("/api/" + slot).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  postAppointment: (slot) => {
    return fetch("/api/bookSlot", {
      method: "post",
      body: JSON.stringify(slot),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },
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
