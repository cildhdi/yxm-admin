import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.css';
import Link from 'umi/link';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

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
      <LocaleProvider locale={zh_CN}>
        <Layout style={{ height: '100%' }}>
          <Sider trigger={null} collapsible={true} collapsed={this.state.collapsed}>
            <Menu theme='dark' mode="inline" defaultSelectedKeys={['analysis']}>
              <Menu.Item key="analysis">
                <Link to="/">
                  <Icon type="dashboard" />
                  <span>总览</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="article">
                <Icon type="file-text" />
                <span>文章列表</span>
              </Menu.Item>
              <Menu.Item key="user">
                <Icon type="user" />
                <span>用户列表</span>
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
      </LocaleProvider>
    );
  }
}
