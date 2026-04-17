import type { Metadata } from "next";

export const metadata: Metadata = {
  title:"Guest area",
}

export default function Account() {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, John Doe!
    </h2>
  )
}
