import { useRecoilState, useSetRecoilState } from 'recoil';
import { drawerState, getEmergencyCallsState } from '../stores';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/ui/components/shadcn-ui/sheet';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AlertCallsMobileView from '@/ui/widgets/mobile-view/alert-calls/AlertCallsMobileView';
import AlertCallDetailsMobileView from '@/ui/widgets/mobile-view/alert-call-details/AlertCallDetailsMobileView';

const DrawerProvider = () => {
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const [selectedAlertCall, setSelectedAlertCall] = useState<any>(null);
  const setCallsData = useSetRecoilState(getEmergencyCallsState);
  const route = useRouter();

  const onBottomClose = () => {
    setDrawer({ ...drawer, newVersion: false });
    setSelectedAlertCall(null);
  };

  return (
    <>
      {drawer.newVersion && (
        <Sheet
          open={drawer.newVersion}
          onOpenChange={() => {
            setDrawer({
              show: false,
              newVersion: false,
              content: {},
              drawerProps: {},
            });
            setCallsData((prev: any) => ({
              ...prev,
              point: null,
            }));
          }}
          modal={drawer.isModal || false} // shadow on page >> false by default
        >
          <SheetContent
            onInteractOutside={(e) => e.preventDefault()}
            side={'right'}
            className="p-0 h-full hidden md:block" // Set full height for the wrapper content
          >
            <div className="h-full flex flex-col items-center">
              {/* Wrapper for Header with 85% width */}
              <div className="w-full flex justify-center">
                <SheetHeader className="w-[85%] pt-3 flex flex-col justify-between gap-2">
                  {drawer.content.header && drawer.content.header}
                  <SheetTitle className="mt-5 text-2xl font-extrabold text-contentColor">
                    {drawer.content.title}
                  </SheetTitle>
                  {drawer.content.filters && (
                    <div className="flex flex-col gap-3">
                      {drawer.content.filters}
                    </div>
                  )}
                  <SheetDescription></SheetDescription>
                </SheetHeader>
              </div>

              <div className="w-full h-full overflow-auto">
                {drawer.content.body}
              </div>

              {drawer.content.footer && (
                <div className="w-full bg-white py-4">
                  {drawer.content.footer}
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}

      {route.asPath === '/main' && drawer.newVersion && (
        <Sheet
          open={drawer.newVersion}
          onOpenChange={onBottomClose}
          modal={false}
        >
          <SheetContent
            className="md:hidden px-0 py-2 overflow-hidden bg-transparent border-none text-white"
            side={'bottom'}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <div
              className={`fixed w-full -z-10 ${
                !selectedAlertCall ? 'h-[50%]' : 'h-[60%]'
              } bottom-0 bg-gradient-to-t from-black/85 via-black/75 to-transparent pointer-events-none`}
            />
            {!selectedAlertCall ? (
              <AlertCallsMobileView
                setSelectedAlertCall={setSelectedAlertCall}
                onClose={onBottomClose}
              />
            ) : (
              <AlertCallDetailsMobileView
                selectedAlertCall={selectedAlertCall}
                setSelectedAlertCall={setSelectedAlertCall}
                onClose={onBottomClose}
              />
            )}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export { DrawerProvider };
