import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prismadb';

export async function DELETE(
  req: Request,
  { params }: { params: { skillId: string } }
) {
  try {
    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const skill = await prisma.skill.delete({
      where: {
        id: params.skillId,
        userId: profile.id,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log('[SKILL_ID_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { skillId: string } }
) {
  try {
    const profile = await getCurrentUser();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const skill = await prisma.skill.update({
      where: {
        id: params.skillId,
        userId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log('[SKILL_ID_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
