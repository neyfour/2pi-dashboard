"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Activity,
  BookOpen,
  Filter,
  GraduationCap,
  Search,
  Users,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/auth";
import { mockStudents } from "@/lib/data/students";
import { mockCourses } from "@/lib/data/courses";
import { mockGroups } from "@/lib/data/groups";

export default function TeacherDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    setUser(currentUser);
    
    // Simulate API call to fetch students
    setTimeout(() => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      if (mockStudents.length > 0) {
        setSelectedStudent(mockStudents[0]);
      }
      setIsLoading(false);
    }, 1000);
  }, [router]);

  useEffect(() => {
    let result = [...students];

    // Apply search filtering
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term)
      );
    }

    // Apply group filtering
    if (groupFilter !== "all") {
      result = result.filter((student) => 
        student.groups.includes(groupFilter)
      );
    }

    // Apply course filtering
    if (courseFilter !== "all") {
      result = result.filter((student) => 
        student.courses.includes(courseFilter)
      );
    }

    setFilteredStudents(result);
  }, [students, searchTerm, groupFilter, courseFilter]);

  const getGroupName = (groupId: string) => {
    const group = mockGroups.find(g => g.id === groupId);
    return group ? group.name : groupId;
  };

  const getCourseName = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    return course ? course.name : courseId;
  };

  const activityColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Activity</h1>
          <p className="text-muted-foreground">
            Track student progress and performance
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Students</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[180px] pl-8 h-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={groupFilter}
                onValueChange={setGroupFilter}
              >
                <SelectTrigger className="h-8 w-[140px]">
                  <SelectValue placeholder="Filter by group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {mockGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={courseFilter}
                onValueChange={setCourseFilter}
              >
                <SelectTrigger className="h-8 w-[140px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pb-1">
            <div className="rounded-md border overflow-hidden h-[calc(100vh-320px)] overflow-y-auto">
              <Table>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow 
                      key={student.id}
                      className={
                        selectedStudent && selectedStudent.id === student.id
                          ? "bg-muted hover:bg-muted"
                          : ""
                      }
                      onClick={() => setSelectedStudent(student)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {student.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                          </span>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {selectedStudent ? (
          <Card className="md:col-span-2 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {selectedStudent.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                  </span>
                  <div>
                    <CardTitle>{selectedStudent.name}</CardTitle>
                    <CardDescription>
                      <span className="mr-4">Username: {selectedStudent.username}</span>
                      <span>Email: {selectedStudent.email}</span>
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Activity className="h-4 w-4" />
                      <span>Actions</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Student Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      <span>View Complete Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GraduationCap className="mr-2 h-4 w-4" />
                      <span>View All Courses</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Activity className="mr-2 h-4 w-4" />
                      <span>View Detailed Statistics</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Groups:</span>
                  {selectedStudent.groups.map((groupId: string) => (
                    <Badge key={groupId} variant="outline">
                      {getGroupName(groupId)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="courses">
                <TabsList className="mb-4">
                  <TabsTrigger value="courses">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Courses Progress
                  </TabsTrigger>
                  <TabsTrigger value="activity">
                    <Activity className="mr-2 h-4 w-4" />
                    Activity Analytics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="courses">
                  <div className="space-y-4">
                    {selectedStudent.courses.map((courseId: string, index: number) => {
                      const course = mockCourses.find(c => c.id === courseId);
                      if (!course) return null;
                      
                      const courseProgress = selectedStudent.progress.find(
                        (p: any) => p.courseId === courseId
                      );
                      
                      return (
                        <div key={courseId} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{course.name}</h3>
                            <Badge variant="outline">
                              {courseProgress?.progress || 0}% Complete
                            </Badge>
                          </div>
                          <Progress value={courseProgress?.progress || 0} className="h-2" />
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="space-y-1">
                              <div className="text-sm flex justify-between">
                                <span className="text-muted-foreground">Quizzes Completed:</span>
                                <span>{courseProgress?.quizzesCompleted || 0}/{courseProgress?.totalQuizzes || 0}</span>
                              </div>
                              <div className="text-sm flex justify-between">
                                <span className="text-muted-foreground">Average Quiz Score:</span>
                                <span>{courseProgress?.averageScore || 0}%</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm flex justify-between">
                                <span className="text-muted-foreground">Lessons Completed:</span>
                                <span>{courseProgress?.lessonsCompleted || 0}/{courseProgress?.totalLessons || 0}</span>
                              </div>
                              <div className="text-sm flex justify-between">
                                <span className="text-muted-foreground">Last Activity:</span>
                                <span>{format(new Date(courseProgress?.lastActivity || new Date()), "MMM d, yyyy")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="activity">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Quiz Scores</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={selectedStudent.courses.map((courseId: string, index: number) => {
                                  const course = mockCourses.find(c => c.id === courseId);
                                  const progress = selectedStudent.progress.find(
                                    (p: any) => p.courseId === courseId
                                  );
                                  return {
                                    name: course?.name.split(" ")[0] || courseId,
                                    score: progress?.averageScore || 0,
                                  };
                                })}
                                margin={{ top: 5, right: 5, left: 0, bottom: 20 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                                <Tooltip
                                  formatter={(value) => [`${value}%`, "Score"]}
                                  contentStyle={{ fontSize: 12 }}
                                />
                                <Bar dataKey="score" fill="hsl(var(--chart-1))" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Activity Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: "Quizzes", value: selectedStudent.activityDistribution?.quizzes || 30 },
                                    { name: "Videos", value: selectedStudent.activityDistribution?.videos || 25 },
                                    { name: "Assignments", value: selectedStudent.activityDistribution?.assignments || 20 },
                                    { name: "Reading", value: selectedStudent.activityDistribution?.reading || 15 },
                                    { name: "Games", value: selectedStudent.activityDistribution?.games || 10 },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  innerRadius={40}
                                  fill="#8884d8"
                                  paddingAngle={2}
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  labelLine={false}
                                >
                                  {[0, 1, 2, 3, 4].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={activityColors[index % activityColors.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Weekly Activity Log</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {(selectedStudent.activityLog || []).map((log: any, index: number) => (
                            <div key={index} className="flex items-center gap-3 py-1.5">
                              <div className="rounded-full bg-primary/10 p-1.5">
                                {log.type === "quiz" && <BookOpen className="h-4 w-4 text-primary" />}
                                {log.type === "video" && <Activity className="h-4 w-4 text-primary" />}
                                {log.type === "assignment" && <GraduationCap className="h-4 w-4 text-primary" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{log.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {getCourseName(log.courseId)} • {format(new Date(log.timestamp), "MMM d, yyyy 'at' HH:mm")}
                                </p>
                              </div>
                              {log.type === "quiz" && log.score !== undefined && (
                                <Badge variant={log.score >= 70 ? "default" : "destructive"}>
                                  {log.score}%
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-2 shadow-sm">
            <div className="flex items-center justify-center h-[calc(100vh-250px)]">
              <div className="text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select a Student</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a student from the list to view their progress and activity
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}