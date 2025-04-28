"use client";

import { useState, useCallback } from "react";
import { 
  Plus, 
  Search, 
  ArrowUpDown,
  Pencil,
  Trash2,
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
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Types for the category
type Category = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE" | "BOTH";
  bgColor: string;
  fgColor: string;
  icon: string;
  userId: string;
};

// Form validation schema
const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  type: z.enum(["INCOME", "EXPENSE", "BOTH"]),
  bgColor: z.string().regex(/^#([0-9A-F]{6})$/i, { message: "Must be a valid hex color" }),
  fgColor: z.string().regex(/^#([0-9A-F]{6})$/i, { message: "Must be a valid hex color" }),
  icon: z.string().min(1, { message: "Icon is required" }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);
  const { toast } = useToast();

  // Icons array for selection
  const icons = [
    "home", "shopping-cart", "credit-card", "dollar-sign", "briefcase", 
    "coffee", "utensils", "car", "plane", "film", "book", "gift", "heart", 
    "phone", "music", "monitor", "zap", "droplet", "thermometer", "shopping-bag"
  ];

  // Form definition
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "EXPENSE",
      bgColor: "#EEEEEE",
      fgColor: "#333333",
      icon: "credit-card",
    },
  });

  // Form definition for edit
  const editForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "EXPENSE",
      bgColor: "#EEEEEE",
      fgColor: "#333333",
      icon: "credit-card",
    },
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to load default categories
  const loadDefaultCategories = async () => {
    try {
      setIsLoadingDefaults(true);
      const response = await fetch('/api/categories/defaults', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to load default categories');
      }
      
      // Refresh the categories list
      fetchCategories();
      
      toast({
        title: "Success",
        description: "Default categories added successfully",
      });
    } catch (error) {
      console.error('Failed to load default categories:', error);
      toast({
        title: "Error",
        description: "Failed to load default categories",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDefaults(false);
    }
  };

  // Handle form submission for adding a category
  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      
      toast({
        title: "Success",
        description: "Category added successfully",
      });
      
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Failed to add category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  // Handle edit form submission
  const onEditSubmit = async (values: CategoryFormValues) => {
    try {
      const response = await fetch(`/api/categories/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const updatedCategory = await response.json();
      setCategories(categories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      ));
      
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
      
      editForm.reset();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update category:', error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    
    try {
      await fetch(`/api/categories/${categoryToDelete}`, {
        method: 'DELETE',
      });
      
      setCategories(categories.filter(cat => cat.id !== categoryToDelete));
      
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Handle delete click
  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Edit category
  const handleEditClick = (category: Category, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCategory(category);
    editForm.reset({
      id: category.id,
      name: category.name,
      type: category.type,
      bgColor: category.bgColor,
      fgColor: category.fgColor,
      icon: category.icon,
    });
    setIsEditDialogOpen(true);
  };

  // Get icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'home': return <Home size={16} />;
      case 'shopping-cart': return <ShoppingCart size={16} />;
      case 'credit-card': return <CreditCard size={16} />;
      case 'dollar-sign': return <DollarSign size={16} />;
      case 'briefcase': return <Briefcase size={16} />;
      case 'coffee': return <Coffee size={16} />;
      case 'utensils': return <Utensils size={16} />;
      case 'car': return <Car size={16} />;
      case 'plane': return <Plane size={16} />;
      case 'film': return <Film size={16} />;
      case 'book': return <Book size={16} />;
      case 'gift': return <Gift size={16} />;
      case 'heart': return <Heart size={16} />;
      case 'phone': return <Phone size={16} />;
      case 'music': return <Music size={16} />;
      case 'monitor': return <Monitor size={16} />;
      case 'zap': return <Zap size={16} />;
      case 'droplet': return <Droplet size={16} />;
      case 'thermometer': return <Thermometer size={16} />;
      case 'shopping-bag': return <ShoppingBag size={16} />;
      default: return iconName.charAt(0).toUpperCase();
    }
  };

  // Filter categories by type
  const incomeCategories = categories.filter(cat => cat.type === "INCOME");
  const expenseCategories = categories.filter(cat => cat.type === "EXPENSE" || cat.type === "BOTH");

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={loadDefaultCategories}
            disabled={isLoadingDefaults}
          >
            {isLoadingDefaults ? "Loading defaults..." : "Load Defaults"}
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category for your transactions.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Category name" {...field} />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="INCOME">Income</SelectItem>
                            <SelectItem value="EXPENSE">Expense</SelectItem>
                            <SelectItem value="BOTH">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bgColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input type="color" {...field} className="w-12 p-1 h-10" />
                              <Input {...field} className="ml-2 flex-1" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fgColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon Color</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input type="color" {...field} className="w-12 p-1 h-10" />
                              <Input {...field} className="ml-2 flex-1" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {icons.map((icon) => (
                              <SelectItem key={icon} value={icon} className="flex items-center">
                                <div className="mr-2">
                                  {getIconComponent(icon)}
                                </div>
                                {icon.charAt(0).toUpperCase() + icon.slice(1).replace('-', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Save Category</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Income Categories */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Income Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : incomeCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No income categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  incomeCategories.map((category) => (
                    <TableRow
                      key={category.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setCurrentCategory(category);
                        editForm.reset({
                          id: category.id,
                          name: category.name,
                          type: category.type,
                          bgColor: category.bgColor,
                          fgColor: category.fgColor,
                          icon: category.icon,
                        });
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <TableCell>
                        <div className="font-medium">{category.name}</div>
                      </TableCell>
                      <TableCell>
                        <div 
                          className="p-2 rounded-full w-8 h-8 flex items-center justify-center"
                          style={{ backgroundColor: category.bgColor }}
                        >
                          <div style={{ color: category.fgColor }}>
                            {getIconComponent(category.icon)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleEditClick(category, e)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Edit</span>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={(e) => handleDeleteClick(category.id, e)}
                          >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : expenseCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No expense categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  expenseCategories.map((category) => (
                    <TableRow
                      key={category.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setCurrentCategory(category);
                        editForm.reset({
                          id: category.id,
                          name: category.name,
                          type: category.type,
                          bgColor: category.bgColor,
                          fgColor: category.fgColor,
                          icon: category.icon,
                        });
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <TableCell>
                        <div className="font-medium">{category.name}</div>
                      </TableCell>
                      <TableCell>
                        <div 
                          className="p-2 rounded-full w-8 h-8 flex items-center justify-center"
                          style={{ backgroundColor: category.bgColor }}
                        >
                          <div style={{ color: category.fgColor }}>
                            {getIconComponent(category.icon)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleEditClick(category, e)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Edit</span>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={(e) => handleDeleteClick(category.id, e)}
                          >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                        <SelectItem value="BOTH">Both</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="bgColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input type="color" {...field} className="w-12 p-1 h-10" />
                          <Input {...field} className="ml-2 flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="fgColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon Color</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input type="color" {...field} className="w-12 p-1 h-10" />
                          <Input {...field} className="ml-2 flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={editForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {icons.map((icon) => (
                          <SelectItem key={icon} value={icon} className="flex items-center">
                            <div className="mr-2">
                              {getIconComponent(icon)}
                            </div>
                            {icon.charAt(0).toUpperCase() + icon.slice(1).replace('-', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Update Category</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 