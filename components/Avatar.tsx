import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  src?: string;
  fallback?: string;
  className?: string;
}

export const UserAvatar: React.FC<Props> = ({ src, fallback, ...rest }) => {
  return (
    <Avatar {...rest}>
      <AvatarImage src={src} alt="user avatar" />
      <AvatarFallback>
        {fallback ? fallback.charAt(0).toUpperCase() : 'O'}
      </AvatarFallback>
    </Avatar>
  );
};
