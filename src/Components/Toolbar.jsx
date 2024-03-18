import React, { useState } from 'react';
import { HomeOutlined, ApiOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Toolbar = () => {
  const [current, setCurrent] = useState('home');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: (
        <Link to="/">Home</Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link to="/api">API</Link>
      ),
      key: 'api',
      icon: <ApiOutlined />,
    },
  ];

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
};

export default Toolbar;
