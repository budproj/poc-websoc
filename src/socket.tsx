import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);

export default socket;

export const useSocket =
  (message: string, callback: (arg: unknown) => void) => () => {
    socket.on(message, callback);

    return () => {
      socket.off(message, callback);
    };
  };

export const emitSocketMessage = (message: string, value: unknown) => {
  socket.emit(message, value);
};
