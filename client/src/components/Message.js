import React from "react";

const getStyle = (props) => {
  let baseClass = "alert ";
  if (props.message.msgError) baseClass = baseClass + "alert-danger";
  else baseClass = baseClass + "alert-primary";
};

const Message = (props) => {
  return (
    <div className="message-container">
      <div className={getStyle(props)} role="alert">
        {props.message.msgBody}
      </div>
    </div>
  );
};

export default Message;
