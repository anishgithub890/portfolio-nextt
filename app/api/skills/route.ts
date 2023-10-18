import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { label, imageUrl } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });

    const skill = await prisma.skill.create({
      data: {
        label,
        imageUrl,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log('[SKILL_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
