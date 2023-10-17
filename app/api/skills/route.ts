import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, imageUrl } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });

    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        imageUrl,
        userId: profile.id,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.log('[SKILL_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
