import {useEffect, useState} from "react";
import {http} from "./http.js";
import {Button, message, Modal, Space, Table, Typography} from "antd";
import {useApp} from "../context/AppContext.jsx";
import {DeleteTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import AddUserForm from "./views/AddUserForm.jsx";
import AddPermissionsForm from "./views/AddPermissionsForm.jsx";


const {confirm} = Modal;

export function Admin() {
    const {user, setLoading} = useApp();
    const [data, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    async function getUsers() {
        setLoading(true);
        try {
            const res = await http('user/search', "GET", {'with[]': 'permissions'}, user.token);
            let dataUser = res.map(v => ({
                email: v.email,
                key: v.id,
                permission: v.permissions.map(v => `${v.type} - ${v.expired}`).join("<br>"),
                player_id: v.player_id
            }));
            setData(dataUser);
        } catch (e) {
            messageApi.error(e.message);
        }
        setLoading(false);
    }

    async function formAddUser(data) {
        setLoading(true);
        try {
            await http('user/add', "POST", data, user.token);
            await getUsers();
        } catch (e) {
            messageApi.error(e.message);
        }
        setLoading(false);
    }


    function addUserHandler() {
        confirm({
            title: 'Добавить пользователя',
            icon: null,
            content: <AddUserForm formAddUser={formAddUser}/>,
            footer: null,
            mask: true,
            maskClosable: true
        });
    }

    async function deleteUser(user_id, email) {
        confirm({
            title: 'Удаление',
            icon: null,
            content: `Вы точно хотите удалить ${email}?`,
            cancelText: 'Отмена',
            onOk() {
                return new Promise((resolve, reject) => {
                    http('user/delete', "POST", {user_id}, user.token)
                        .then(() => {
                            getUsers().then(resolve)
                        })
                        .catch(e => {
                            messageApi.error(e.message);
                            reject();
                        });

                })
            }
        });
    }

    const formAddPermission = async (user_id, data, confirmPermissions) => {
        const body = {
            user_id,
            type: data.type,
            expired: data.DatePicker.format("YYYY-MM-DD HH:mm:ss")
        }
        setLoading(true);
        try {
            await http('user/add-permissions', "POST", body, user.token);
            await getUsers();
        } catch (e) {
            messageApi.error(e.message);
        }
        setLoading(false);
        confirmPermissions.destroy();
    }

    const addPermissionUser = (user_id, email) => {

        const confirmPermissions = confirm({
            title: 'Выдать доступ - ' + email,
            icon: null,
            content: <AddPermissionsForm onFinish={(data) => formAddPermission(user_id, data, confirmPermissions)}/>,
            footer: null,
            mask: true,
            maskClosable: true
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Typography.Paragraph>
                {contextHolder}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Button type="primary" onClick={addUserHandler}>Добавить пользователя</Button>
            </Typography.Paragraph>
            <Table dataSource={data} scroll={{x: 'max-content'}}>
                <Table.Column title="E-mail" dataIndex="email" key="email"/>
                <Table.Column title="ID" dataIndex="player_id" key="player_id"/>
                <Table.Column
                    title="Доступы"
                    dataIndex="permission"
                    key="permission"
                    render={(text, record) => <span dangerouslySetInnerHTML={{__html: record.permission}}/>}
                />
                <Table.Column
                    title="Действие"
                    key="action"
                    render={user => (
                        <Space size="middle">
                            <Button
                                onClick={() => addPermissionUser(user.key, user.email)}><PlusCircleTwoTone/></Button>
                            <Button onClick={() => deleteUser(user.key, user.email)}><DeleteTwoTone/></Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}