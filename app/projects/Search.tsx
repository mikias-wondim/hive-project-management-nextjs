import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { successBtnStyles } from '../commonStyles';

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
        <Button className={cn(successBtnStyles, 'h-9')}>
          <Plus className="w-4 h-4 mr-2" />
          New project
        </Button>
      </Link>
    </div>
  );
};

export default SearchAndButton;
