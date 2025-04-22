import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMediaQuery, useScreen } from "usehooks-ts";
import { screenState } from "../stores";

const ScreenProvider = (props: any) => {
  const setScreenState = useSetRecoilState(screenState);
  const isMobile = useMediaQuery("(max-width: 500px)");

  const screen = useScreen();
  useEffect(() => {
    setScreenState({
      width: screen?.width,
      height: screen?.height,
      isMobile,
      isGetData: true,
    });
  }, [isMobile]);

  return <></>;
};

export { ScreenProvider };
