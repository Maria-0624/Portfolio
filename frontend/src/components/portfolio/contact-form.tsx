import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5000";
  
type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSending, setIsSending] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Unable to send your message."
        );
      }

      toast.success(
        "Message sent successfully! I'll get back to you soon."
      );

      setForm(initialForm);
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">

      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">

        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs text-muted-foreground"
          >
            Name
          </label>

          <input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            maxLength={100}
            required
            autoComplete="name"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs text-muted-foreground"
          >
            Email
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            maxLength={254}
            required
            autoComplete="email"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="you@example.com"
          />
        </div>

      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-xs text-muted-foreground"
        >
          Subject
        </label>

        <input
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(event) =>
            updateField("subject", event.target.value)
          }
          maxLength={200}
          required
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="How can I help?"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs text-muted-foreground"
        >
          Message
        </label>

        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          maxLength={5000}
          required
          rows={6}
          className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Write your message..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSending}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

    </form>
  );
}