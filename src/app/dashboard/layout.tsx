import DashboardHeader from "@/components/dashboardheader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <DashboardHeader />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
