import { useTheme } from '@/core/hooks';
import { adaptPddingLeft, adaptPddingRight, FONT_FAMILY } from '@/core/utils';
import { convertWidthToVW1440 } from '@/core/utils/convert';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

const useStyle = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();
  const useStyles = createUseStyles({
    container2: {
      outline: 'none',
    },
    close: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'absolute',
      left: '6px',
      top: '6px',
      cursor: 'pointer',
    },
    mainContainer: {
      //old
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // width: "60%",
      // position: "absolute",
      // left: "50%",
      // top: "50%",
      // transform: "translate(-50%, -50%)",
      // height: "20%",
      // overFlow: "auto",
      // outline: "none",
      // backgroundColor: "#FFFFFF",
      // borderRadius: 5,
      // boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.35)",

      //new
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      outline: 'none',
      backgroundColor: theme.system.background.light.primary,
      boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.35)',
      width: 515,
      height: 704,
      borderRadius: 20,
    },
  });
  const classes = useStyles();
  return {
    classes,
    theme,
  };
};
export { useStyle };
