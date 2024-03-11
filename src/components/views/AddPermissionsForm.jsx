import {Button, DatePicker, Form, Select} from "antd";

const AddPermissionsForm = ({onFinish}) => {
    return (
        <Form className="confirm-form-permissions" onFinish={onFinish}>
            <Form.Item
                label="Select"
                name="type"
                rules={[
                    {
                        required: true,
                        message: 'Please Select!',
                    },
                ]}
            >
                <Select>
                    <Select.Option value="menu">Меню</Select.Option>
                    <Select.Option value="bot">Бот</Select.Option>
                    <Select.Option value="site">Автоматизация</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="DatePicker"
                name="DatePicker"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Добавить</Button>
            </Form.Item>
        </Form>
    );
};

export default AddPermissionsForm;