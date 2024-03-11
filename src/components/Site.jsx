import {useEffect} from "react";
import {useApp} from "../context/AppContext.jsx";

export function Site() {

    const {user} = useApp();

    useEffect(() => {
        window.location.href = "https://stats.monopolize.ru?token=" + user.token
    }, []);
    return <>Переадресация...</>
}