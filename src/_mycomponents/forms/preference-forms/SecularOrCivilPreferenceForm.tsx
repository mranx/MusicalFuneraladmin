"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { usePreferenceForm } from "@/hooks/forms/usePreferenceForm";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// ----------------- types -----------------

// Define the Zod schema
type SelectionType = {
  value: string;
  name: string;
};

type SelectOption = {
  name: keyof FormData;
  label: string;
  options: SelectionType[];
};

const formSchema = z.object({
  preService: z.string().min(1, "Required Field"),
  serviceStart: z.string().min(1, "Required Field"),
  reflectionPiece: z.string().min(1, "Required Field"),
  preService2: z.string().min(1, "Required Field"),
  serviceEnd: z.string().min(1, "Required Field"),
  viewingMusic: z.boolean().optional().default(false),
  fillerMusicPreService: z.boolean().optional().default(false),
  placingOfSymbols: z.boolean().optional().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function SecularOrCivilPreferenceForm() {
  const { setPreferenceForm } = usePreferenceForm();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const selectOptions: SelectOption[] = [
    {
      name: "preService" as const,
      label: "Pre Service",
      options: [{ value: "20min", name: "Instrumental 20 Mins" }],
    },
    {
      name: "serviceStart" as const,
      label: "Service Start",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "reflectionPiece" as const,
      label: "Reflection Piece",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "preService2" as const,
      label: "Pre Service 2",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "serviceEnd" as const,
      label: "Service End",
      options: [{ value: "vocal", name: "Vocal" }],
    },
  ];

  const onSubmit = (data: FormData) => {
    const preferences = selectOptions.reduce((acc, select) => {
      const selectedOption = select.options.find(
        (option) => option.value === data[select.name as keyof FormData]
      );
      if (selectedOption) {
        acc[select.name] = selectedOption as SelectionType;
      }
      return acc;
    }, {} as Record<string, SelectionType>);

    setPreferenceForm({
      ...preferences,
      viewingMusic: data.viewingMusic,
      fillerMusicPreService: data.fillerMusicPreService,
      placingOfSymbols: data.placingOfSymbols,
    });
    router.push("/music/choose-preferred-service");
  };

  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-md p-4 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Secular/Civil Service Preferences</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {selectOptions.map((section, index) => (
            <div key={index} className="space-y-2">
              <FormField
                control={form.control}
                name={section.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {section.label}
                    </FormLabel>
                    <Select onValueChange={field.onChange} >
                      <FormControl>
                        <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-gray-800">
                        {section.options.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          ))}

          {/* Additional Options */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="viewingMusic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Viewing music
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fillerMusicPreService"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Filler Music Pre-Service: Vocal
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placingOfSymbols"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Placing of Symbols: Vocal
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="text-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={() => router.back()}
            >
              Previous
            </Button>
            <Button type="submit" className="text-sm">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
