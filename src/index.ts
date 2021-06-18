import 'semantic-ui-css/semantic.min.css';
import {UserList} from "./views/UserList";
import {Collection} from "./models/Collection";
import {IUserProps} from "./interfaces/IUserProps";
import {User} from "./models/User";

const users = new Collection(
    'http://localhost:3000/users',
    (json: IUserProps) => {
        return User.buildUser(json)
    }
);

users.on('change', () => {
    const root = document.getElementById('root');
    console.log(root)
    if(root){
        new UserList(root, users);
    } else {
        throw new Error('Root element not found!');
    }
});

users.fetch();
