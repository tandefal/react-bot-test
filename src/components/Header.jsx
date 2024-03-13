import {Button, Layout} from "antd";
import {useApp} from "../context/AppContext.jsx";
import {TYPE_USER} from "../types.js";


export default function Header() {

    const {user,setUser} = useApp();
    function exitApp() {
        setUser({});
        window.localStorage.removeItem(TYPE_USER);
    }

    return <Layout.Header>
        Bot for monolife
        <div >{user.token && <Button onClick={exitApp}>Выйти</Button>}</div>
    </Layout.Header>
}