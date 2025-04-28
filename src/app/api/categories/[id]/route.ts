import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/categories/[id] - Get a specific category
export async function GET(request: Request, { params }: RouteParams) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to access this endpoint" },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = session.user.id;
    const categoryId = params.id;

    // Fetch category from database
    const category = await prisma.categories.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });

    // Check if category exists
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the category" },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to access this endpoint" },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = session.user.id;
    const categoryId = params.id;

    // Parse request body
    const { name, type, bgColor, fgColor, icon } = await request.json();

    // Validate required fields
    if (!name || !type || !bgColor || !fgColor || !icon) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if category exists and belongs to the user
    const existingCategory = await prisma.categories.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Update category in database
    const updatedCategory = await prisma.categories.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        type,
        bgColor,
        fgColor,
        icon,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the category" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to access this endpoint" },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = session.user.id;
    const categoryId = params.id;

    // Check if category exists and belongs to the user
    const existingCategory = await prisma.categories.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Delete category
    await prisma.categories.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the category" },
      { status: 500 }
    );
  }
} 