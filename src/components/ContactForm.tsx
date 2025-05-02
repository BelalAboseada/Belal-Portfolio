
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
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
      // Replace with actual form submission logic
      console.log("Form data:", data);
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 gradient-border p-6 md:p-8 rounded-lg bg-card/50"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Input
            id="name"
            placeholder="Your Name"
            className="bg-muted/50 border-muted"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            className="bg-muted/50 border-muted"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Input
          id="subject"
          placeholder="Subject"
          className="bg-muted/50 border-muted"
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-red-500 text-xs">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          id="message"
          placeholder="Your Message"
          className="bg-muted/50 border-muted min-h-[150px]"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-accent hover:bg-blue-accent/80"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
