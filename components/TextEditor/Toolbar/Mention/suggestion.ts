import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance, Props } from 'tippy.js';
import MentionList, { MentionListRef } from './MentionList';

interface SuggestionProps {
  editor: any;
  query: string;
  range: any;
  items: any[];
  clientRect?: () => DOMRect;
}

interface OnKeyDownProps {
  event: KeyboardEvent;
}

const suggestion = {
  items: ({ query }: { query: string }) => {
    return [
      'Lea Thompson',
      'Cyndi Lauper',
      'Tom Cruise',
      'Madonna',
      'Jerry Hall',
      'Joan Collins',
      'Winona Ryder',
      'Christina Applegate',
      'Alyssa Milano',
      'Molly Ringwald',
      'Ally Sheedy',
      'Debbie Harry',
      'Olivia Newton-John',
      'Elton John',
      'Michael J. Fox',
      'Axl Rose',
      'Emilio Estevez',
      'Ralph Macchio',
      'Rob Lowe',
      'Jennifer Grey',
      'Mickey Rourke',
      'John Cusack',
      'Matthew Broderick',
      'Justine Bateman',
      'Lisa Bonet',
    ]
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    let component: ReactRenderer<MentionListRef> | null = null;
    let popup: Instance<Props> | null = null;

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          onShow: () => {
            // Focus the first button when the tooltip is shown
            const firstButton = document.querySelector(
              '.mention-btn-0'
            ) as HTMLButtonElement;
            firstButton?.focus();
          },
        })[0];
      },

      onUpdate(props: SuggestionProps) {
        component?.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.setProps({
          getReferenceClientRect: props.clientRect || props.clientRect,
        });
      },

      onKeyDown(props: OnKeyDownProps) {
        if (props.event.key === 'Escape') {
          popup?.hide();
          return true;
        }

        return component?.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.destroy();
        component?.destroy();
      },
    };
  },
};

export default suggestion as any;
