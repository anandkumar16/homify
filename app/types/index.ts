import { Listing, User } from "@prisma/client";

export type safeListing =  Omit<
Listing,
"createdAt" 
> &{
    createdAt: string;
}

export type SafeUser =  Omit<
User,
"createdAt" | "emailVerified"
> &{
createdAt: string;
emailVerified: string | null;
};
