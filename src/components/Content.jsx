import {useApp} from "../context/AppContext.jsx";
import {useEffect, useState} from "react";
import {Tabs} from "antd";
import {Admin} from "./Admin.jsx";
import Empty from "./Empty.jsx";
import {Menu} from "./Menu.jsx";
import {Site} from "./Site.jsx";
import NotForbidden from "./NotForbidden.jsx";

const label = {
    admin: "Админка",
    menu: "Меню",
    site: "Автоматизация",
    bot: "Бот"
};

function getComponents(type) {
    const components = {
        admin: <Admin/>,
        menu: <Menu/>,
        bot: <Empty/>,
        site: <Site/>,

    };
    return components[type] ?? <Empty/>
}

function getLabel(type) {
    return label[type] ?? "Ошибка";
}

export default function Content() {
    const {user} = useApp();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const types = user.permissions.map(v => v.type);
        const tabs = Object.keys(label).map((v, i) => ({
            key: i + 1,
            label: getLabel(v),
            children: types.includes(v) ? getComponents(v) : <NotForbidden/>,
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