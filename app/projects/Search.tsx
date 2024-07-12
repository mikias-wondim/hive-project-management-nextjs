import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  placeholderText?: string;
}

const SearchAndButton = ({ placeholderText }: Props) => {
  return (
    <div className="flex items-center py-4">
      <div className="flex-grow mr-2">
        <Input
          type="text"
          placeholder={placeholderText || 'Search all projects'}
          className="w-full p-2 rounded"
        />
      </div>
      <Link href="/new-project">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          <Plus className="w-4 h-4 mr-2" />
          New project
        </Button>
      </Link>
    </div>
  );
};

export default SearchAndButton;
