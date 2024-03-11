import {Button, Layout} from "antd";
import {useApp} from "../context/AppContext.jsx";


export default function Header() {

    const {setUser} = useApp();
    function exitApp() {
        setUser({});
    }

    return <Layout.Header>
        Bot for monolife
        <div ><Button onClick={exitApp}>Выйти</Button></div>
    </Layout.Header>
}