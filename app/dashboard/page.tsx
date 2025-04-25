"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, TrendingUp, CircleDollarSign, 
  GraduationCap, BookOpen, CheckCircle2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/auth";
import { DashboardChart } from "@/components/dashboard/chart";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    setUser(currentUser);
  }, [router]);

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Leads" 
          value="245" 
          description="+12% from last month"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />
        <DashboardCard 
          title="Converted Leads" 
          value="58" 
          description="23.7% conversion rate"
          icon={<CheckCircle2 className="h-5 w-5 text-muted-foreground" />}
        />
        <DashboardCard 
          title="Active Students" 
          value="182" 
          description="+8 new this week"
          icon={<GraduationCap className="h-5 w-5 text-muted-foreground" />}
        />
        <DashboardCard 
          title="Total Courses" 
          value="12" 
          description="4 starting this month"
          icon={<BookOpen className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="leads">
              <TabsList className="mb-4">
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
              </TabsList>
              <TabsContent value="leads" className="h-[300px]">
                <DashboardChart 
                  data={[
                    { name: "Jan", value: 40 },
                    { name: "Feb", value: 30 },
                    { name: "Mar", value: 45 },
                    { name: "Apr", value: 55 },
                    { name: "May", value: 60 },
                    { name: "Jun", value: 65 },
                    { name: "Jul", value: 70 },
                  ]} 
                  dataKey="value"
                  type="leads"
                />
              </TabsContent>
              <TabsContent value="enrollments" className="h-[300px]">
                <DashboardChart 
                  data={[
                    { name: "Jan", value: 15 },
                    { name: "Feb", value: 10 },
                    { name: "Mar", value: 20 },
                    { name: "Apr", value: 25 },
                    { name: "May", value: 18 },
                    { name: "Jun", value: 22 },
                    { name: "Jul", value: 30 },
                  ]} 
                  dataKey="value"
                  type="enrollments"
                />
              </TabsContent>
              <TabsContent value="revenue" className="h-[300px]">
                <DashboardChart 
                  data={[
                    { name: "Jan", value: 2500 },
                    { name: "Feb", value: 1800 },
                    { name: "Mar", value: 3200 },
                    { name: "Apr", value: 4500 },
                    { name: "May", value: 3800 },
                    { name: "Jun", value: 4200 },
                    { name: "Jul", value: 5500 },
                  ]} 
                  dataKey="value"
                  type="revenue"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem 
                title="New lead added"
                description="Ahmed Benjelloun was added by Sofia"
                time="2 hours ago"
                icon={<Users className="h-4 w-4" />}
              />
              <ActivityItem 
                title="Student enrolled"
                description="Leila Amrani enrolled in 3 courses"
                time="Yesterday at 14:45"
                icon={<GraduationCap className="h-4 w-4" />}
              />
              <ActivityItem 
                title="New course created"
                description="Advanced Mathematics for 12th grade"
                time="2 days ago"
                icon={<BookOpen className="h-4 w-4" />}
              />
              <ActivityItem 
                title="Payment received"
                description="3500 MAD from Omar Bensouda"
                time="3 days ago"
                icon={<CircleDollarSign className="h-4 w-4" />}
              />
              <ActivityItem 
                title="Lead status updated"
                description="Yassine El Fassi moved to 'Enrolled'"
                time="4 days ago"
                icon={<CheckCircle2 className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  value, 
  description,
  icon
}: { 
  title: string; 
  value: string; 
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-2xl font-bold">{value}</span>
          </div>
          <div className="rounded-full bg-muted p-2.5">
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ 
  title, 
  description, 
  time,
  icon
}: { 
  title: string; 
  description: string; 
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-primary/10 p-2">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}