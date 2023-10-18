import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { skillId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image is required', { status: 400 });
    }

    if (!params.skillId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const skill = await prismadb.skill.updateMany({
      where: {
        id: params.skillId,
        userId: currentUser.id,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log('[SKILL_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const skill = await prismadb.skill.deleteMany({
      where: {
        id: params.storeId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log('[SKILL_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
