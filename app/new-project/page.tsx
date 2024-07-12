import { Separator } from '@/components/ui/separator';
import React from 'react';
import { ProjectTemplates } from './ProjectTemplates';
import { Button } from '@/components/ui/button';
import { CreateProjectModal } from './CreateProjectModal';

const NewProjectPage = () => {
  return (
    <div className="w-[90%] mx-auto p-8 ">
      <h1 className="text-xl">Create New Project</h1>
      <CreateProjectModal
        triggerElem={
          <Button className="h-9 px-8 mt-8 bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Start from scratch
          </Button>
        }
      />

      <div className="py-8">
        <span>Start with a template</span>
        <Separator className="my-4" />
        <ProjectTemplates />
      </div>
    </div>
  );
};

export default NewProjectPage;
