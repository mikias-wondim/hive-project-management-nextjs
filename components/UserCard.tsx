import React, { FC } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { UserAvatar } from './Avatar';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Link as LinkIcon } from 'lucide-react';

interface Props {
  id: string;
  name: string;
  avatarUrl: string;
  description?: string;
  links?: IUserLink[];
  showPreviewName?: boolean;
}

export const UserCard: FC<Props> = ({
  id,
  name,
  avatarUrl,
  description,
  links,
  showPreviewName = true,
}) => {
  return (
    <HoverCard>
      <Link href={`/profile/${id}`}>
        <HoverCardTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <UserAvatar
              src={avatarUrl}
              fallback={name.charAt(0)}
              className="w-6 h-6"
            />
            {showPreviewName && <span className="text-bold">{name}</span>}
          </div>
        </HoverCardTrigger>
      </Link>
      <HoverCardContent side="top" className="w-80">
        <div className="flex items-center gap-2">
          <Link href={`/profile/${id}`}>
            <UserAvatar src={avatarUrl} fallback={name.charAt(0)} />
          </Link>
          <p className="text-bold py-2 text-lg">{name}</p>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground py-3">{description}</p>
        )}

        {links && links.length > 0 && (
          <>
            <Separator className="my-2" />

            <div className="flex items-center">
              {links?.map((link) => (
                <div key={link.id} className="flex items-center">
                  <LinkIcon className="w-3 h-3 mr-1" />
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-sky-500"
                  >
                    {link.label}
                  </Link>
                  <span className="text-xs text-muted-foreground px-3">|</span>
                </div>
              ))}
            </div>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
