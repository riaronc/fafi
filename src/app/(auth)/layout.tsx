import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted">
        <div className="flex items-center justify-center h-full">
          <div className="mx-auto w-full max-w-md">
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">FAFI</h1>
                <p className="text-muted-foreground">
                  Your personal financial management app
                </p>
              </div>
              <div className="relative h-60">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
} 