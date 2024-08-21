import { User } from "@prisma/client";

export type SafeUser =  Omit<
User,
"createdAt" | "emailVerified"
> &{
createdAt: string;
emailVerified: string | null;
};
