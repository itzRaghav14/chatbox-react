import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormInputFieldParams {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
}

export default function FormInputField({ form, name, label, placeholder, description, inputType="text" }: FormInputFieldParams) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={inputType} placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
