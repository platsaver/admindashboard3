import { Flex, Typography, Avatar } from "antd";
import { MessageOutlined, BellOutlined , UserOutlined } from '@ant-design/icons';
import { GlobalOutlined } from "@ant-design/icons";

const CustomHeader = () => {
    return (
        <Flex align="center" justify="space-between">
            <Typography.Title level={4} type="secondary">
            </Typography.Title>
            <Flex align='center' gap='3rem'>
                <Flex align='center' gap='10px'>
                    <MessageOutlined className='header-icon'/>
                    <BellOutlined className='header-icon' />
                    <GlobalOutlined className="header-icon"/>
                    <Avatar icon={<UserOutlined/>}/>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default CustomHeader;