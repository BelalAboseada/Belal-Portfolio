import React from "react";
import ContactForm from "@/components/ContactForm";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { socialLinks } from "@/lib/data";

function Contact(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow pt-24">
        <section className="section container">
          <h1 className="text-4xl font-bold mb-8">
            Get In <span className="text-blue-accent text-glow">Touch</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision. Fill out the form, and
                I'll get back to you as soon as possible.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-2">Email</h3>
                  <a
                    href="mailto:belal.aboseada@example.com"
                    className="text-blue-accent hover:underline"
                  >
                    belalaboseada@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Location</h3>
                  <p className="text-muted-foreground">Cairo, Egypt</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">Social Media</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-accent transition-colors p-2 rounded-full hover:bg-muted/20"
                        aria-label={link.name}
                      >
                        <link.icon size={24} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
