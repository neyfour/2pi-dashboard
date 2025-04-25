"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CircleCheck,
  Filter,
  Loader2,
  Plus,
  Search,
  ArrowDownIcon,
  ArrowUpIcon,
  UserPlus,
  Mails,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { getCurrentUser } from "@/lib/auth";
import { mockLeads } from "@/lib/data/leads";
import { mockCourses } from "@/lib/data/courses";
import { mockGroups } from "@/lib/data/groups";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@/app/dashboard/seller/page";

export default function AdminDashboard() {
  const [confirmedLeads, setConfirmedLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [enrollmentForm, setEnrollmentForm] = useState({
    username: "",
    email: "",
    password: "",
    courses: [] as string[],
    group: "",
  });
  const [generatedCredentials, setGeneratedCredentials] = useState({
    username: "",
    email: "",
    password: "",
    courses: [] as string[],
  });
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    } else if (currentUser.role !== "admin") {
      router.push("/dashboard");
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "You don't have permission to access this page",
      });
      return;
    }
    
    setUser(currentUser);
    
    // Simulate API call to fetch confirmed leads
    setTimeout(() => {
      const confirmed = mockLeads.filter((lead) => lead.confirmed);
      setConfirmedLeads(confirmed);
      setFilteredLeads(confirmed);
      setIsLoading(false);
    }, 1000);
  }, [router, toast]);

  useEffect(() => {
    let result = [...confirmedLeads];

    // Apply search filtering
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.parentName.toLowerCase().includes(term) ||
          lead.studentName.toLowerCase().includes(term) ||
          lead.phoneNumber.includes(term)
      );
    }

    // Apply level filtering
    if (levelFilter !== "all") {
      result = result.filter((lead) => lead.level === levelFilter);
    }

    setFilteredLeads(result);
  }, [confirmedLeads, searchTerm, levelFilter]);

  const handleOpenEnrollDialog = (lead: Lead) => {
    setSelectedLead(lead);
    
    // Generate username and email
    const nameParts = lead.studentName.split(" ");
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts.length > 1 ? nameParts[1].toLowerCase() : "";
    const username = `${firstName}_${lastName}`;
    const email = `${username}@2pi.ma`;
    
    // Generate random 4-digit password
    const password = Math.floor(1000 + Math.random() * 9000).toString();
    
    setEnrollmentForm({
      username,
      email,
      password,
      courses: [],
      group: "",
    });
    
    setEnrollDialogOpen(true);
  };

  const handleEnroll = () => {
    if (!selectedLead) return;
    
    // In a real app, this would send the enrollment info to Moodle via xAPI
    // For now, we'll just show a success message and store the credentials
    
    toast({
      title: "Student enrolled successfully",
      description: `${selectedLead.studentName} has been enrolled`,
    });
    
    setGeneratedCredentials({
      username: enrollmentForm.username,
      email: enrollmentForm.email,
      password: enrollmentForm.password,
      courses: enrollmentForm.courses,
    });
    
    setEnrollDialogOpen(false);
    
    // Remove the lead from the list (this would update the backend in a real app)
    setConfirmedLeads((prev) => 
      prev.filter((lead) => lead.id !== selectedLead.id)
    );
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Enrollment</h1>
          <p className="text-muted-foreground">
            Manage enrollment for confirmed student leads
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Confirmed Leads</CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={levelFilter}
                onValueChange={setLevelFilter}
              >
                <SelectTrigger className="w-[150px] h-8">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="CM1">CM1</SelectItem>
                  <SelectItem value="CM2">CM2</SelectItem>
                  <SelectItem value="6ème">6ème</SelectItem>
                  <SelectItem value="5ème">5ème</SelectItem>
                  <SelectItem value="4ème">4ème</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="w-[200px] pl-8 h-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <CardDescription>
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} ready for enrollment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Parent Name</TableHead>
                  <TableHead className="w-[150px]">Phone Number</TableHead>
                  <TableHead className="w-[180px]">Student Name</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[150px]">Contacted By</TableHead>
                  <TableHead className="w-[150px] text-right">Last Contact</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No confirmed leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.parentName}</TableCell>
                      <TableCell>{lead.phoneNumber}</TableCell>
                      <TableCell>{lead.studentName}</TableCell>
                      <TableCell>{lead.level}</TableCell>
                      <TableCell>{lead.contactedBy}</TableCell>
                      <TableCell className="text-right">
                        {format(new Date(lead.lastContactDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleOpenEnrollDialog(lead)}
                          variant="outline"
                          size="sm"
                          className="gap-1 h-8"
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          <span>Enroll</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {generatedCredentials.username && (
        <Card className="shadow-sm border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CircleCheck className="h-5 w-5 text-primary" />
              <CardTitle>Recent Enrollment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Username</h3>
                  <p className="font-mono bg-muted p-2 rounded text-sm">{generatedCredentials.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                  <p className="font-mono bg-muted p-2 rounded text-sm">{generatedCredentials.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Password</h3>
                  <p className="font-mono bg-muted p-2 rounded text-sm">{generatedCredentials.password}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Enrolled Courses</h3>
                  <div className="flex flex-wrap gap-1">
                    {generatedCredentials.courses.map((courseId) => {
                      const course = mockCourses.find((c) => c.id === courseId);
                      return course ? (
                        <Badge key={courseId} variant="outline" className="bg-muted/50">
                          {course.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => {
                    // In a real app, this would send an email with the credentials
                    toast({
                      title: "Email sent",
                      description: "Login credentials have been sent to the parent",
                    });
                  }}
                >
                  <Mails className="h-4 w-4" />
                  <span>Send Login Details</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGeneratedCredentials({ username: "", email: "", password: "", courses: [] })}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Enroll Student</DialogTitle>
            <DialogDescription>
              {selectedLead ? `Enrolling ${selectedLead.studentName} (Level: ${selectedLead.level})` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={enrollmentForm.username}
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={enrollmentForm.email}
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={enrollmentForm.password}
                  onChange={(e) => setEnrollmentForm({ ...enrollmentForm, password: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Auto-generated 4-digit password</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="group">Assign to Group</Label>
                <Select
                  value={enrollmentForm.group}
                  onValueChange={(value) => setEnrollmentForm({ ...enrollmentForm, group: value })}
                >
                  <SelectTrigger id="group">
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assign Courses (Select up to 4)</Label>
              <div className="grid grid-cols-2 gap-2">
                {mockCourses.map((course) => (
                  <Button
                    key={course.id}
                    type="button"
                    variant={enrollmentForm.courses.includes(course.id) ? "default" : "outline"}
                    className="justify-start h-auto py-2 gap-2"
                    onClick={() => {
                      if (enrollmentForm.courses.includes(course.id)) {
                        setEnrollmentForm({
                          ...enrollmentForm,
                          courses: enrollmentForm.courses.filter((id) => id !== course.id),
                        });
                      } else if (enrollmentForm.courses.length < 4) {
                        setEnrollmentForm({
                          ...enrollmentForm,
                          courses: [...enrollmentForm.courses, course.id],
                        });
                      } else {
                        toast({
                          variant: "destructive",
                          title: "Maximum courses reached",
                          description: "You can only select up to 4 courses",
                        });
                      }
                    }}
                  >
                    {enrollmentForm.courses.includes(course.id) && (
                      <CircleCheck className="h-4 w-4" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Level: {course.level} • {course.enrollments}/{course.maxEnrollments} enrolled
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              {enrollmentForm.courses.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">Select at least one course</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={handleEnroll}
              disabled={enrollmentForm.courses.length === 0 || !enrollmentForm.group}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Enroll Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}