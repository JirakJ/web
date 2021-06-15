import {AxiosPromise} from "axios";

export interface IApiSync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}
