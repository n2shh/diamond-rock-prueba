"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchStore } from "@/store/search";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SearchInput } from "@/components/ui/input";

const searchInput = z.object({
  searchTerm: z
    .string()
    .min(1, { message: "Por favor ingrese un término de búsqueda" })
    .max(10, {
      message: "El término de búsqueda no puede superar los 10 caracteres",
    }),
});

export function Search() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const form = useForm<z.infer<typeof searchInput>>({
    resolver: zodResolver(searchInput),
    mode: "onChange",
    defaultValues: {
      searchTerm: searchTerm,
    },
  });

  useEffect(() => {
    form.setValue("searchTerm", searchTerm);
  }, [form, searchTerm]);

  async function onSubmit(data: z.infer<typeof searchInput>) {
    setSearchTerm(data.searchTerm);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SearchInput placeholder="Search..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
