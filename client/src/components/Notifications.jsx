import { useEffect } from "react";
import useNotifications from "../hooks/useNotifications";
import socket from "../socket";

const Notifications = () => {
  const notifyUser = useNotifications();

  useEffect(() => {
    socket.on("message", (msg) => {
      notifyUser(msg);
    });

    Notification.requestPermission();

    return () => {
      socket.off("message");
    };
  }, []);

  return null;
};

export default Notifications;
