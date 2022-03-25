import {useSessionContext} from "supertokens-auth-react/recipe/session";
import SuccessView from "../../SuccessView";
import {Link} from "react-router-dom";

const createUser = (id,name) => {
    return { id: id, name: name };
}

const users = [];
users.push( createUser(1,'a'));
users.push( createUser(2,'b'));

export default function Users() {
    const { userId } = useSessionContext();


    return (
        <div className="fill">
            <br/>
            User Id={userId}
            <br/>
            {users.map( u => { return (
                <div key={u.id}>
                    <Link to={`/users/${u.id}`}>
                        {u.id} - {u.name}
                    </Link>
                </div>
            )})}
        </div>
    );
}