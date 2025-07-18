const useNotifications = () => {
  return (msg) => {
    if (Notification.permission === "granted") {
      new Notification(`New message from ${msg.from}`, { body: msg.content });
    }
    new Audio("/notify.mp3").play();
  };
};

export default useNotifications;
