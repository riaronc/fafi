"use client";

import { categories as CategoriesModel } from "@/server/db/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/shared/category-icon";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryCardProps {
  category: CategoriesModel;
  onEdit: (category: CategoriesModel) => void;
  onDelete: (category: CategoriesModel) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200 rounded-md p-3 py-5">
      <div className="flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-row items-center justify-center space-x-2">
      <div 
          className="p-1.5 rounded-full flex items-center justify-center text-xs"
          style={{ backgroundColor: category.bgColor, color: category.fgColor }}
        >
          <CategoryIcon iconName={category.icon} className="h-4 w-4" size={20}/>
        </div>
        <CardTitle className="text-sm font-medium ">{category.name}</CardTitle>
        {/* Icon with background/foreground color */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 data-[state=open]:bg-muted">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(category)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(category)} 
              className="text-red-600 focus:text-red-700 focus:bg-red-100"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
     
    </div>
  );
} 