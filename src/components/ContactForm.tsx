import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

function ContactForm(): JSX.Element {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const mailtoLink = `mailto:balalaboseada@mail.com?subject=${encodeURIComponent(
        data.subject
      )}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )}`;

      window.location.href = mailtoLink;

      toast({
        title: "Opening mail client...",
        description: "Please complete the email to send your message.",
      });

      reset();
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const FormField = ({
    id,
    label,
    error,
    children,
  }: {
    id: string;
    label?: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6  gradient-border p-6 md:p-8 rounded-lg bg-card/50"
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormField id="name" error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Your Name"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
            className="bg-muted/50 border-muted"
            {...register("name")}
          />
        </FormField>

        <FormField id="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            className="bg-muted/50 border-muted"
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField id="subject" error={errors.subject?.message}>
        <Input
          id="subject"
          placeholder="Subject"
          aria-invalid={!!errors.subject}
          aria-describedby="subject-error"
          className="bg-muted/50 border-muted"
          {...register("subject")}
        />
      </FormField>

      <FormField id="message" error={errors.message?.message}>
        <Textarea
          id="message"
          placeholder="Your Message"
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
          className="bg-muted/50 border-muted min-h-[150px]"
          {...register("message")}
        />
      </FormField>

      <Button
        type="submit"
        className="w-full bg-blue-accent hover:bg-blue-accent/80"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

export default React.memo(ContactForm);
