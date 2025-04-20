
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  userRole: string;
}

export const Layout = ({ children, userRole }: LayoutProps) => {
  // Mock user data with Indian names
  const userName = userRole === 'student' ? 'Arjun Patel' : 
                   userRole === 'advisor' ? 'Dr. Priya Sharma' : 'Admin User';
  const userInitials = userRole === 'student' ? 'AP' : 
                       userRole === 'advisor' ? 'PS' : 'AU';
  
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userName={userName} 
          userRole={userRole} 
          userInitials={userInitials} 
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};
