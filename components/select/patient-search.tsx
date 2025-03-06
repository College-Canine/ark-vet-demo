"use client";

import { useEffect, useState } from "react";
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
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewPatientModal } from "../modals/new-patient-modal";
import { Patient } from "@prisma/client";

type PatientSearchProps = {
  onSelect: (patient: string) => void;
};

export function PatientSearch({ onSelect }: PatientSearchProps) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/patients`);
      const json = await req.json();

      setPatients(json);
    })();
  }, []);

  return (
    <>
      <input type="hidden" name="patientId" value={patientId || ""} />
      <NewPatientModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSave={(ownerId: string) => {
          onSelect(ownerId);
          setPatientId(ownerId);
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? patients.find((patient) => patient.id === value)?.name
              : "Select patient..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search patients..." />
            <CommandList>
              <CommandEmpty>
                No patient found.
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Patient
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {patients.map((patient) => (
                  <CommandItem
                    key={patient.id}
                    value={patient.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onSelect(currentValue);
                      setPatientId(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === patient.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {patient.name}, {patient.breedSlug}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
