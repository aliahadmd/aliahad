import DashboardHeader from "@/components/dashboardheader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-white dark:bg-gray-900 min-h-screen">
      <DashboardHeader />
      <main className="flex-1 ml-64 p-8 text-gray-900 dark:text-gray-100">{children}</main>
    </div>
  );
}
