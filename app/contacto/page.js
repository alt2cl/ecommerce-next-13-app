import ContactForm from "@/components/ContactForm/ContactForm";

export default function ContactoPage() {
  return (
    <div className="container px-4 pt-9">
      <main className="mb-8">
        <section>
          <ContactForm sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} />
        </section>
      </main>
    </div>
  );
}
