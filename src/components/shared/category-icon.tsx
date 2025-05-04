"use client";

import React from 'react';
import {
    ShoppingCart,
    Store,
    ShoppingBag,
    Utensils,
    Coffee,
    GlassWater,
    Pizza,
    ChefHat,
    Car,
    Bus,
    Train,
    Plane,
    Bike,
    Fuel,
    Ship,
    Sailboat,
    Receipt,
    FileText,
    Zap,
    Home,
    Phone,
    Wifi,
    Tv,
    Ticket,
    Clapperboard,
    Music,
    Gamepad2,
    Dice5,
    PartyPopper,
    HeartPulse,
    Stethoscope,
    Pill,
    Scissors,
    Shirt,
    Sparkles,
    GraduationCap,
    BookOpen,
    Apple,
    Carrot,
    Milk,
    KeyRound,
    Dog,
    Cat,
    Luggage,
    Map,
    Landmark,
    DollarSign,
    Euro,
    TrendingUp,
    CircleHelp,
    Film,
    HandCoins,
    Monitor,
    HelpCircle,
    MoreHorizontal,
    Gift,
    Heart,
    LucideProps,
    CreditCard,
    Briefcase,
    Thermometer,
} from 'lucide-react'; // Import all for the map
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

// Define the type for icon names we expect to handle
// This helps catch typos and ensures we map valid Lucide icon names.
// Add ALL icon names used in your categories here!
export type KnownIconName = 
    | 'ShoppingCart' | 'Store' | 'ShoppingBag' // Shopping
    | 'Utensils' | 'Coffee' | 'GlassWater' | 'Pizza' | 'ChefHat' // Food/Drink
    | 'Car' | 'Bus' | 'Train' | 'Plane' | 'Bike' | 'Fuel' | 'Ship' | 'Sailboat' // Transport
    | 'Receipt' | 'FileText' | 'Zap' | 'Home' | 'Phone' | 'Wifi' | 'Tv' // Bills/Utilities
    | 'Ticket' | 'Clapperboard' | 'Music' | 'Gamepad2' | 'Dice5' | 'PartyPopper' | 'Film' | 'Monitor' // Entertainment
    | 'HeartPulse' | 'Stethoscope' | 'Pill' // Health
    | 'Scissors' | 'Shirt' | 'Sparkles' // Personal Care
    | 'Gift' | 'Heart' // Love
    | 'GraduationCap' | 'BookOpen' // Education - Fixed 'Heart' duplication
    | 'Apple' | 'Carrot' | 'Milk' // Groceries
    | 'KeyRound' // Rent
    | 'HandCoins' // Money
    | 'Dog' | 'Cat' // Pets
    | 'Luggage' | 'Map' // Travel
    | 'Landmark' | 'DollarSign' | 'Euro' | 'TrendingUp' | 'Briefcase' // Income/Salary - Added Briefcase
    | 'CircleHelp' | 'HelpCircle' | 'MoreHorizontal' // Other/Default
    | 'CreditCard' // Added CreditCard
    | 'Thermometer' // Added Thermometer
    // Add any other icons you use in your category definitions!
    ; // Allow any Lucide icon, but prioritize known ones

// --- Icon Map --- 
// Map string names (case-sensitive, matching Lucide export) to components
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
    ShoppingCart: ShoppingCart,
    Store: Store,
    Heart: Heart,
    ShoppingBag: ShoppingBag,
    Utensils: Utensils,
    HandCoins: HandCoins,
    Coffee: Coffee,
    GlassWater: GlassWater,
    Film: Film,
    Monitor: Monitor,
    Pizza: Pizza,
    ChefHat: ChefHat,
    Car: Car,
    Bus: Bus,
    Train: Train,
    Plane: Plane,
    Bike: Bike,
    Fuel: Fuel,
    Ship: Ship,
    Sailboat: Sailboat,
    Receipt: Receipt,
    FileText: FileText,
    Zap: Zap,
    Home: Home,
    Phone: Phone,
    Wifi: Wifi,
    Tv: Tv,
    Ticket: Ticket,
    Clapperboard: Clapperboard,
    Music: Music,
    Gamepad2: Gamepad2,
    Dice5: Dice5,
    PartyPopper: PartyPopper,
    HeartPulse: HeartPulse,
    Stethoscope: Stethoscope,
    Pill: Pill,
    Scissors: Scissors,
    Shirt: Shirt,
    Sparkles: Sparkles,
    GraduationCap: GraduationCap,
    BookOpen: BookOpen,
    Apple: Apple,
    Carrot: Carrot,
    Milk: Milk,
    KeyRound: KeyRound,
    Dog: Dog,
    Cat: Cat,
    Luggage: Luggage,
    Map: Map,
    Landmark: Landmark,
    DollarSign: DollarSign,
    Euro: Euro,
    TrendingUp: TrendingUp,
    CircleHelp: CircleHelp,
    HelpCircle: HelpCircle,
    MoreHorizontal: MoreHorizontal,
    CreditCard: CreditCard,
    Briefcase: Briefcase,
    Thermometer: Thermometer,
    // Add other statically imported icons here
};

interface CategoryIconProps {
  // Use the specific KnownIconName type, allowing undefined/null
  iconName: KnownIconName | string | null | undefined;
  color?: string | null | undefined;
  tooltip?: string;
  size?: number;
  className?: string;
}

export function CategoryIcon({
    iconName = 'CircleHelp',
    color,
    tooltip,
    size = 16,
    className
}: CategoryIconProps) {
    // Find the component in the map, fallback to CircleHelp
    const LucideIcon = iconName ? (iconMap[iconName as string] ?? CircleHelp) : CircleHelp;

    const iconElement = (
        <LucideIcon
            size={size}
            style={color ? { color: color } : {}}
            // Remove className from direct icon, apply to wrapper
            // className={cn(\"inline-block\", className)} \
        />
    );

    const wrapperStyle = { width: size, height: size };
    // Apply className to the wrapper span
    const wrapperClassName = cn("flex h-8 w-8 items-center mx-auto justify-center", className);

     if (tooltip) {
        return (
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className={wrapperClassName} style={wrapperStyle}>
                            {iconElement}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
         <span className={wrapperClassName} style={wrapperStyle}>
            {iconElement}
        </span>
    );
} 