"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import type { Lead } from "@/app/dashboard/seller/page";
import { cn } from "@/lib/utils";

interface LeadRowProps {
  lead: Lead;
  onStatusChange: (id: string, status: "hot" | "warm" | "cold") => void;
  onLevelChange: (id: string, level: string) => void;
  onConfirmChange: (id: string, confirmed: boolean) => void;
}

const levelOptions = [
  { value: "CM1", label: "CM1" },
  { value: "CM2", label: "CM2" },
  { value: "6ème", label: "6ème" },
  { value: "5ème", label: "5ème" },
  { value: "4ème", label: "4ème" },
  { value: "3ème", label: "3ème" },
  { value: "2nde", label: "2nde" },
  { value: "1ère", label: "1ère" },
  { value: "Terminale", label: "Terminale" },
];

const statusOptions = [
  { value: "hot", label: "Hot" },
  { value: "warm", label: "Warm" },
  { value: "cold", label: "Cold" },
];

export function LeadRow({
  lead,
  onStatusChange,
  onLevelChange,
  onConfirmChange,
}: LeadRowProps) {
  const [openLevel, setOpenLevel] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "warm":
        return "bg-amber-500 hover:bg-amber-600 text-white";
      case "cold":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      default:
        return "";
    }
  };

  return (
    <TableRow key={lead.id}>
      <TableCell className="font-medium">{lead.parentName}</TableCell>
      <TableCell>{lead.phoneNumber}</TableCell>
      <TableCell>{lead.studentName}</TableCell>
      <TableCell>
        <Popover open={openLevel} onOpenChange={setOpenLevel}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openLevel}
              className="w-[110px] justify-between font-normal"
            >
              {lead.level}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search level..." />
              <CommandEmpty>No level found.</CommandEmpty>
              <CommandGroup>
                {levelOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onLevelChange(lead.id, option.value);
                      setOpenLevel(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        lead.level === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <Popover open={openStatus} onOpenChange={setOpenStatus}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStatus}
              className="px-2 border-0 w-[80px] justify-between font-normal"
            >
              <Badge className={cn("w-16", getStatusBadgeClass(lead.status))}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statusOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onStatusChange(
                        lead.id,
                        option.value as "hot" | "warm" | "cold"
                      );
                      setOpenStatus(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "w-16",
                          getStatusBadgeClass(option.value)
                        )}
                      >
                        {option.label}
                      </Badge>
                      {lead.status === option.value && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>{lead.contactedBy}</TableCell>
      <TableCell>
        <Switch
          checked={lead.confirmed}
          onCheckedChange={(checked) => onConfirmChange(lead.id, checked)}
        />
      </TableCell>
      <TableCell className="text-right">
        {format(new Date(lead.lastContactDate), "MMM d, yyyy")}
      </TableCell>
    </TableRow>
  );
}