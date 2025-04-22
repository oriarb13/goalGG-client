import { useRecoilState } from 'recoil';
import { Backdrop, CircularProgress } from '@mui/material';
import { dropBackState } from '../stores/drop-back';

const DropBackProvider = (props: any) => {
  const [dropback, setDropback] = useRecoilState(dropBackState);
  const handleClose = () => {
    setDropback(false);
  };
  const handleOpen = () => {
    setDropback(true);
  };
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={dropback}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export { DropBackProvider };
