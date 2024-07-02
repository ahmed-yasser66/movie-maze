import insta from "../data/insta.svg";
import fb from "../data/fb.svg";
import linkedin from "../data/linkedin.svg";
import twitter from "../data/twitter.svg";
import setMetaTags from "../utils/setMetaTags";
import { description } from "../data/Provider";
const ContactUs = () => {
  setMetaTags({
    title: "Contact Us | MovieMaze",
    description,
    image: "/contactus.webp",
    url: window.location.href,
  });
  return (
    <section className=" mb-20 min-h-[var(--min-height)] bg-[#080808]">
      <div className="flex-center relative mx-auto max-w-7xl flex-col">
        <div className="relative z-[1] aspect-[2560/667] w-full bg-[linear-gradient(90deg,_rgba(8,8,8,1)_5%,_rgba(8,8,8,0)_50%,_rgba(8,8,8,1)_95%),linear-gradient(180deg,_rgba(8,8,8,1)_0%,_rgba(8,8,8,0)_50%,_rgba(8,8,8,1)_100%),url(/src/data/contact-us.webp)] bg-contain bg-no-repeat" />
        {/* HEADER */}
        <h1 className="relative z-10 -translate-y-8 text-center text-3xl font-semibold tracking-wide md:text-5xl">
          ContactUs
          <span className="absolute -top-3 left-1/2 hidden -translate-x-1/2 overflow-x-clip text-8xl font-extrabold text-[#A9A9A9] opacity-5 md:block">
            CONTACT
          </span>
        </h1>

        <div className="wrapper mt-28 flex max-w-6xl -translate-y-10 flex-col items-center gap-10 px-8 md:flex-row md:px-4 lg:gap-16">
          <form
            className="w-full rounded-sm bg-seconadry p-8 pb-20 md:w-1/2"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-2xl font-bold">
              Get Connected
              <span></span>
            </h1>
            <input
              type="text"
              className=" mt-10 w-full border-b border-b-gray-500 bg-transparent pb-3 outline-none placeholder:text-gray-50 focus:placeholder:opacity-0"
              placeholder="Your Name"
            />

            <input
              type="text"
              className=" mt-10 w-full border-b border-b-gray-500 bg-transparent pb-3 outline-none placeholder:text-gray-50 focus:placeholder:opacity-0"
              placeholder="Your Email Address"
            />

            <textarea
              id="message"
              className="mt-10 w-full resize-none border-b border-b-gray-500 bg-transparent pb-3 outline-none placeholder:text-gray-50 focus:placeholder:opacity-0"
              rows={4}
              placeholder="Your Message"
            ></textarea>

            <div className="relative mt-10 w-fit px-7 text-left before:absolute before:left-0 before:top-1/2 before:z-[2] before:block before:size-14 before:-translate-y-1/2 before:cursor-pointer before:rounded-full before:bg-blue-600 before:duration-500 hover:before:w-full">
              <input
                type="submit"
                value="Get in touch"
                className="relative z-[2] w-fit cursor-pointer text-sm font-bold uppercase tracking-wider"
              />
            </div>
          </form>
          <div className="contact--info w-full space-y-7 md:w-1/2">
            <p className="text-sm font-bold uppercase text-neutral-400">
              Contact Us
            </p>
            <span className="block text-2xl md:text-4xl">
              Let's Connect! We'd Love to Hear from You.
            </span>
            <p className="text-lg text-neutral-400">
              Reach out to discuss your movie-related queries, suggestions, or
              collaborations. Give us a call or drop us an email.
            </p>
            <p className="flex flex-col gap-y-7 text-lg">
              <span>1234 somewhere, Hollywood, USA</span>
              <a
                href="tel:+12345678"
                role="link"
                className="hover:text-blue-600"
              >
                +1 800 xxx 654 xxx
              </a>
              <a
                href="mailto:someone@mail.com"
                role="link"
                className="hover:text-blue-600"
              >
                contact@moviemaze.com
              </a>
            </p>
            <p className="flex w-1/2 items-center justify-start gap-4 invert">
              <img
                src={insta}
                alt="instagram"
                width={22}
                height={24}
                className="cursor-pointer"
              />
              <img
                src={fb}
                alt="facebook"
                width={22}
                height={18}
                className="cursor-pointer"
              />
              <img
                src={linkedin}
                alt="linkedin"
                width={16}
                height={16}
                className="cursor-pointer"
              />
              <img
                src={twitter}
                alt="twitter"
                width={17}
                height={16}
                className="ms-1 mt-1 cursor-pointer"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
