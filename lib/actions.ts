"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";

export async function createBooking(bookingData: any, formData: FormData) {
  const newBooking = {
    ...bookingData,
    guestId: 18, // In a real app, we would get this from the session or authentication context
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString().slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
