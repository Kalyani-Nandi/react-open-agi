import React, { useEffect, useState } from "react";
import ErrorIcon from "./icons/ErrorIcon";
import WarningIcon from "./icons/WarningIcon";
import SuccessIcon from "./icons/SuccessIcon";
import InfoIcon from "./icons/WarningIcon";
import NotificationIcon from "./icons/SuccessIcon";
import CloseIcon from "./icons/CloseIcon";

const Alert = ({ type = "info", message, title, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return oldProgress + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const alertStyles = {
    error: { icon: <ErrorIcon />, color: "red" },
    warning: { icon: <WarningIcon />, color: "orange" },
    info: { icon: <InfoIcon />, color: "blue" },
    success: { icon: <SuccessIcon />, color: "green" },
    notification: { icon: <NotificationIcon />, color: "gray" },
  };

  const currentAlertStyle = alertStyles[type] || alertStyles.info;
  return (
    <div
      style={{
        border: `1px solid ${currentAlertStyle?.color || "red"}`,
        backgroundColor: currentAlertStyle?.color || "red",
      }}
      className={`max-w-sm w-full mb-4 rounded-md shadow-lg text-white p-4 relative`}
    >
      <div className="flex items-start gap-3">
        <div className="mr-2">{currentAlertStyle?.icon}</div>{" "}
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-sm font-semibold">{message}</p>
        </div>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 bg-${currentAlertStyle?.color}-200`}
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      ></div>
    </div>
  );
};

export default Alert;
