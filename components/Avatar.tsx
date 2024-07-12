import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderUserImageUrl } from '@/consts';

export const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src={placeholderUserImageUrl} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
