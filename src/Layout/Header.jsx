import { Flex, Typography, Avatar } from "antd";
import { Input } from "antd";
import React from "react";
import { MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const CustomHeader = () => {
    const { Search } = Input;
    return (
        <Flex align="center" justify="space-between">
            <Typography.Title level={4} type="secondary">
            </Typography.Title>
            <Flex align='center' gap='3rem'>
                <Input placeholder='Search ...' allowClear/>

                <Flex align='center' gap='10px'>
                    <MessageOutlined className='header-icon'/>
                    <NotificationOutlined className='header-icon' />
                    <Avatar icon={<UserOutlined/>}/>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default CustomHeader;