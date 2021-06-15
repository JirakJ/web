import {Callback} from "../types/Callback";

export interface IEvents {
    on(eventName: string, callback: Callback);
    trigger(eventName: string): void;
}
