import axios, {AxiosPromise} from "axios";
import {IHasId} from "../interfaces/IHasId";

export class ApiSync<T extends IHasId>{
    constructor(public rootUrl: string) {}

    fetch(id: number): AxiosPromise {
        const response = axios.get(`${this.rootUrl}/${id}`);
        return response;
    }

    save(data: T): AxiosPromise {
        const { id } = data;
        if(id){
            return axios.put(`${this.rootUrl}/${id}`,data);
        } else {
            return axios.post(this.rootUrl,data);
        }
    }
}
