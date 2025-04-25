"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUserRole } from "@/lib/auth";

import {
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
  BarChart3,
  Settings,
  Menu,
  MessageSquare,
  UserCircle,
  BookOpen,
  Home,
} from "lucide-react";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const links: SidebarLink[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["admin", "seller", "teacher"],
  },
  {
    title: "Leads Management",
    href: "/dashboard/seller",
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ["admin", "seller"],
  },
  {
    title: "Student Enrollment",
    href: "/dashboard/admin",
    icon: <UserCircle className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Student Activity",
    href: "/dashboard/teacher",
    icon: <BookOpen className="h-5 w-5" />,
    roles: ["admin", "teacher"],
  },
  {
    title: "Users",
    href: "/dashboard/settings/users",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Courses & Groups",
    href: "/dashboard/settings/courses",
    icon: <GraduationCap className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin"],
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean;
}

export function Sidebar({
  defaultCollapsed = false,
  className,
  ...props
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  const filteredLinks = links.filter(
    (link) => userRole && link.roles.includes(userRole)
  );

  const SidebarLink = ({ link }: { link: SidebarLink }) => {
    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

    return (
      <Link
        href={link.href}
        className={cn(
          "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {link.icon}
        {!collapsed && <span>{link.title}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-16 items-center px-6 bg-card">
          <div className="flex items-center gap-2">
               {!collapsed && (
                  <>
             <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 shadow-xl">
               <div className="bg-white rounded-full p-1">
                 <img 
                    src="/2pi-logo.png" 
                      alt="Logo" 
                     className="h-8 w-8 object-cover rounded-full"
                    />
                 </div>
              </div>
               <span className="font-semibold text-lg"> Dashboard</span>
               </>
              )}
          </div>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
            <div className="flex flex-col gap-2 p-4">
              {filteredLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex md:flex-col bg-card border-r h-screen transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[240px]",
          className
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
           {!collapsed && (
             <>
        <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 shadow-xl">
          <div className="bg-white rounded-full p-1">
            <img 
              src="/2pi-logo.png" 
              alt="Logo" 
              className="h-8 w-8 object-cover rounded-full"
            />
          </div>
        </div>
        <span className="font-semibold text-lg"> Dashboard</span>
          </>
           )}
         </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "h-7 w-7",
              collapsed && "mx-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">
              {collapsed ? "Expand" : "Collapse"} Sidebar
            </span>
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3 py-2">
          <div className="flex flex-col gap-1">
            {filteredLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}