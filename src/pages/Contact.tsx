import { ContactCard, ContactForm, Footer } from "@/components";
import { DesktopNavbar } from "@/components/navbar";
import contactInfo from "@/data/contact.json";

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {contactInfo.map((info) => (
        <ContactCard {...info} />
      ))}
      <div className="mt-6 flex items-center gap-5">
        <a
          href="https://www.instagram.com/kaanisterene?igsh=Y2dnbTMxemcxMnZt&utm_source=qr"
          target="_blank"
        >
          <i className="fi fi-brands-instagram flex text-blue-400 text-2xl" />
        </a>
        <a href="https://x.com/kaanisterene?s=21" target="_blank">
          <i className="fi fi-brands-twitter-alt flex text-blue-400 text-2xl"></i>
        </a>
        <a
          href="https://www.tiktok.com/@kaanisterene_3?_t=ZM-8w4tvbuw34o&_r=1"
          target="_blank"
        >
          <i className="fi fi-brands-tik-tok flex text-blue-400 text-2xl"></i>
        </a>
      </div>
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="min-h-dvh bg-[#fafafa]">
      <DesktopNavbar />

      {/* Contact me */}
      <div className="w-[90%] max-w-7xl mx-auto py-20">
        <h1 className="font-great-vibe text-5xl md:text-6xl text-blue-400">
          Contact me
        </h1>

        {/* Contact Me */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(250px,300px)_1fr] gap-16 md:gap-10 mt-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};
