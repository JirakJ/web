import {AxiosResponse} from "axios";
import {IHasId} from "../interfaces/IHasId";
import {IModelAttributes} from "../interfaces/IModelAttributes";
import {IEvents} from "../interfaces/IEvents";
import {IApiSync} from "../interfaces/IApiSync";

export class Model<T extends IHasId> {
    constructor(
        private attributes: IModelAttributes<T>,
        private events: IEvents,
        private sync: IApiSync<T>
    ) {}

    //Passthrought methods
    get on() {
        return this.events.on; //return reference to this.events.on method
    }

    get trigger() {
        return this.events.trigger; //return reference to this.events.trigger method
    }
    get get() {
        return this.attributes.get; //return reference to this.attributes.get method
    }

    //Set data while triggered
    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change'); //let other component know that something has change
    }

    fetch(): void {
        const id = this.attributes.get('id');

        if(typeof  id !== 'number') {
            throw new Error('Cannot fetch User without an id.')
        }

        this.sync.fetch(id).then((response:AxiosResponse): void => {
            this.set(response.data);
        }).catch(():void => {
            this.trigger('error')
        });
    }

    save(): void {
        this.sync.save(this.attributes.getAll()).then((response: AxiosResponse):void => {
            this.trigger('save')
        }).catch(():void => {
            this.trigger('error')
        });
    }
}
