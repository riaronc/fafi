"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "./category-icon";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Icons array for selection (Consider moving to a constants file)
const icons = [
  "home", "shopping-cart", "credit-card", "dollar-sign", "briefcase", 
  "coffee", "utensils", "car", "plane", "film", "book", "gift", "heart", 
  "phone", "music", "monitor", "zap", "droplet", "thermometer", "shopping-bag"
];

// Tailwind color palette guide with hex values
// Hex values are approximate for default Tailwind - adjust if needed
const tailwindColorGuide = [
  { name: 'Gray', bgClass: 'bg-gray-50', fgClass: 'text-gray-600', bgHex: '#F9FAFB', fgHex: '#4B5563' },
  { name: 'Red', bgClass: 'bg-red-50', fgClass: 'text-red-600', bgHex: '#FEF2F2', fgHex: '#DC2626' },
  { name: 'Orange', bgClass: 'bg-orange-50', fgClass: 'text-orange-600', bgHex: '#FFF7ED', fgHex: '#EA580C' },
  { name: 'Yellow', bgClass: 'bg-yellow-50', fgClass: 'text-yellow-600', bgHex: '#FEFDF2', fgHex: '#CA8A04' },
  { name: 'Lime', bgClass: 'bg-lime-50', fgClass: 'text-lime-600', bgHex: '#F7FEE7', fgHex: '#65A30D' },
  { name: 'Emerald', bgClass: 'bg-emerald-50', fgClass: 'text-emerald-600', bgHex: '#ECFDF5', fgHex: '#059669' },
  { name: 'Sky', bgClass: 'bg-sky-50', fgClass: 'text-sky-600', bgHex: '#F0F9FF', fgHex: '#0284C7' },
  { name: 'Indigo', bgClass: 'bg-indigo-50', fgClass: 'text-indigo-600', bgHex: '#EEF2FF', fgHex: '#4F46E5' },
  { name: 'Purple', bgClass: 'bg-purple-50', fgClass: 'text-purple-600', bgHex: '#FAF5FF', fgHex: '#9333EA' },

  { name: 'GrayInverted', bgClass: 'bg-gray-600', fgClass: 'text-gray-50', bgHex: '#4B5563', fgHex: '#F9FAFB' },
  { name: 'RedInverted', bgClass: 'bg-red-600', fgClass: 'text-red-50', bgHex: '#DC2626', fgHex: '#FEF2F2' },
  { name: 'OrangeInverted', bgClass: 'bg-orange-600', fgClass: 'text-orange-50', bgHex: '#EA580C', fgHex: '#FFF7ED' },
  { name: 'YellowInverted', bgClass: 'bg-yellow-600', fgClass: 'text-yellow-50', bgHex: '#CA8A04', fgHex: '#FEFDF2' },
  { name: 'LimeInverted', bgClass: 'bg-lime-600', fgClass: 'text-lime-50', bgHex: '#65A30D', fgHex: '#F7FEE7' },
  { name: 'EmeraldInverted', bgClass: 'bg-emerald-600', fgClass: 'text-emerald-50', bgHex: '#059669', fgHex: '#ECFDF5' },
  { name: 'SkyInverted', bgClass: 'bg-sky-600', fgClass: 'text-sky-50', bgHex: '#0284C7', fgHex: '#F0F9FF' },
  { name: 'IndigoInverted', bgClass: 'bg-indigo-600', fgClass: 'text-indigo-50', bgHex: '#4F46E5', fgHex: '#EEF2FF' },
  { name: 'PurpleInverted', bgClass: 'bg-purple-600', fgClass: 'text-purple-50', bgHex: '#9333EA', fgHex: '#FAF5FF' },
];

// Form validation schema (re-exported for potential use elsewhere)
export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }), // Min 1 for live preview
  type: z.enum(["INCOME", "EXPENSE", "BOTH"]), 
  bgColor: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Must be a valid hex color" }),
  fgColor: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Must be a valid hex color" }),
  icon: z.string().min(1, { message: "Icon is required" }),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  initialData?: Partial<CategoryFormValues>; // For editing
  isPending?: boolean; // To disable button during submission
}

export function CategoryForm({ onSubmit, initialData, isPending }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      type: "EXPENSE",
      bgColor: "#EEEEEE", // Default hex bg
      fgColor: "#333333", // Default hex fg
      icon: "credit-card",
    },
  });

  // Watch fields for live preview
  const watchedName = form.watch("name");
  const watchedIcon = form.watch("icon");
  const watchedBgColor = form.watch("bgColor");
  const watchedFgColor = form.watch("fgColor");

  // Update form default values when initialData changes (for edit)
  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  // Helper function to set colors from palette
  const setColorFromPalette = (bgHex: string, fgHex: string) => {
    form.setValue("bgColor", bgHex, { shouldDirty: true, shouldValidate: true });
    form.setValue("fgColor", fgHex, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Preview</FormLabel>
          <div className="flex items-center space-x-3 p-3 border rounded-md min-h-[50px]">
            <div 
              className="p-2 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{
                backgroundColor: watchedBgColor || "#EEEEEE",
                color: watchedFgColor || "#333333"
              }}
            >
              <CategoryIcon name={watchedIcon || "help-circle"} className="h-5 w-5" />
            </div>
            <span 
              className="text-sm font-medium truncate"
            >
              {watchedName || "Category Name"}
            </span>
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 pt-2"
                >
                  {icons.map((icon) => (
                    <FormItem key={icon} className="flex items-center justify-center">
                      <FormControl>
                        <RadioGroupItem value={icon} id={`icon-${icon}`} className="sr-only" />
                      </FormControl>
                      <Label
                        htmlFor={`icon-${icon}`}
                        className={cn(
                          "flex items-center justify-center p-2 border rounded-md cursor-pointer hover:border-primary h-10 w-10",
                          field.value === icon && "border-2 border-primary ring-2 ring-primary/50"
                        )}
                      >
                        <CategoryIcon name={icon} className="h-5 w-5" />
                        <span className="sr-only">{icon}</span>
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormItem>
          <FormLabel>Color Palette Guide</FormLabel>
          <FormDescription>
            Click a swatch to set both background and foreground colors.
          </FormDescription>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 pt-2">
            {tailwindColorGuide.map((color) => (
              <button 
                type="button" // Prevent form submission
                key={color.name} 
                className={cn(
                  "h-10 w-10 rounded-md flex items-center justify-center border cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", // Focus styles
                  color.bgClass, // Use class for display
                  color.fgClass  // Use class for display
                )}
                title={`Set ${color.name} (BG: ${color.bgHex}, FG: ${color.fgHex})`}
                onClick={() => setColorFromPalette(color.bgHex, color.fgHex)}
              >
                <span className="font-bold text-xs">Aa</span> 
              </button>
            ))}
          </div>
        </FormItem>
        
        {/* --- Hidden Color Fields --- */}
        <FormField
          control={form.control}
          name="bgColor"
          render={() => <FormItem className="hidden"></FormItem>} // Render hidden FormItem
        />
        <FormField
          control={form.control}
          name="fgColor"
          render={() => <FormItem className="hidden"></FormItem>} // Render hidden FormItem
        />
        {/* ------------------------- */}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Saving..." : (initialData ? "Save Changes" : "Add Category")}
        </Button>
      </form>
    </Form>
  );
} 