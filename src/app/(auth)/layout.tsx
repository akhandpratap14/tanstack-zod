export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-white">
      {children}
    </main>
  );
}
