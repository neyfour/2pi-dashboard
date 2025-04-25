"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  ArrowDownIcon,
  ArrowUpIcon,
  WholeWord,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { mockLeads } from "@/lib/data/leads";
import { useToast } from "@/hooks/use-toast";
import { LeadForm } from "@/components/dashboard/leads/lead-form";
import { LeadRow } from "@/components/dashboard/leads/lead-row";

export type Lead = {
  id: string;
  parentName: string;
  phoneNumber: string;
  studentName: string;
  level: string;
  status: "hot" | "warm" | "cold";
  contactedBy: string;
  confirmed: boolean;
  createdAt: string;
  lastContactDate: string;
  notes?: string;
};

export default function SellerDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sorting, setSorting] = useState({
    field: "createdAt",
    direction: "desc" as "asc" | "desc",
  });
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    setUser(currentUser);
    
    // Simulate API call to fetch leads
    setTimeout(() => {
      setLeads(mockLeads);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  useEffect(() => {
    let result = [...leads];

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

    // Apply status filtering
    if (statusFilter !== "all") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Apply level filtering
    if (levelFilter !== "all") {
      result = result.filter((lead) => lead.level === levelFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      // @ts-ignore - we know these fields exist
      const aValue = a[sorting.field];
      // @ts-ignore
      const bValue = b[sorting.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sorting.direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        if (sorting.direction === "asc") {
          return aValue === bValue ? 0 : aValue ? 1 : -1;
        } else {
          return aValue === bValue ? 0 : aValue ? -1 : 1;
        }
      }
      
      return 0;
    });

    setFilteredLeads(result);
  }, [leads, searchTerm, statusFilter, levelFilter, sorting]);

  const handleSort = (field: string) => {
    setSorting((prevSorting) => ({
      field,
      direction:
        prevSorting.field === field && prevSorting.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleStatusChange = (leadId: string, newStatus: "hot" | "warm" | "cold") => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    
    toast({
      title: "Lead status updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  const handleLevelChange = (leadId: string, newLevel: string) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, level: newLevel } : lead
      )
    );
    
    toast({
      title: "Lead level updated",
      description: `Lead level changed to ${newLevel}`,
    });
  };

  const handleConfirmChange = (leadId: string, confirmed: boolean) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, confirmed } : lead
      )
    );
    
    toast({
      title: confirmed ? "Lead confirmed" : "Lead unconfirmed",
      description: confirmed
        ? "Lead has been marked as confirmed"
        : "Lead has been marked as unconfirmed",
    });
  };

  const handleAddLead = (newLead: Omit<Lead, "id" | "createdAt">) => {
    const lead: Lead = {
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...newLead
    };
    
    setLeads((prevLeads) => [lead, ...prevLeads]);
    setAddLeadOpen(false);
    
    toast({
      title: "Lead added",
      description: "New lead has been added successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "hot":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">Hot</Badge>
        );
      case "warm":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            Warm
          </Badge>
        );
      case "cold":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            Cold
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSortIcon = (field: string) => {
    if (sorting.field !== field) {
      return <ChevronDown className="h-4 w-4 text-muted-foreground" />;
    }
    
    return sorting.direction === "asc" ? (
      <ArrowUpIcon className="h-4 w-4" />
    ) : (
      <ArrowDownIcon className="h-4 w-4" />
    );
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads Management</h1>
          <p className="text-muted-foreground">
            Manage and track potential student leads
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={addLeadOpen} onOpenChange={setAddLeadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Enter the details for the new lead
              </DialogDescription>
              <LeadForm 
                onSubmit={handleAddLead}
                currentUser={user}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Leads</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  setIsLoading(true);
                  // Simulate API call to refresh data
                  setTimeout(() => {
                    setLeads(mockLeads);
                    setIsLoading(false);
                    toast({
                      title: "Leads refreshed",
                      description: "The leads list has been updated",
                    });
                  }, 1000);
                }}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <DropdownMenuRadioItem value="all">
                      All Statuses
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="hot">Hot</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="warm">
                      Warm
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cold">
                      Cold
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Level</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={levelFilter}
                    onValueChange={setLevelFilter}
                  >
                    <DropdownMenuRadioItem value="all">
                      All Levels
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="CM1">CM1</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="CM2">CM2</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="6ème">
                      6ème
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="5ème">
                      5ème
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="4ème">
                      4ème
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[180px] cursor-pointer"
                    onClick={() => handleSort("parentName")}
                  >
                    <div className="flex items-center gap-1">
                      Parent Name
                      {getSortIcon("parentName")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[150px] cursor-pointer"
                    onClick={() => handleSort("phoneNumber")}
                  >
                    <div className="flex items-center gap-1">
                      Phone Number
                      {getSortIcon("phoneNumber")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[180px] cursor-pointer"
                    onClick={() => handleSort("studentName")}
                  >
                    <div className="flex items-center gap-1">
                      Student Name
                      {getSortIcon("studentName")}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">Level</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead
                    className="w-[150px] cursor-pointer"
                    onClick={() => handleSort("contactedBy")}
                  >
                    <div className="flex items-center gap-1">
                      Contacted By
                      {getSortIcon("contactedBy")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[100px] cursor-pointer"
                    onClick={() => handleSort("confirmed")}
                  >
                    <div className="flex items-center gap-1">
                      Confirmed
                      {getSortIcon("confirmed")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[150px] text-right cursor-pointer"
                    onClick={() => handleSort("lastContactDate")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Last Contact
                      {getSortIcon("lastContactDate")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      onStatusChange={handleStatusChange}
                      onLevelChange={handleLevelChange}
                      onConfirmChange={handleConfirmChange}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WholeWord className="h-5 w-5 text-primary" />
            WhatsApp Lead Qualifier
          </CardTitle>
          <CardDescription>
            Our AI-powered WhatsApp chatbot automatically qualifies leads and updates their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="autoResponder">Auto-responder</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Enable automatic responses to WhatsApp messages
                </span>
                <Switch id="autoResponder" defaultChecked />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="leadQualifier">AI Lead Qualification</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Let AI analyze conversations and update lead status
                </span>
                <Switch id="leadQualifier" defaultChecked />
              </div>
            </div>

            <div className="rounded-md bg-muted p-4">
              <h4 className="mb-2 font-medium">Recent WhatsApp Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>+212 655 789 012 (Fatima Ouazzani)</span>
                  <span className="text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span>+212 677 123 456 (Hassan Alami)</span>
                  <span className="text-muted-foreground">25 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span>+212 633 456 789 (Sara Chraibi)</span>
                  <span className="text-muted-foreground">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}