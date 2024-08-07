'use client';
import { secondaryBtnStyles, successBtnStyles } from '@/app/commonStyles';
import { CustomOptionForm } from '@/components/CustomOptionForm';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useModalDialog } from '@/hooks/useModalDialog';
import { cn } from '@/lib/utils';
import { Dialog } from '@radix-ui/react-dialog';
import { Ellipsis, EyeOff, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
  column: IStatus;
}

export const ColumnMenuOptions = ({ column }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModalDialog();
  const [limit, setLimit] = useState(column.limit);
  const [optionType, setOptionType] = useState('');

  const handleUpdateLimit = () => {
    if (limit > 1 && limit !== column.limit) {
      console.log('update limit to', limit);
      closeModal();
    } else {
      console.log('limit not updated');
    }
  };

  const handleDeleteColumn = (id: string) => {
    console.log('delete column with id', id);
    closeModal();
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => !isOpen && closeModal()}
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuItem
              onClick={() => {
                setOptionType('limit');
                openModal();
              }}
            >
              <Icons.number className="w-3 h-3 mr-2 fill-gray-900 dark:fill-slate-50" />
              <span className="text-xs">Set limit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOptionType('details');
                openModal();
              }}
            >
              <Pencil className="w-3 h-3 mr-2" />
              <span className="text-xs">Edit Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EyeOff className="w-3 h-3 mr-2" />
              <span className="text-xs">Hide from view</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                setOptionType('delete');
                openModal();
              }}
            >
              <Trash className="w-3 h-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {optionType === 'details' && (
          <DialogContent className="max-w-96 max-h-[100vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Update option</DialogTitle>
            </DialogHeader>

            <CustomOptionForm
              color={column.color}
              description={column.description}
              label={column.label}
              onSubmit={(data) => console.log({ ...data, id: '' })}
              submitBtnLabel="Update option"
              cancelButton={
                <Button className={cn(secondaryBtnStyles)} onClick={closeModal}>
                  Cancel
                </Button>
              }
            />
          </DialogContent>
        )}

        {optionType === 'limit' && (
          <DialogContent className="max-w-80 gap-2">
            <DialogHeader>
              <DialogTitle>
                {column.limit === 0 ? 'Set column limit' : 'Edit column limit'}
              </DialogTitle>
            </DialogHeader>
            <Separator className="my-2" />

            <Label className="mb-0 pb-0">Column limit</Label>
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.currentTarget.value))}
              className="h-8"
            />
            <Label className="text-xs text-gray-500">
              A limit on the number of items in a column
            </Label>
            <Separator className="my-2" />
            <div className="flex justify-end gap-2">
              <Button
                className={cn(secondaryBtnStyles, 'px-3 h-7')}
                onClick={() => {
                  closeModal();
                  setOptionType('');
                }}
              >
                Cancel
              </Button>
              <Button
                className={cn(successBtnStyles, 'px-3 h-7')}
                onClick={handleUpdateLimit}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        )}

        {optionType === 'delete' && (
          <DialogContent className="max-w-96 gap-2">
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete <br />{' '}
                {column.label.toUpperCase()} column
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                className={cn(secondaryBtnStyles, 'bg-gray-50 px-3 h-7')}
                onClick={() => {
                  closeModal();
                  setOptionType('');
                  setLimit(column.limit);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className={cn(
                  'text-red-600 dark:text-red-300 px-3 h-7 hover:bg-red-800 dark:hover:bg-red-600 hover:text-white dark:hover:text-white'
                )}
                onClick={() => handleDeleteColumn(column.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
