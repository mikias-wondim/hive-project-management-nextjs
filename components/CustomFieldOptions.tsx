'use client';
import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useModalDialog } from '@/hooks/useModalDialog';
import { cn, getCustomFieldTagColorsForTheme } from '@/lib/utils';
import { Ellipsis, GripVertical } from 'lucide-react';
import { useTheme } from 'next-themes';
import { CustomOptionForm } from './CustomOptionForm';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useState } from 'react';

interface Props {
  field: string;
  dbTableName: CustomFieldDBTableName;
  items: {
    id: string;
    label: string;
    description: string;
    color: string;
  }[];
}

export const CustomFieldOptions = ({ field, dbTableName, items }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModalDialog();
  const [optionId, setOptionId] = useState<string | undefined>(undefined);
  const { theme } = useTheme();

  const handleUpdateOption = (item: ICustomFieldData) => {
    console.log('update', dbTableName, 'with', item);
    closeModal();
    setOptionId(undefined);
  };

  const handleDeleteOption = (id: string) => {
    console.log(dbTableName, id);
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => !isOpen && closeModal()}
      >
        <h1 className="text-lg py-3">Options</h1>
        <div className="border rounded-sm">
          {items.map((item, i) => (
            <div key={item.id}>
              <div className="flex justify-between items-center p-4">
                <div className="flex gap-4 items-center">
                  <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-600 cursor-grabbing" />

                  <Badge
                    style={getCustomFieldTagColorsForTheme(item.color, theme)}
                  >
                    {item.label}
                  </Badge>
                  <div className="hidden md:inline-block text-sm truncate">
                    {item.description}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setOptionId(item.id);
                        openModal();
                      }}
                    >
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteOption(item.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {i < items.length - 1 && <Separator />}

              {item.id === optionId && (
                <DialogContent className="max-w-96 max-h-[100vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Update {field}</DialogTitle>
                  </DialogHeader>

                  <CustomOptionForm
                    color={item.color}
                    description={item.description}
                    label={item.label}
                    onSubmit={(data) => handleUpdateOption({ ...data, id: '' })}
                    submitBtnLabel="Update option"
                    cancelButton={
                      <Button
                        className={cn(secondaryBtnStyles)}
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    }
                  />
                </DialogContent>
              )}
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};
