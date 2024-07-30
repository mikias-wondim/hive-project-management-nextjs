import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderUserImageUrl } from '@/consts';
import { AvatarProps } from '@radix-ui/react-avatar';

interface Props extends AvatarProps {
  name?: string;
}

export const UserAvatar: React.FC<Props> = ({ name, ...rest }) => {
  return (
    <Avatar {...rest}>
      <AvatarImage src={placeholderUserImageUrl} alt="user avatar" />
      <AvatarFallback>
        {name ? name.charAt(0).toUpperCase() : 'O'}
      </AvatarFallback>
    </Avatar>
  );
};
