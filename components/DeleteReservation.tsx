"use client";

import { useTransition } from "react";
import { deleteBooking } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteReservation({ bookingId }: { bookingId: number }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={() => startTransition(() => deleteBooking(bookingId))}
    >
      {isPending ? (
        <div className="mx-auto spinner-mini"></div>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
