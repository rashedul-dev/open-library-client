import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = ({ onSubmit, children }: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
    </form>
  );
};

const FormItem = ({ className, children }: React.ComponentProps<"div">) => {
  return <div className={cn("grid gap-2", className)}>{children}</div>;
};

const FormLabel = ({ htmlFor, children }: React.ComponentProps<"label">) => {
  return <Label htmlFor={htmlFor}>{children}</Label>;
};

const FormControl = ({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      id={id}
      className="border rounded px-3 py-2 w-full"
      {...props}
    />
  );
};

const FormSelect = ({
  id,
  value,
  onChange,
  children,
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2 w-full"
    >
      {children}
    </select>
  );
};

const FormTextarea = ({
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      id={id}
      className="border rounded px-3 py-2 w-full"
      {...props}
    />
  );
};

const FormMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-sm text-red-500">{message}</p>;
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormSelect,
  FormTextarea,
};
