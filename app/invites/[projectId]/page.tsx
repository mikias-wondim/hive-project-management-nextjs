import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ role: Role }>;
}

export default async function InvitePage({ params, searchParams }: Props) {
  const supabase = await createClient();
  const { projectId } = await params;
  const { role } = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/invites/${projectId}?role=${role}`);
  }

  // Update invitation status
  const { error } = await supabase
    .from('project_members')
    .update({
      invitationStatus: 'accepted',
      joined_at: new Date(),
    })
    .eq('project_id', projectId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error accepting invitation:', error);
    redirect('/projects');
  }

  redirect(`/projects/${projectId}`);
}
