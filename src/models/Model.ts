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
    on = this.events.on; //direct reference to method can be used only if we don't pass any arguments
    trigger = this.events.trigger;
    get = this.attributes.get;

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
        }).catch((e: Error):void => {
            console.error(e);
            this.trigger('error')
        });
    }

    save(): void {
        this.sync.save(this.attributes.getAll()).then((response: AxiosResponse):void => {
            this.trigger('save')
        }).catch((e: Error):void => {
            console.error(e);
            this.trigger('error')
        });
    }
}
