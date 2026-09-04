import { useEffect } from "react";
import { socket, type ServerToClientEvents } from "./SocketClient";

export function useSocketEvent<EventName extends keyof ServerToClientEvents>(
    eventName: EventName,
    handler: ServerToClientEvents[EventName],
    enabled = true
) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const typedSocket = socket as {
            on: (event: EventName, listener: ServerToClientEvents[EventName]) => void;
            off: (event: EventName, listener: ServerToClientEvents[EventName]) => void;
        };

        typedSocket.on(eventName, handler);

        return () => {
            typedSocket.off(eventName, handler);
        };
    }, [eventName, handler, enabled]);
}
