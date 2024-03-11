import {Button, Form, Input} from "antd";

const AddUserForm = ({formAddUser}) => {
    return (
        <Form className="confirm-form" onFinish={formAddUser}>
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your E-mail!',
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
                label="ID"
                name="player_id"
                rules={[
                    {
                        required: true,
                        message: 'Please input your ID!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Добавить</Button>
            </Form.Item>
        </Form>
    );
};

export default AddUserForm;