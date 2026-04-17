import ReservationCard from "@/components/ReservationCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:"Reservations",
}

    
export default function Reservations() {
  const bookings = [
    {
        id: 1,
        guestId: 1,
        startDate: "2024-07-01",
        endDate: "2024-07-10",
        numNights: 9,
        totalPrice: 2250,
        numGuests: 2,
        status: "unconfirmed",
        created_at: "2026-06-15T12:00:00Z",
        cabins: { name: "Luxury Lakefront Cabin", image: "cabin1.jpg" },
    },
    {
      id: 2,
      guestId: 1,
      startDate: "2024-08-01",
      endDate: "2024-08-07",
      numNights: 6,
      totalPrice: 1500,
      numGuests: 4,
      status: "checked-in",
      created_at: "2026-06-20T10:00:00Z",
      cabins: { name: "Cozy Mountain Cabin", image: "cabin2.jpg" },
    },
  ];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
