import { Menu } from 'antd';
import Link from 'next/link';
import useMe from 'hooks/me';
import { useAuth } from 'hooks/auth';
import Logo from './Logo';

export default () => {
  const me = useMe();
  const { logOut } = useAuth();
  if (!me) return null;

  return (
    <>
      <Logo />
      <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
        <Menu.Item key="1">{`Bienvenue ${me.firstName} ${me.lastName}`}</Menu.Item>
        <Menu.Item key="2">{me.email}</Menu.Item>
        {me.formDone ? (
          <Menu.Item key="3">
            <Link href="/recommandation">
              <a href="/recommandation">Recommandations</a>
            </Link>
          </Menu.Item>
        ) : null}
        <Menu.Item onClick={() => logOut()} key="4">
          Log Out
        </Menu.Item>
      </Menu>
    </>
  );
};
