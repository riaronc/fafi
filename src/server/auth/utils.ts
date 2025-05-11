"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/options"; // Assuming authOptions is here

/**
 * Retrieves the ID of the currently authenticated user.
 * Throws an error if the user is not authenticated.
 * @returns {Promise<string>} The authenticated user's ID.
 * @throws {Error} If the user is not authenticated.
 */
export async function getAuthenticatedUserId(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    console.error("Authentication error: No session or user ID found.");
    throw new Error("User not authenticated. Please log in.");
  }
  return session.user.id;
}

// You can add other shared authentication utility functions here if needed. 