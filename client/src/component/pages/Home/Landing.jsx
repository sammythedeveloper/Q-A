import { Button, ButtonProps } from "./Button";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { SectionBorder } from "./SectionBorder";
import { motion } from "framer-motion";
import { SectionContent } from "./SectionContent";
import { Companies } from "./Companies";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";

export const navItems = [
  {
    name: "Features",
    href: "#feature",
  },
  {
    name: "About",
    href: "#About",
  },
  {
    name: "Community",
    href: "#community",
  },
  {
    name: "Resources",
    href: "#resources",
  },
];

export const loginItems = [
  {
    buttonVariant: "tertiary",
    name: "Login",
    href: "/signin",
  },
  {
    buttonVariant: "primary",
    name: "SignUp",
    href: "/signup",
  },
];

export const Landing = () => {
  return (
    <>
      <section className="overflow-x-hidden">
        <Header />
        <div className="w-full px-4 md:px-8 lg:px-16">
          <SectionBorder>
            <div className=" relative py-24 md:py-36 lg:py-48  isolate overflow-hidden [mask-image:liner-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
              <div className=" absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-blue-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]"></div>
              <div className="absolute inset-0 -z-10  ">
                <div className=" absolute-center">
                  <Orbit className="size-[350px] " />
                </div>
                <div className=" absolute-center">
                  <Orbit className="size-[600px]" />
                </div>
                <div className=" absolute-center">
                  <Orbit className="size-[850px]" />
                </div>
                <div className=" absolute-center">
                  <Orbit className="size-[1100px]" />
                </div>
                <div className=" absolute-center">
                  <Orbit className="size-[1350px]" />
                </div>
              </div>
              <h1 className=" text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center leading-tight">
                Curiosity meets clarity. Collaborate seamlessly and empower
                ideas.
              </h1>
              <p className=" text-center text-lg md:text-xl mt-8 max-w-3xl mx-auto ">
                Ignite innovation, share insights, and build solutions. Your
                ultimate hub for
              </p>
              <div className=" flex justify-center ">
                <Button
                  variant="secondary"
                  className="mt-10"
                  as={Link}
                  to="/signup"
                >
                  <Link to={"/signup"}> Join Here</Link>
                </Button>
              </div>
              <div className="relative isolate max-w-5xl mx-auto">
                <div className=" absolute left-1/2 top-0 ">
                  <Planet
                    size="lg"
                    color="white"
                    className=" -translate-x-[336px] -translate-y-[76px] rotate-135 "
                  />

                  <Planet
                    size="md"
                    color="blue"
                    className=" translate-x-[334px] -translate-y-[160px] -rotate-135 "
                  />
                  <Planet
                    size="lg"
                    color="green"
                    className=" translate-x-[508px] -translate-y-[372px] -rotate-135 "
                  />
                  <Planet
                    size="sm"
                    color="orange"
                    className=" -translate-x-[488px] -translate-y-[442px] rotate-135 "
                  />
                </div>
              </div>
            </div>
            <div className=" mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl text-white font-heading font-bold text-center mb-8 py-4"
              >
                Why Choose Us?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Ask Questions",
                    desc: "Get answers to your toughest questions.",
                    icon: "📝",
                  },
                  {
                    title: "Share Knowledge",
                    desc: "Help others by sharing your expertise.",
                    icon: "🤝",
                  },
                  {
                    title: "Build Connections",
                    desc: "Connect with developers worldwide.",
                    icon: "🌍",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 bg-white text-black rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 font-body border-2 border-green-700 "
                  >
                    <h3 className="text-lg font-bold mb-2 flex items-center tracking-widest uppercase font-heading">
                      <span className="text-2xl mr-2">{feature.icon}</span>
                      {feature.title}
                    </h3>
                    <p className="text-xs tracking-widest font-body uppercase">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <SectionBorder>
              <SectionContent>
                <Companies />
              </SectionContent>
            </SectionBorder>
            <footer className=" text-white py-8 mt-10 border-t border-gray-300 bg-gradient-to-br from-transparent to-gray-800 ">
              <div className=" text-center">
                <p className="text-sm">
                  {" "}
                  © {new Date().getFullYear()} Developed by Sammythedeveloper.
                  All rights reserved.
                </p>
                <p className="text-sm mt-2">
                  Built with <span className="text-blue-500">love</span> and
                  creativity.
                </p>
              </div>
            </footer>
          </SectionBorder>
        </div>
      </section>
    </>
  );
};

export default Landing;
