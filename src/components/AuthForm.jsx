import {Button, Form, Input, message, Spin} from "antd";
import {http} from "./http.js";
import {useApp} from "../context/AppContext.jsx";
import {TYPE_USER} from "../types.js";


export default function AuthForm() {

    const [messageApi, contextHolder] = message.useMessage();
    const {addUser, setLoading} = useApp();
    const onFinish = async (data) => {
        try {
            setLoading(true);
            const res = await http('auth/login', "POST", data);
            window.localStorage.setItem(TYPE_USER, JSON.stringify(res));
            addUser(res);
            setLoading(false);
        } catch (e) {
            messageApi.error(e.message);
            setLoading(false);
        }

    };

    return (
        <div className="form-auth">
            {contextHolder}
            <Form
                name="basic"
                autoComplete="off"
                style={{
                    minWidth: 350,
                }}
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                labelAlign="left"
            >
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid email!',
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item
                    style={{
                        textAlign: "center",
                    }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}