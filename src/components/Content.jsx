import {useApp} from "../context/AppContext.jsx";
import {useEffect, useState} from "react";
import {Tabs} from "antd";
import {Admin} from "./Admin.jsx";
import Empty from "./Empty.jsx";
import {Menu} from "./Menu.jsx";
import {Site} from "./Site.jsx";

function getComponents(type) {
    const components = {
        admin: <Admin/>,
        menu: <Menu/>,
        site: <Site/>
    };
    return components[type] ?? <Empty/>
}

function getLabel(type) {
    const label = {
        admin: "Админка",
        menu: "Меню",
        site: "Сайт",
        bot: "Бот"
    };
    return label[type] ?? "Ошибка";
}

export default function Content() {
    const {user} = useApp();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const tabs = user.permissions.map((v, i) => ({
            key: i + 1,
            label: getLabel(v.type),
            children: getComponents(v.type),
        }));
        setItems(tabs);
    }, []);


    if(!items.length) {
        return  <Empty/>
    }

    return (
        <Tabs defaultActiveKey="2" items={items}/>
    )
}