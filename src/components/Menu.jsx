import {Button, Card, InputNumber, message, Select, Typography} from "antd";
import {options, optionsJoin} from "../data/menu.js";
import {useEffect, useState} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from "react-syntax-highlighter/src/styles/hljs/dark.js";
import copy from "copy-to-clipboard";
import {http} from "./http.js";
import {useApp} from "../context/AppContext.jsx";
import {notNullObj} from "../helper.js";


export function Menu() {

    const {user, setLoading} = useApp();

    const [mode, setMode] = useState(1);
    const [person, setPerson] = useState(false);
    const [joinID, setJoinID] = useState(null);
    const [isBet, setIsBet] = useState(false);
    const [bet, setBet] = useState(null);
    const [isSlot, setIsSlot] = useState(false);
    const [slot, setSlot] = useState(1);
    const [isScript, setIsScript] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        async function getSettings() {
            try {
                const res = await http('menu/get-settings', "POST", {}, user.token);
                if (res.data) {
                    setMode(res.data.mode || mode);
                    setJoinID(res.data.joinID || joinID);
                    setSlot(res.data.slot || slot);
                    setBet(res.data.bet || bet);
                }
            } catch (e) {
                messageApi.error(e.message);
            }

        }

        getSettings();
    }, []);

    useEffect(() => {
        setPerson(mode === 1);
        if (mode === 1) {
            setIsBet([6, 7].includes(joinID));
            setIsSlot([1, 7].includes(joinID));
        } else {
            setIsBet(false);
            setIsSlot(false);
            setJoinID(null);
            setBet(0);
            setSlot(null);
        }
        setIsScript(false);
    }, [mode, joinID]);


    async function sendSettings() {
        if(mode === 1 && !joinID) {
            messageApi.error("Не выбран персонаж");
            return;
        }
        setLoading(true);
        const data = notNullObj({mode, joinID, bet, slot});
        try {
            await http('menu/set-settings', "POST", data, user.token);
            setIsScript(true);
        } catch (e) {
            messageApi.error(e.message);
        }
        setLoading(false);
    }

    async function copyHandler() {
        if (copy(codeString())) {
            messageApi.success("Скопировано!");
        } else {
            messageApi.error("ошибка при копировании");
        }
    }

    function codeString() {
        return `(async(q)=>{window.localStorage.setItem('token_key', q);let e=await fetch("https://api.monopolize.ru/menu/script",{headers:{Authorization:"Bearer " +q}}),t=await e.text();var a=document.createElement("script");a.innerHTML=t,document.head.append(a),a.remove();})(${JSON.stringify(user.token)});`.trim();
    }

    return <div className="contents-tabs card-grid">
        <Typography.Paragraph>
            {contextHolder}
        </Typography.Paragraph>
        <Card style={{marginBottom: "1rem"}}>
            <Select
                value={mode}
                placeholder="Выберите режим игры"
                style={{
                    width: "100%",
                    marginBottom: "1rem"
                }}
                onChange={e => setMode(e)}
                options={options}
            />
            {person && <Select
                value={joinID}
                placeholder="Выберите персонаж"
                style={{
                    width: "100%",
                    marginBottom: "1rem"
                }}
                onChange={e => setJoinID(e)}
                options={optionsJoin}
            />}

            {isSlot && <Select
                value={slot}
                placeholder="Выберите к кому садимся"
                style={{
                    width: "100%",
                    marginBottom: "1rem"
                }}
                onChange={e => setSlot(e)}
                options={[
                    {
                        value: 1,
                        label: "1 слот"
                    },
                    {
                        value: 2,
                        label: "2 слот"
                    },
                ]}
            />}
            {isBet && <InputNumber
                min={0}
                max={2000}
                value={bet}
                onChange={(num) => setBet(Number(num))}
                style={{
                    width: "100%",
                    marginBottom: "1rem"
                }}
            />}
            <Button onClick={sendSettings}>Сохранить</Button>
        </Card>

        {isScript && <Card>
            <SyntaxHighlighter language="javascript" style={dark}>
                {codeString()}
            </SyntaxHighlighter>
            <Button onClick={copyHandler} style={{marginTop: "1rem"}}>Скопировать</Button>
        </Card>
        }
    </div>
}