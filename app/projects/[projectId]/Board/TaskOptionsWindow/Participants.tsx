import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderUserImageUrl } from '@/consts';

export const Participants = () => (
  <>
    <div className="flex justify-between items-center text-gray-500 pt-4">
      <span className="text-xs">Participants</span>
    </div>
    <div className="text-xs py-2">
      <Avatar className="w-5 h-5">
        <AvatarImage src={placeholderUserImageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  </>
);
