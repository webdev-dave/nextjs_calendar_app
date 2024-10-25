"use server";
import "use-server"; //use npm package use-server to warn us if we ever use server side code in client side code

import { eventFormSchema } from "@/schema/events";
import * as z from "zod";
import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createEvent(
  unsafeFormData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = auth();
  const { success, data } = eventFormSchema.safeParse(unsafeFormData);
  if (!success || !userId) {
    return { error: true };
  }

  // create event
  await db.insert(EventTable).values({ ...data, clerkUserId: userId });
  redirect("/events");
}
