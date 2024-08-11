'use client';
import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useModalDialog } from '@/hooks/useModalDialog';
import { cn } from '@/lib/utils';
import { v4 as uid } from 'uuid';
import { CustomOptionForm } from './CustomOptionForm';
import React, { ReactElement } from 'react';

interface Props {
  title: string;
  dbTableName: CustomFieldDBTableName;
  triggerLabel?: string;
  triggerBtn?: ReactElement;
  handleSubmitLocal?: (data: Omit<ICustomFieldData, 'id'>) => void;
}

export const CreateCustomFieldOptionModal = ({
  title,
  dbTableName,
  triggerLabel,
  triggerBtn,
  handleSubmitLocal,
}: Props) => {
  const { isModalOpen, openModal, closeModal } = useModalDialog();

  const handleSubmit = (data: Omit<ICustomFieldData, 'id'>) => {
    const { label, color, description } = data;
    const dataToInsert = { id: uid(), label, color, description };
    console.log('insert', dataToInsert, 'into', dbTableName);
    closeModal();
  };

  const handleSubmitLocalData = (data: Omit<ICustomFieldData, 'id'>) => {
    if (typeof handleSubmitLocal === 'function') {
      handleSubmitLocal(data);
      closeModal();
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(isOpen) => !isOpen && closeModal()}
    >
      <DialogTrigger asChild>
        {triggerBtn ? (
          React.cloneElement(triggerBtn, { onClick: openModal })
        ) : (
          <Button className={cn(successBtnStyles)} onClick={openModal}>
            {triggerLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-96 max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Separator className="mb-4" />
        <CustomOptionForm
          onSubmit={(data) =>
            handleSubmitLocal && typeof handleSubmitLocal === 'function'
              ? handleSubmitLocalData(data)
              : handleSubmit(data)
          }
          submitBtnLabel="Save"
          cancelButton={
            <Button className={cn(secondaryBtnStyles)} onClick={closeModal}>
              Cancel
            </Button>
          }
        />
      </DialogContent>
    </Dialog>
  );
};
