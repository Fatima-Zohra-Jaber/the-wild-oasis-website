"use client";

import Image from "next/image";
import { updateGuest } from "@/lib/actions";
import { useActionState } from "react";
import SubmitButton from "./SubmitButton";

interface ProfileFormProps {
  guest: {
    fullName: string;
    email: string;
    nationality: string;
    countryFlag: string;
    nationalID: string;
  };
  children?: React.ReactNode;
}

function ProfileForm({ guest, children }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateGuest, null);
  return (
    <form
      action={formAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={guest.fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={guest.email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={guest.countryFlag}
            alt="Country flag"
            className="rounded-sm"
            width={25}
            height={25}
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          id="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={guest.nationalID}
        />
      </div>

      {state?.error && (
        <p className="text-red-500 font-semibold">Error: {state?.error}</p>
      )}

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingValue="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default ProfileForm;
