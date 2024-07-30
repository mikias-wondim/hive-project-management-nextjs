import { Separator } from '@/components/ui/separator';
import { CreateProjectModal } from './CreateProjectModal';
import { ProjectTemplates } from './ProjectTemplates';

const NewProjectPage = () => {
  return (
    <div className="w-[90%] mx-auto p-8 ">
      <h1 className="text-xl">Create New Project</h1>
      <CreateProjectModal triggerElem={<span>Start from scratch</span>} />

      <div className="py-8">
        <span>Start with a template</span>
        <Separator className="my-4" />
        <ProjectTemplates />
      </div>
    </div>
  );
};

export default NewProjectPage;
