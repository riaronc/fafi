'use server';

import { z } from "zod";
import bcrypt from 'bcryptjs';
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db";

// Schema for registration input (can be refined or imported)
const registerActionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type RegisterActionInput = z.infer<typeof registerActionSchema>;

// Return type for the action
type RegisterUserResult = 
  | { success: true; user: { id: string; email: string | null; name: string | null; } } // Return basic user info on success
  | { success: false; error: string; issues?: z.ZodIssue[] };

/**
 * Registers a new user.
 * @param input - User registration data (name, email, password).
 * @returns Result object indicating success or failure.
 */
export async function registerUser(input: RegisterActionInput): Promise<RegisterUserResult> {
  // 1. Validate input
  const validationResult = registerActionSchema.safeParse(input);
  if (!validationResult.success) {
    return { success: false, error: "Invalid registration data.", issues: validationResult.error.issues };
  }
  const { name, email, password } = validationResult.data;

  try {
    // 2. Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // 4. Create user
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // Add other default fields if necessary (e.g., emailVerified, image)
      },
      select: { // Only select necessary fields to return
        id: true,
        email: true,
        name: true,
      }
    });

    // 5. Return success
    return { success: true, user: newUser };

  } catch (error) {
    console.error("Error registering user:", error);
    // Handle potential Prisma unique constraint errors more specifically if needed
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
       if (error.code === 'P2002') { // Unique constraint failed
         return { success: false, error: "An account with this email already exists." };
       }
    }
    return { success: false, error: "An unexpected error occurred during registration." };
  }
} 