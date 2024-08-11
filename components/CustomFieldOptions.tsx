'use client';
import { secondaryBtnStyles } from '@/app/commonStyles';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { grayFieldColor } from '@/consts/colors';
import { useModalDialog } from '@/hooks/useModalDialog';
import { cn } from '@/lib/utils';
import { Ellipsis, GripVertical } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { CustomFieldTagRenderer } from './CustomFieldTagRenderer';
import { CustomOptionForm } from './CustomOptionForm';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Props {
  field: string;
  dbTableName: CustomFieldDBTableName;
  title?: string;
  items: ICustomFieldData[];
  hiddenDescription?: boolean;
  embeddedCreateOptionEle?: ReactNode;
  deleteLocalItem?: (id: string) => void;
}

export const CustomFieldOptions = ({
  field,
  dbTableName,
  items,
  title,
  hiddenDescription,
  embeddedCreateOptionEle,
  deleteLocalItem,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModalDialog();
  const [optionId, setOptionId] = useState<string | undefined>(undefined);

  const handleUpdateOption = (item: ICustomFieldData) => {
    console.log('update', dbTableName, 'with', item);
    closeModal();
    setOptionId(undefined);
  };

  const handleDeleteOption = (id: string) => {
    console.log(dbTableName, id);
  };

  const handleDeleteLocalItem = (id: string) => {
    if (typeof deleteLocalItem === 'function') {
      deleteLocalItem(id);
    }
  };

  useEffect(() => {
    const optionIdParams = searchParams.get('option_id');

    if (optionIdParams) {
      setOptionId(optionIdParams);
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeModal();
            router.push(pathname);
          }
        }}
      >
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-lg py-3">{title || 'Options'}</h1>
            {embeddedCreateOptionEle}
          </div>
          <div className="border rounded-sm">
            {items.map((item, i) => (
              <div key={item.id}>
                <div className="flex justify-between items-center p-4">
                  <div className="flex gap-4 items-center">
                    <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-600 cursor-grabbing" />
                    <CustomFieldTagRenderer
                      color={item.color || grayFieldColor}
                      label={item.label || ''}
                    />
                    {!hiddenDescription && (
                      <div className="hidden md:inline-block text-sm truncate">
                        {item.description}
                      </div>
                    )}
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
                        onClick={() =>
                          deleteLocalItem
                            ? handleDeleteLocalItem(item.id)
                            : handleDeleteOption(item.id)
                        }
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
                      onSubmit={(data) =>
                        handleUpdateOption({ ...data, id: '' })
                      }
                      submitBtnLabel="Update option"
                      cancelButton={
                        <Button
                          className={cn(secondaryBtnStyles)}
                          onClick={() => {
                            closeModal();
                            router.push(pathname);
                          }}
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
        </div>
      </Dialog>
    </>
  );
};
