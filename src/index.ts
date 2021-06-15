import {User} from "./models/User";

const user = User.buildUser({id: 1})


user.fetch();

user.on('change', () => { console.log(user)})


