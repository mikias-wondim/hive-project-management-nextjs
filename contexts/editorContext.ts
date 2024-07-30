import { createContext, useContext } from 'react';

interface IEditorContext {
  editable: boolean;
  setEditable: (editable: boolean) => void;
}

export const EditorContext = createContext<IEditorContext | null>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditorContext should be used within <EditorContext>');
  }

  return context;
};
