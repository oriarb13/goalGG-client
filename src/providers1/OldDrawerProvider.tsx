import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { drawerState } from '../stores';
import { useEffect, useState } from 'react';

const OldDrawerProvider = (props: any) => {
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const { t } = useTranslation();
  const toggleDrawer = (anchor: any, open: boolean) => {
    // setDrawer({ ...drawer, [anchor]: open });
  };

  const [closeDrawer, setCloseDrawer] = useState(false);
  useEffect(() => {
    if (closeDrawer) {
      // setDrawer({ ...drawer, show: false });
      setCloseDrawer(false);
    }
  }, [closeDrawer]);
  return (
    <>
      {drawer.show && (
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 10,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-end',
            maxHeight: '100vh',
            border: '1px solid #ced9dc',
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
          }}
        >
          {drawer.content}
        </div>
      )}
    </>
  );
};

export default OldDrawerProvider;
