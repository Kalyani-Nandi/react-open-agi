import React, { createContext, useContext, useState, useCallback } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback(
    ({ alertType, message, title, duration = 5000 }) => {
      const id = Date.now();
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        { id, alertType, message, title, duration },
      ]);

      setTimeout(() => {
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.id !== id)
        );
      }, duration);
    },
    []
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed top-16 right-5 z-50">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.alertType}
            title={alert.title}
            message={alert.message}
            duration={alert.duration}
            onClose={() =>
              setAlerts((prevAlerts) =>
                prevAlerts.filter((t) => t.id !== alert.id)
              )
            }
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
