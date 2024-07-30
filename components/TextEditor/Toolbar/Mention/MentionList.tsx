import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface MentionListProps {
  items: string[];
  command: (item: { id: string }) => void;
}

export interface MentionListRef {
  onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListRef, MentionListProps>(
  function MentionList(props, ref) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      console.log('selected item', item);

      if (item) {
        props.command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="bg-gray-200 dark:bg-gray-900 border p-2 rounded-sm mention-dropdown-menu">
        {props.items.length ? (
          props.items.map((item, index) => (
            <Button
              variant="ghost"
              className={cn(
                `mention-btn-${index}`,
                'w-full flex justify-start items-center py-1 px-2 rounded-sm',
                index === selectedIndex ? 'bg-gray-50 dark:bg-gray-800' : ''
              )}
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                selectItem(index);
              }}
            >
              <span className="w-4 h-4 mr-2 rounded-full bg-gray-600"></span>
              {item}
            </Button>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    );
  }
);

export default MentionList;
