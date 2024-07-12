import React from 'react';
import { Board } from './Board';

const ProjectDetailsPage = () => {
  return (
    <div className="h-minus-135">
      <div className="bg-gray-950 border p-4">
        <h1 className="text-xl">Project Name</h1>
      </div>
      <Board />
    </div>
  );
};

export default ProjectDetailsPage;
