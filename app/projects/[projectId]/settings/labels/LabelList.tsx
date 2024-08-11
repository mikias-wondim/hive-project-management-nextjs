'use client';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LabelBadge } from '@/components/LabelBadge';
import { useSearchParams } from 'next/navigation';
import { defaultFieldColor } from '@/consts/colors';
import { CreateOrEditLabelForm } from '@/components/CreateOrEditLabelForm';

interface Props {
  labels: ICustomFieldData[];
  hiddenDescription?: boolean;
  removeItem?: (id: string) => void;
}

export const LabelList = ({
  labels,
  hiddenDescription = false,
  removeItem,
}: Props) => {
  const searchParams = useSearchParams();
  const [labelId, setLabelId] = useState('');

  useEffect(() => {
    const labelIdParams = searchParams.get('label_id');

    if (labelIdParams) {
      setLabelId(labelIdParams);
    }
  }, [searchParams]);

  return (
    <div className="w-full rounded-md shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <tbody className=" divide-y divide-gray-200 dark:divide-gray-700">
          {labels.map((label) => (
            <React.Fragment key={label.id}>
              <tr>
                <td className="p-4 whitespace-nowrap">
                  <LabelBadge
                    labelText={label.label || ''}
                    description={label.description || ''}
                    color={label.color || defaultFieldColor}
                  />
                </td>
                {!hiddenDescription && (
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400 truncate hidden md:block">
                    {label.description}
                  </td>
                )}
                <td className="p-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative inline-block text-left">
                    <div className="space-x-1 hidden lg:flex">
                      <Button
                        className={cn(
                          secondaryBtnStyles,
                          'text-xs h-8 rounded-sm'
                        )}
                        onClick={() => setLabelId(label.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={cn(
                          secondaryBtnStyles,
                          'text-xs text-red-600 dark:text-red-300 h-8 rounded-sm'
                        )}
                        onClick={() => removeItem?.(label.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="lg:hidden">
                        <Ellipsis />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setLabelId(label.id)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => removeItem?.(label.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
              {labelId === label.id && (
                <tr>
                  <td colSpan={4} className="p-4">
                    <CreateOrEditLabelForm
                      mode="edit"
                      cancel={() => setLabelId('')}
                      data={label}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
