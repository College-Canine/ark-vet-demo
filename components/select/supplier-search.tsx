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
import { InventorySupplier } from "@prisma/client";
import { NewSupplierModal } from "@/components/modals/new-supplier-modal";

type SupplierSearchProps = {
  onSelect?: (supplier: string) => void;
};

export function SupplierSearch({ onSelect }: SupplierSearchProps) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [suppliers, setSuppliers] = useState<InventorySupplier[]>([]);
  const [_supplierId, setSupplierId] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/suppliers`);
      const json = await req.json();

      setSuppliers(json);
    })();
  }, []);

  return (
    <>
      <input type="hidden" name="supplierId" value={_supplierId || ""} />
      <NewSupplierModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSave={(supplierId: string) => {
          if (onSelect) onSelect(supplierId);
          setSupplierId(supplierId);

          // Reload the list
          (async () => {
            const req = await fetch(`/api/suppliers`);
            const json = await req.json();

            setSuppliers(json);
          })();
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
            {value ? (
              <img
                className="w-min h-4"
                src={`https://logo.clearbit.com/${
                  suppliers.find((supplier) => supplier.slug == value)?.website
                }`}
                alt="Supplier Logo"
              />
            ) : (
              <></>
            )}
            <span className="w-full text-left">
              {value
                ? suppliers.find((supplier) => supplier.slug == value)?.name
                : "Select supplier..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search suppliers..." />

            <CommandList>
              <CommandEmpty>No supplier found.</CommandEmpty>
              <CommandGroup>
                {suppliers.map((supplier) => (
                  <CommandItem
                    key={supplier.slug}
                    value={supplier.slug}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      if (onSelect) onSelect(supplier.slug);
                      setSupplierId(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === supplier.slug ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {supplier.name} - {supplier.website}
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
            Create New Supplier
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
