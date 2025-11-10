import { AdminLayoutClient } from "./client_admin_layout";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}