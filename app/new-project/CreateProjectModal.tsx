import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { CreateOrEditLabelForm } from '@/components/CreateOrEditLabelForm';
import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  defaultLabels,
  defaultPriorities,
  defaultSizes,
  defaultStatuses,
} from '@/consts/default-options';
import { useModalDialog } from '@/hooks/useModalDialog';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uid } from 'uuid';
import { secondaryBtnStyles, successBtnStyles } from '../commonStyles';
import { LabelList } from '../projects/[projectId]/settings/labels/LabelList';

interface Props {
  projectDetails: {
    name: string;
    description: string;
    readme: string;
  };
}

export const CreateProjectModal = ({ projectDetails }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModalDialog();
  const [statuses, setStatuses] = useState(defaultStatuses);
  const [sizes, setSizes] = useState(defaultSizes);
  const [priorities, setPriorities] = useState(defaultPriorities);
  const [labels, setLabels] = useState(defaultLabels);
  const [showNewLabelCard, setShowNewLabelCard] = useState(false);
  const [skipDefaultOptions, setSkipDefaultOption] = useState(false);

  const { name, description, readme } = projectDetails;

  const AddNewOptionBtn = (
    <Button className={cn(secondaryBtnStyles, 'h-7 px-2 rounded-sm mr-2')}>
      <Plus className="w-4 h-4 mr-1" />
      New
    </Button>
  );

  const handleAddNewOptionItem = (
    data: Omit<ICustomFieldData, 'id'>,
    state: CustomFieldDBTableName
  ) => {
    switch (state) {
      case 'sizes':
        setSizes([...sizes, { id: uid(), ...data }]);
        break;
      case 'priorities':
        setPriorities([...priorities, { id: uid(), ...data }]);
        break;
      case 'statuses':
        setStatuses([...statuses, { id: uid(), ...data }]);
        break;
      default:
        break;
    }
  };

  const handleRemoveOptionItem = (
    id: string,
    state: CustomFieldDBTableName
  ) => {
    switch (state) {
      case 'sizes':
        setSizes(sizes.filter((item) => item.id !== id));
        break;
      case 'priorities':
        setPriorities(priorities.filter((item) => item.id !== id));
        break;
      case 'statuses':
        setStatuses(statuses.filter((item) => item.id !== id));
        break;
      default:
        break;
    }
  };

  const handleAddNewLabelItem = (data: ICustomFieldData) => {
    setLabels([...labels, data]);
    setShowNewLabelCard(false);
  };

  const handleRemoveLabelItem = (id: string) => {
    setLabels(labels.filter((item) => item.id !== id));
  };

  const handleCreateProject = () => {
    if (skipDefaultOptions) {
      console.log(
        'creating project without default options',
        name,
        description,
        readme
      );
    } else {
      console.log(
        'creating project with default options',
        name,
        description,
        readme,
        sizes,
        priorities,
        statuses,
        labels
      );
    }

    closeModal();
    // redirect to kanban board
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal}>
      <DialogTrigger
        onClick={openModal}
        className={cn(
          successBtnStyles,
          'w-28 flex items-center justify-center',
          'disabled:cursor-not-allowed disabled:opacity-40'
        )}
        disabled={!name}
      >
        Continue
      </DialogTrigger>
      <DialogContent className="md:min-w-[90%] lg:min-w-[70%] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Customize default options for your project.
        </DialogDescription>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto p-2">
          <CustomFieldOptions
            title="Sizes"
            field="size"
            dbTableName="sizes"
            items={sizes}
            hiddenDescription
            embeddedCreateOptionEle={
              <CreateCustomFieldOptionModal
                title="Create new size option"
                dbTableName="sizes"
                handleSubmitLocal={(data) =>
                  handleAddNewOptionItem(data, 'sizes')
                }
                triggerBtn={AddNewOptionBtn}
              />
            }
            deleteLocalItem={(id) => handleRemoveOptionItem(id, 'sizes')}
          />
          <CustomFieldOptions
            title="Priorities"
            field="priority"
            dbTableName="priorities"
            items={priorities}
            hiddenDescription
            embeddedCreateOptionEle={
              <CreateCustomFieldOptionModal
                title="Create new priority option"
                dbTableName="priorities"
                handleSubmitLocal={(data) =>
                  handleAddNewOptionItem(data, 'priorities')
                }
                triggerBtn={AddNewOptionBtn}
              />
            }
            deleteLocalItem={(id) => handleRemoveOptionItem(id, 'priorities')}
          />
          <CustomFieldOptions
            title="Columns"
            field="status"
            dbTableName="statuses"
            items={statuses}
            hiddenDescription
            embeddedCreateOptionEle={
              <CreateCustomFieldOptionModal
                title="Create new status option"
                dbTableName="statuses"
                handleSubmitLocal={(data) =>
                  handleAddNewOptionItem(data, 'statuses')
                }
                triggerBtn={AddNewOptionBtn}
              />
            }
            deleteLocalItem={(id) => handleRemoveOptionItem(id, 'statuses')}
          />
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-lg py-3">Labels</h1>
              <Button
                onClick={() => setShowNewLabelCard(true)}
                className={cn(secondaryBtnStyles, 'h-7 px-2 rounded-sm mr-2')}
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </div>

            {showNewLabelCard && (
              <CreateOrEditLabelForm
                save={(data) => handleAddNewLabelItem(data)}
                cancel={() => setShowNewLabelCard(false)}
              />
            )}

            <div className="rounded border">
              <LabelList
                labels={labels}
                hiddenDescription
                removeItem={handleRemoveLabelItem}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Checkbox
            checked={skipDefaultOptions}
            onClick={() => setSkipDefaultOption(!skipDefaultOptions)}
          />
          <Label>Skip Default options. I will create my own options</Label>
        </div>

        <DialogFooter>
          <div className="flex justify-end">
            <Button
              onClick={handleCreateProject}
              className={cn(successBtnStyles, 'w-28')}
            >
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
