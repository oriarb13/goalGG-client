import { useRecoilState } from 'recoil';
import { modalState } from '../stores/modal';
import { Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStyle } from './style';

const ModalProvider = (props: any) => {
  const [modal, setModal] = useRecoilState(modalState);
  const { t } = useTranslation();
  const { classes } = useStyle();
  return (
    <Modal
      disableEnforceFocus
      open={modal.show}
      onClose={() => setModal({ ...modal, show: false })}
      className={classes.container2}
      disableScrollLock={false}
    >
      <div className={[classes.mainContainer, modal.insideStyle].join(' ')}>
        {modal.withClose && (
          <div
            className={classes.close}
            onClick={() => setModal({ ...modal, show: false })}
          >
            {/* <CloseIcon /> */}
          </div>
        )}
        {modal.content}
      </div>
    </Modal>
  );
};

export { ModalProvider };
