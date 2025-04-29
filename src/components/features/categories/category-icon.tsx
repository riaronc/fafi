import {
  LucideIcon,
  Home,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Briefcase,
  Coffee,
  Utensils,
  Car,
  Plane,
  Film,
  Book,
  Gift,
  Heart,
  Phone,
  Music,
  Monitor,
  Zap,
  Droplet,
  Thermometer,
  ShoppingBag,
  CircleHelp // Default icon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  home: Home,
  "shopping-cart": ShoppingCart,
  "credit-card": CreditCard,
  "dollar-sign": DollarSign,
  briefcase: Briefcase,
  coffee: Coffee,
  utensils: Utensils,
  car: Car,
  plane: Plane,
  film: Film,
  book: Book,
  gift: Gift,
  heart: Heart,
  phone: Phone,
  music: Music,
  monitor: Monitor,
  zap: Zap,
  droplet: Droplet,
  thermometer: Thermometer,
  "shopping-bag": ShoppingBag,
};

interface CategoryIconProps extends React.HTMLAttributes<SVGSVGElement> {
  name: string;
}

export function CategoryIcon({ name, className, ...props }: CategoryIconProps) {
  const IconComponent = iconMap[name] || CircleHelp; // Fallback to a default icon
  return <IconComponent className={cn("h-4 w-4", className)} {...props} />;
} 