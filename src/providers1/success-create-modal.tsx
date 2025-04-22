import CreatedIcon1 from '@/assets/icons/created-icon-1';
import CreatedIcon2 from '@/assets/icons/created-icon-2';
import { Button } from '@/ui/components/shadcn-ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/ui/components/shadcn-ui/dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { successCreateMassMessageModalState } from '../stores/succes-create-mass-message-modal';

function SuccessCreateMassMessageModal() {
  const { t } = useTranslation();

  const [succesModal, setSuccesModal] = useRecoilState(
    successCreateMassMessageModalState,
  );

  return (
    <Dialog open={succesModal.show}>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <div className="flex justify-center items-center">
            <CreatedIcon1 width={60} />
          </div>
          <div className="flex flex-col gap-3 pb-6 px-6">
            <h1 className="text-2xl font-bold text-contentColor">
              {t('MassMessaging.messageCreatedSuccessfully')}
            </h1>
            <div className="flex flex-col gap-2 min-w-[60%] max-w-[80%]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreatedIcon2 width={25} />
                  <span>{`${t('MassMessaging.startSending')}:`}</span>
                </div>
                <span>{succesModal.startSending}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreatedIcon2 width={25} />
                  <span>{`${t('MassMessaging.numberOfRecipients')}:`}</span>
                </div>
                <span>{succesModal.numberOfRecipients}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              onClick={() =>
                setSuccesModal((prevState) => {
                  return { ...prevState, show: false };
                })
              }
              size={'none'}
              className="px-16 py-1"
            >
              {t('userManagment.done')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessCreateMassMessageModal;
