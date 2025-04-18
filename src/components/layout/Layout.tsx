
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  userRole: string;
}

export const Layout = ({ children, userRole }: LayoutProps) => {
  // Mock user data
  const userName = userRole === 'student' ? 'Jamie Smith' : 
                   userRole === 'advisor' ? 'Dr. Alex Johnson' : 'Admin User';
  const userInitials = userRole === 'student' ? 'JS' : 
                       userRole === 'advisor' ? 'AJ' : 'AU';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userName={userName} 
          userRole={userRole} 
          userInitials={userInitials} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
