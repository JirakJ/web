import {Model} from "./Model";
import {Attributes} from "./Attributes";
import {Eventing} from "./Eventing";
import {ApiSync} from "./ApiSync";
import {IUserProps} from "../interfaces/IUserProps";
import {Collection} from "./Collection";

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<IUserProps>{
    static buildUser(attributes: IUserProps): User {
        return new User(
            new Attributes<IUserProps>(attributes),
            new Eventing(),
            new ApiSync<IUserProps>(rootUrl)
        );
    }

    static buildUserCollection(): Collection<User, IUserProps> {
        return new Collection<User, IUserProps>(
            rootUrl,
            (json: IUserProps) => User.buildUser(json)
        )
    }

    setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        this.set({age});
    }
}
