'use client';

import Link from 'next/link';
// import { useForgotPasswordForm } from '@/hooks/use-auth-form';
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

export interface ForgotPasswordFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function ForgotPasswordForm({ className, onSuccess }: ForgotPasswordFormProps) {
  const { form, isLoading, error, success, onSubmit } = useForgotPasswordForm({ onSuccess });

  return (
    <Card className={`w-full ${className || ''}`}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-800 text-sm p-2 rounded-md">
                Password reset email sent. Please check your inbox.
              </div>
            )}
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || success}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Link
                href="/auth/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Return to login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
} 