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
import { Owner } from "@prisma/client";
import { NewOwnerModal } from "@/components/modals/new-owner-modal";

type OwnerSearchProps = {
  onSelect?: (owner: string) => void;
};

export function OwnerSearch({ onSelect }: OwnerSearchProps) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [owners, setOwners] = useState<Owner[]>([]);
  const [_ownerId, setOwnerId] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/owners`);
      const json = await req.json();

      setOwners(json);
    })();
  }, []);

  return (
    <>
      <input type="hidden" name="ownerId" value={_ownerId || ""} />
      <NewOwnerModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSave={(ownerId: string) => {
          if (onSelect) onSelect(ownerId);
          setOwnerId(ownerId);
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
              ? `${owners.find((owner) => owner.id == value)?.firstName} ${
                  owners.find((owner) => owner.id == value)?.lastName
                }`
              : "Select owner..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search owners..." />

            <CommandList>
              <CommandEmpty>No owner found.</CommandEmpty>
              <CommandGroup>
                {owners.map((owner) => (
                  <CommandItem
                    key={owner.id}
                    value={owner.id}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      if (onSelect) onSelect(owner.id);
                      setOwnerId(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === owner.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {owner.firstName} - {owner.email}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Owner
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
