import DashboardHeader from "@/components/dashboardheader";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <DashboardHeader />
  {children}</>;
}
