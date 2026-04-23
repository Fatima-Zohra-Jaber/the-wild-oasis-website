"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";

export async function updateGuest(
  prevState: { success?: boolean; error?: string } | null,
  formData: FormData,
): Promise<{
  success?: boolean | undefined;
  error?: string | undefined;
}> {
  const nationalityRaw = formData.get("nationality")?.toString() ?? "";
  const [nationality, countryFlag] = nationalityRaw.split("%");
  const nationalID = formData.get("nationalID")?.toString().trim();

  if (!nationality || !countryFlag) return { error: "Nationality is required" };

  if (!nationalID || !/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    return { error: "Invalid National ID" };

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("email", "example@gmail.com");

  if (error)
    return { error: `Failed to update guest profile: ${error.message}` };

  revalidatePath("/account/profile");
  return { success: true };
}

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

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations =
    formData.get("observations")?.toString().slice(0, 1000) || "";

  if (!numGuests || numGuests < 1)
    throw new Error("Number of guests must be at least 1");

  const updateData = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId: number) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath(`/account/reservations`);
}
