import { useRecoilState } from 'recoil';
import { modalState } from '../stores/modal';
import { Alert, Modal, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStyle } from './style';
import { snackbarState } from '../stores/snackbar';

const SnackBarProvider = (props: any) => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  return (
    <Snackbar
      open={snackbar.show}
      onClick={() => setSnackbar({ ...snackbar, show: false })}
      onClose={() => setSnackbar({ ...snackbar, show: false })}
      style={{
        boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.25)',
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert severity={snackbar.severity}>
        <div
          style={{
            font:
              snackbar.severity === 'error'
                ? 'normal bold normal 20px/22px Rubik'
                : 'normal normal normal 16px/20px Rubik',
          }}
        >
          {snackbar.content}
        </div>
      </Alert>
    </Snackbar>
  );
};

export { SnackBarProvider };
