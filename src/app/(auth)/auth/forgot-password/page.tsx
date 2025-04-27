import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full">Send reset link</Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Return to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 