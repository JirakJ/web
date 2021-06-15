import {Model} from "./Model";
import {Attributes} from "./Attributes";
import {Eventing} from "./Eventing";
import {ApiSync} from "./ApiSync";
import {IUserProps} from "../interfaces/IUserProps";

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<IUserProps>{
    static buildUser(attributes: IUserProps): User {
        return new User(
            new Attributes<IUserProps>(attributes),
            new Eventing(),
            new ApiSync<IUserProps>(rootUrl)
        );
    }
}
