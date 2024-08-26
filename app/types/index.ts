import { Listing, Reservation, User } from "@prisma/client";

export type safeListing =  Omit<
Listing,
"createdAt" 
> &{
    createdAt: string;
}

export type SafeReservation = Omit<
Reservation,
"createdAt" | "startDate" | "endDate" | "listing"
> &{
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: safeListing;
}

export type SafeUser =  Omit<
User,
"createdAt" | "emailVerified"
> &{
createdAt: string;
emailVerified: string | null;
};
