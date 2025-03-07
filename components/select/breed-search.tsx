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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PetBreed } from "@prisma/client";

type BreedSearchProps = {
  onSelect?: (breed: string) => void;
};

export function BreedSearch({ onSelect }: BreedSearchProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [breeds, setBreeds] = useState<PetBreed[]>([]);
  const [_breedId, setBreedId] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/breeds`);
      const json = await req.json();

      setBreeds(json);
    })();
  }, []);

  return (
    <>
      <input type="hidden" name="breedId" value={_breedId || ""} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? breeds.find((breed) => breed.slug == value)?.name
              : "Select breed..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search breeds..." />

            <CommandList>
              <CommandEmpty>No breed found.</CommandEmpty>
              <CommandGroup>
                {breeds.map((breed) => (
                  <CommandItem
                    key={breed.slug}
                    value={breed.slug}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      if (onSelect) onSelect(breed.slug);
                      setBreedId(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === breed.slug ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {breed.name}
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
