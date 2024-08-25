import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams{
    listingId: string;
}

export async function POST(
    request: Request,
    {params}: {params: Iparams}

){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listingId");
    }
    

    let favriteIds = [...(currentUser.favriteIds || [])];
    favriteIds.push(listingId);

    const user = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favriteIds
        }
    });
    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    {params}: {params: Iparams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid listingId");
    }

    let favriteIds = [...(currentUser.favriteIds || [])];

    favriteIds = favriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favriteIds
        }
    });
    return NextResponse.json(user);
}
