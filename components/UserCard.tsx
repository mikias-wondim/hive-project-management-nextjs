import React, { FC } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { UserAvatar } from './Avatar';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
}

export const UserCard: FC<Props> = ({ id, name, avatarUrl, description }) => {
  return (
    <HoverCard>
      <Link href={`/profile/${id}`}>
        <HoverCardTrigger asChild>
          <div className="flex items-center gap-1">
            <UserAvatar url={avatarUrl} name={name} className="w-5 h-5" />
            <span className="text-bold">{name}</span>
          </div>
        </HoverCardTrigger>
      </Link>
      <HoverCardContent side="top">
        <Link href={`/profile/${id}`}>
          <UserAvatar url={avatarUrl} name={name} />
        </Link>
        <p className="text-bold py-2 text-gray-400">{name}</p>

        {description}
      </HoverCardContent>
    </HoverCard>
  );
};
