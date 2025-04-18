
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, 
  Calendar, 
  UserCircle, 
  BookOpen, 
  MessageSquare, 
  BarChart4, 
  Settings, 
  Menu, 
  Users, 
  LogOut,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  roleAccess: string[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart4,
    roleAccess: ["student", "advisor", "admin"],
  },
  {
    title: "Course Planning",
    href: "/course-planning",
    icon: BookOpen,
    roleAccess: ["student", "advisor"],
  },
  {
    title: "Academic Progress",
    href: "/academic-progress",
    icon: GraduationCap,
    roleAccess: ["student", "advisor"],
  },
  {
    title: "Advising Sessions",
    href: "/advising-sessions",
    icon: Calendar,
    roleAccess: ["student", "advisor"],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roleAccess: ["student", "advisor", "admin"],
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
    roleAccess: ["student", "advisor", "admin"],
  },
  {
    title: "User Management",
    href: "/user-management",
    icon: Users,
    roleAccess: ["admin"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roleAccess: ["student", "advisor", "admin"],
  },
];

interface SidebarProps {
  userRole: string;
}

export const Sidebar = ({ userRole }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);
  const location = useLocation();
  
  // Update collapsed state when screen size changes
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    item.roleAccess.includes(userRole)
  );

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-advising-primary mr-2" />
            <h1 className="text-xl font-bold">AdvisorPath</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? "mx-auto" : "ml-auto"}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-advising-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-advising-primary"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full flex items-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-advising-primary",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};
