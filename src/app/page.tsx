import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <section className="w-full min-h-screen md:h-screen justify-center flex flex-col space-y-4 items-center p-8 pt-40 bg-[url('/hero-background.svg')] bg-right-bottom bg-cover bg-no-repeat">
        <h1 className="font-poppins text-5xl text-white text-center md:text-6xl">
          NOVA CARE INNOVATIONS
        </h1>
        <p className="text-lg text-center text-white font-medium md:text-5xl  md:pb-8">
          "Where <span className="text-accentRed">checkup</span> meets{" "}
          <span className="text-accentRed">convenience</span>"
        </p>
        <Button className="bg-accentRed w-fit rounded-xl shadow-xl md:text-2xl md:p-6 ">
          PRODUCT DEMO
        </Button>
        <Image
          src="/mock-up-image2.png"
          alt="mock-up-image"
          width={800}
          height={768}
        />
      </section>

      <section className="flex flex-col items-center justify-center px-7 pb-24 md:mt-24">
        <h1 className="font-poppins text-5xl text-accentBlue pb-5">About Us</h1>
        <section className="flex flex-col items-center md:flex-row md:space-x-10">
          <Image
            src="/AboutUs.png"
            alt="aboutus"
            className="md:h-[500px] w-fit"
            height={400}
            width={400}
          />
          <p className="flex-1 text-center md:text-left  md:w-[700px]">
            "Introducing <strong>NCI</strong> — your comprehensive solution for
            transforming healthcare practices. Elevate patient care with our
            innovative app, providing healthcare professionals with advanced
            tools for conducting thorough and efficient medical checkups. <br />
            <br />
            <strong>NCI</strong> streamlines the process, allowing medical
            practitioners to personalize assessments, track patient health data,
            and access accurate insights seamlessly. Our user-friendly interface
            empowers healthcare providers to deliver optimal care with
            efficiency and precision. Join <strong>NCI</strong> in
            revolutionizing healthcare delivery — where personalized medical
            checkups meet the precision of technology, setting a new standard in
            patient-centric care."
          </p>
        </section>
      </section>

      <section className="flex flex-col items-center justify-center pb-10 px-8 md:px-32 md:pb-24">
        <h1 className="font-poppins text-5xl text-accentBlue mb-8">Services</h1>
        <section className="flex flex-col items-center justify-center space-y-6 md:flex-row-reverse">
          <Image
            alt="services-slider"
            src="/slider.png"
            className="md:h-[200px] w-fit"
            width={300}
            height={200}
          />
          <section className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-accentRed pb-3 md:w-[300px]">
              Heart Rate Variablility
            </h1>
            <p className="text-center font-medium md:text-left">
              Heart rate variability (HRV) is a measure of the variation in time
              between consecutive heartbeats. It is not a constant, as the time
              between each heartbeat can fluctuate. HRV is controlled by the
              autonomic nervous system, which regulates involuntary bodily
              functions such as breathing and heart rate.
            </p>
          </section>
        </section>
      </section>

      <section className="flex flex-col items-center justify-center px-7 mb-10 md:px-32 md:mb-24">
        <h1 className="font-poppins text-center text-2xl md:text-5xl text-accentBlue pb-5 md:pb-10">
          Frequently Asked Questions (FAQs)
        </h1>

        <Accordion
          type="single"
          collapsible
          className="w-full font-bold md:text-xl"
        >
          <AccordionItem
            className="border-accentRed border rounded-xl p-1 px-3  md:px-8"
            value="item-1"
          >
            <AccordionTrigger>
              What is NCI, and how does it work?
            </AccordionTrigger>
            <AccordionContent>
              Your App Name] stands out with its user-friendly interface,
              personalized assessments, and accurate insights. It prioritizes
              user privacy and security, making it a trustworthy solution for
              both individuals and healthcare practitioners. Yes. It adheres to
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border-accentRed border rounded-xl p-1 px-3 mt-3 md:px-8"
            value="item-2"
          >
            <AccordionTrigger>
              What is NCI, and how does it work?
            </AccordionTrigger>
            <AccordionContent>
              Your App Name] stands out with its user-friendly interface,
              personalized assessments, and accurate insights. It prioritizes
              user privacy and security, making it a trustworthy solution for
              both individuals and healthcare practitioners. Yes. It adheres to
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            className="border-accentRed border rounded-xl p-1 px-3 mt-3 md:px-8"
            value="item-3"
          >
            <AccordionTrigger>
              What is NCI, and how does it work?
            </AccordionTrigger>
            <AccordionContent>
              Your App Name] stands out with its user-friendly interface,
              personalized assessments, and accurate insights. It prioritizes
              user privacy and security, making it a trustworthy solution for
              both individuals and healthcare practitioners. Yes. It adheres to
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="bg-[url(/footer-background.svg)] flex flex-col  h-96 px-8 ">
        <section className="flex flex-row justify-between  h-full">
          <section className="h-fit place-self-end pb-4 flex flex-row items-center space-x-4">
            <Image alt="logo" src="/icon.jpeg" width="50" height="50" />
            <h1 className="font-poppins text-sm md:text-2xl text-white">
              NovaCareInnovations
              <br />
              <span className="text-xs md:text-lg font-normal">
                Where checkups meet convenience
              </span>
            </h1>
          </section>
          <section className="text-right text-white pt-48 md:pt-24">
            <h1 className="text-sm md:text-2xl font-bold">Follow Us On</h1>
            <section className="flex flex-row space-x-4 ">
              <Link href="#">
                <FaInstagram className="w-6 md:w-10" size={40} />
              </Link>
              <Link href="#">
                <FaFacebook className="w-6 md:w-10" size={40} />
              </Link>
              <Link href="#">
                <FaLinkedin className="w-6 md:w-10" size={40} />
              </Link>
              <Link href="#">
                <FaXTwitter className="w-6 md:w-10" size={40} />
              </Link>
            </section>
          </section>
        </section>

        <section className="flex flex-col text-xs items-center border-t border-black pt-1 md:justify-between md:flex-row md:text-lg pb-3">
          <p className="text-white">
            &copy; NovaCareInnovations | All Rights Reserved 2023
          </p>
          <p className="text-white">
            <Link href="#">Privacy & Legal Terms</Link>
          </p>
        </section>
      </section>
    </>
  );
}
