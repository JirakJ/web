import {CollectionView} from "./CollectionView";
import {IUserProps} from "../interfaces/IUserProps";
import {User} from "../models/User";
import {UserShow} from "./UserShow";

export class UserList extends CollectionView<User, IUserProps> {
    renderItem(model: User, itemParent: Element): void {
        new UserShow(itemParent, model).render();
    }

}
