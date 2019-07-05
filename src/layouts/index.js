import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.css';
import Link from 'umi/link';
const { Header, Sider, Content, Footer } = Layout;

export default class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
          <Menu theme='dark' mode="inline" defaultSelectedKeys={['analysis']}>
            <Menu.Item key="analysis">
              <Link to="/">
                <Icon type="dashboard" />
                <span>总览</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>上大英协</Footer>
        </Layout>
      </Layout>
    );
  }
}
