'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
// Import central schema and type
import { registerSchema, RegisterFormValues } from "@/lib/zod/auth.schema";
// Import the server action
import { registerUser } from '@/server/actions/auth.actions'; 
import { LoadingSpinner } from '@/components/ui/loading-spinner'; // Import spinner

// Registration form schema - REMOVED
// const registerSchema = z.object({ ... });

// Type - REMOVED
// type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  className?: string;
}

export function RegisterForm({ className }: RegisterFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the server action
      const registrationResult = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (!registrationResult.success) {
         // Handle Zod issues if present
        if (registrationResult.issues) {
           // TODO: Map Zod issues to form errors using form.setError()
           setError(registrationResult.error + " Check fields for details.");
        } else {
           setError(registrationResult.error); // Display general error
        }
        setIsLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError(`Registration successful, but auto-login failed: ${result.error}. Please log in manually.`);
        setIsLoading(false);
        // Redirect to login page with success message, even if auto-login fails
        router.push('/auth/login?registered=true'); 
        return;
      }

      // If sign-in is successful, redirect to dashboard
      router.push('/dashboard'); 
      router.refresh();

    } catch (err) {
      // Catch unexpected errors during action call or sign-in
      console.error("Registration/Login Error:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 mb-4">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mb-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">
                {error}
              </div>
            )}
            {/* Form Fields using ShadCN components */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      type="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-describedby="terms-message" // Link checkbox to message
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                      I agree to the{' '}
                      <Link
                        href="#" // TODO: Link to actual terms page
                        className="text-primary underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </Link>
                      {' '}&{' '}
                      <Link
                        href="#" // TODO: Link to actual policy page
                        className="text-primary underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage id="terms-message" /> 
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {/* Use spinner when loading */}
              {isLoading ? <LoadingSpinner size="sm" className="mr-2"/> : null} 
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
} 