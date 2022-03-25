import "./navbar.scss";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "supertokens-auth-react/recipe/emailpassword";

const Navbar = () => {

    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        // navigate("/auth");
        window.location.href = "/";
    }

    return (
        <>
            <div className="navElement">
                <Link to="/users">
                    <span className="logo">users</span>
                </Link>
            </div>
            <div className="navElement">
                <Link to="/callApiView">
                    <span className="logo">call api</span>
                </Link>
            </div>
            <div className="navElement">
                <button onClick={logoutClicked}>Logout</button>
            </div>
        </>
    )
}
export default Navbar