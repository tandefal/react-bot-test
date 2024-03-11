import {Layout, Spin} from "antd";
import AuthForm from "./components/AuthForm.jsx";
import {useApp} from "./context/AppContext.jsx";
import Content from "./components/Content.jsx";
import Header from "./components/Header.jsx";
import {useEffect, useState} from "react";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const {user, loading} = useApp();

    useEffect(() => {
        if(user.token) {
            setIsAuth(true);
        }else {
            setIsAuth(false);
        }
        console.log('app')
    }, [user]);

    return (
        <Layout className="content">
            {loading && <Spin fullscreen />}
            <Header/>
            <Layout.Content>
                {isAuth ? <Content/> : <AuthForm/>}
            </Layout.Content>
        </Layout>
    )
}

export default App
