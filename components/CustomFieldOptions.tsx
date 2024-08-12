'use client';
import { secondaryBtnStyles } from '@/app/commonStyles';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { grayFieldColor } from '@/consts/colors';
import { useModalDialog } from '@/hooks/useModalDialog';
import { cn } from '@/lib/utils';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Ellipsis, GripVertical } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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
  title?: string;
  options: ICustomFieldData[];
  hiddenDescription?: boolean;
  setOptions?: Dispatch<SetStateAction<ICustomFieldData[]>>;
  embeddedCreateOptionEle?: ReactNode;
}

export const CustomFieldOptions = ({
  field,
  options,
  title,
  hiddenDescription,
  setOptions,
  embeddedCreateOptionEle,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModalDialog();
  const [optionId, setOptionId] = useState<string | undefined>(undefined);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setOptions?.((prevOptions) => {
        const oldIndex = prevOptions.findIndex((item) => item.id === active.id);
        const newIndex = prevOptions.findIndex((item) => item.id === over?.id);

        return arrayMove(prevOptions, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateOption = (option: ICustomFieldData) => {
    setOptions?.((prevOptions) =>
      prevOptions.map((foundOption) =>
        foundOption.id === option.id ? option : foundOption
      )
    );
    closeModal();
    setOptionId(undefined);
  };

  const handleDeleteItem = (id: string) => {
    setOptions?.((prevOptions) => prevOptions.filter((item) => item.id !== id));
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
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={options}
                strategy={verticalListSortingStrategy}
              >
                {options.map((item, i) => (
                  <DropContainer
                    key={item.id}
                    field={field}
                    item={item}
                    selectedOptionId={optionId}
                    hiddenDescription={hiddenDescription}
                    closeModal={closeModal}
                    openModal={openModal}
                    setOptionId={setOptionId}
                    deleteOption={handleDeleteItem}
                    updateOption={handleUpdateOption}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </Dialog>
    </>
  );
};

interface DropContainerProps {
  field: string;
  item: ICustomFieldData;
  hiddenDescription?: boolean;
  selectedOptionId: string | undefined;
  deleteOption?: (id: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setOptionId: Dispatch<SetStateAction<string | undefined>>;
  updateOption?: (option: ICustomFieldData) => void;
}

const DropContainer = ({
  field,
  item,
  selectedOptionId,
  hiddenDescription,
  closeModal,
  openModal,
  setOptionId,
  deleteOption,
  updateOption,
}: DropContainerProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleUpdateOption = (item: ICustomFieldData) => {
    if (typeof updateOption === 'function') {
      updateOption(item);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (typeof deleteOption === 'function') {
      deleteOption(id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border bg-white dark:bg-slate-950"
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <span {...listeners} {...attributes}>
            <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-600 cursor-grabbing" />
          </span>
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
            <DropdownMenuItem onClick={() => handleDeleteItem(item.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {item.id === selectedOptionId && (
        <DialogContent className="max-w-96 max-h-[100vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update {field}</DialogTitle>
          </DialogHeader>

          <CustomOptionForm
            color={item.color}
            description={item.description}
            label={item.label}
            onSubmit={(data) => handleUpdateOption({ ...data, id: item.id })}
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
  );
};
