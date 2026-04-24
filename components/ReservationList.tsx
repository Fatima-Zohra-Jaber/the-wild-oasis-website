"use client";

import ReservationCard from "@/components/ReservationCard";
import { deleteBooking } from "@/lib/actions";
import { useOptimistic } from "react";

function ReservationList({ bookings }: { bookings: any[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) =>
      currentBookings.filter((b) => b.id !== bookingId),
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
