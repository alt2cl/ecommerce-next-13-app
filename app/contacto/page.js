import ContactForm from "@/src/components/ContactForm/ContactForm";

export default function ContactoPage() {
  return (
    <div className="container px-4 pt-9">
      <main className="mb-8">
        <section>
          <div className="d-flex justify-center">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
