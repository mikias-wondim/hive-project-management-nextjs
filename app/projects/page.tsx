import React from 'react';
import { AccountDetails } from './AccountDetails';
import { Projects } from './Projects';

const ProjectsPage = () => {
  return (
    <div className="w-[90%] flex flex-col md:flex-row  mx-auto p-8 gap-4">
      <div className="w-full md:w-72">
        <AccountDetails />
      </div>
      <div className="flex-1">
        <Projects />
      </div>
    </div>
  );
};

export default ProjectsPage;
