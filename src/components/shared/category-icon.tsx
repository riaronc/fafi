"use client";

import React, { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { LucideProps, CircleHelp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner'; // Assuming a spinner exists

interface CategoryIconProps {
  iconName: string | null | undefined;
  color?: string | null | undefined;
  tooltip?: string;
  size?: number;
  className?: string;
}

// Helper to format icon name (e.g., 'shopping-cart' -> 'ShoppingCart')
const formatIconName = (name: string): string => {
    return name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
};

export function CategoryIcon({
    iconName = 'CircleHelp',
    color,
    tooltip,
    size = 16,
    className
}: CategoryIconProps) {
    const formattedName = formatIconName(iconName ?? 'CircleHelp');

    // Dynamically import the Lucide icon component
    const LucideIcon = dynamic<LucideProps>(
        () => import('lucide-react').then((mod) => {
            // Check if the formatted name exists in the module
            const IconComponent = mod[formattedName as keyof typeof mod];
            if (IconComponent) {
                // Assert the type here
                return IconComponent as React.ComponentType<LucideProps>; 
            }
            // Fallback if the icon name is invalid or not found
            console.warn(`Lucide icon "${formattedName}" not found, falling back to CircleHelp.`);
             // Assert the type here
            return mod.CircleHelp as React.ComponentType<LucideProps>;
        }).catch(err => {
            console.error(`Error loading Lucide icon "${formattedName}":`, err);
             // Assert the type here
            return CircleHelp as React.ComponentType<LucideProps>; // Fallback on error
        }),
        {
            // Optional: Add a loading component
            loading: () => <LoadingSpinner size="sm" />, // Use 'sm' instead of 'xs'
            ssr: false // Avoid SSR issues with dynamic imports if needed
        }
    );


    const iconElement = (
        <Suspense fallback={<LoadingSpinner size="sm" />}>
            <LucideIcon
                size={size}
                style={color ? { color: color } : {}}
                className={cn("inline-block", className)}
            />
        </Suspense>
    );

     if (tooltip) {
        return (
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* Add fixed width/height to prevent layout shift during load */}
                        <span className={cn("flex items-center justify-center", className)} style={{ width: size, height: size }}>
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
         <span className={cn("flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {iconElement}
        </span>
    );
} 