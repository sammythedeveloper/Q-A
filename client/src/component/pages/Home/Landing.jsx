// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import { Orbit } from "./Orbit";

// const LandingPage = () => {
//   return (
//     <div className="bg-black min-h-screen flex flex-col text-white font-sans">
//       {/* Radial Gradient on the top half */}
//       <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_farthest-corner,var(--color-blue-500)_40%,var(--color-blue-700)_75%,transparent)] z-0 bg-b "></div>

//       {/* Orbits on top of the radial gradient */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute-center">
//           <Orbit className="size-[350px]" />
//         </div>
//         <div className="absolute-center">
//           <Orbit className="size-[600px]" />
//         </div>
//         <div className="absolute-center">
//           <Orbit className="size-[850px]" />
//         </div>
//         <div className="absolute-center">
//           <Orbit className="size-[1100px]" />
//         </div>
//         <div className="absolute-center">
//           <Orbit className="size-[1350px]" />
//         </div>
//       </div>

//       {/* Hero Section */}
//       <header className="relative z-10 overflow-hidden py-20">
//         <div className="container mx-auto px-6 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-5xl font-heading font-extrabold mb-6 tracking-wide"
//           >
//             Unlock the Power of DevConnect
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="text-lg mb-8 font-medium"
//           >
//             Ask questions, share knowledge, and connect with the brightest minds in development.
//           </motion.p>
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="flex justify-center space-x-4"
//           >
//             <Link
//               to="/signup"  // Use Link for navigation
//               className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transform transition"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/signin"  // Use Link for navigation
//               className="bg-transparent border border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
//             >
//               Sign In
//             </Link>
//           </motion.div>
//         </div>
//         <motion.div
//           className="absolute inset-0 pointer-events-none"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.1 }}
//         >
//           <img
//             src="/hero-bg.svg"
//             alt="Hero Background"
//             className="absolute w-full h-full object-cover opacity-30"
//           />
//         </motion.div>
//       </header>

//       {/* Features Section */}
//       <section className="py-16 bg-white text-gray-800 z-10 relative flex-grow">
//         <div className="container mx-auto px-6">
//           <motion.h2
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-heading font-bold text-center mb-8"
//           >
//             Why Choose Us?
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Ask Questions",
//                 desc: "Get answers to your toughest questions.",
//                 icon: "📝",
//               },
//               {
//                 title: "Share Knowledge",
//                 desc: "Help others by sharing your expertise.",
//                 icon: "🤝",
//               },
//               {
//                 title: "Build Connections",
//                 desc: "Connect with developers worldwide.",
//                 icon: "🌍",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 }}
//                 className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
//               >
//                 <h3 className="text-lg font-semibold mb-2 flex items-center">
//                   <span className="text-2xl mr-2">{feature.icon}</span>
//                   {feature.title}
//                 </h3>
//                 <p>{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-8 mt-auto">
//         <div className="container mx-auto px-6 text-center">
//           <p>&copy; 2024 DevConnect. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
// import Image from "next/image";
import logoImage from "../../asset/sphereal-logo.svg";
import { Button ,ButtonProps } from "./Button";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { SectionBorder } from "./SectionBorder";
import { motion } from "framer-motion";
// import { SectionBorder } from "@/components/SectionBorder";

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
    href: "#login",
  },
  {
    buttonVariant: "primary",
    name: "Sign Up",
    href: "#sign-up",
  },
];

export const Landing = () => {
  return (
    <>
      <section className="overflow-x-hidden">
        <header className=" relative z-40 ">
          <div className=" container  ">
            <div className=" h-18 lg:h-20 flex justify-between items-center -z-10">
              <div className=" flex gap-4 items-center">
                <div
                  className=" size-10 bg-gray-200 bg-[conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))]"
                  style={{
                    maskImage: `url(${logoImage})`,
                    maskSize: "contain",
                  }}
                ></div>
                <div className="front-extrabold text-2xl">Q&A</div>
              </div>
              <div className="h-full hidden lg:block ">
                <nav className="h-full">
                  {navItems.map(({ name, href }) => (
                    <a
                      href={href}
                      key={href}
                      className="h-full px-10 relative font-bold text-xs tracking-widest text-white uppercase inline-flex items-center "
                    >
                      {name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className=" hidden lg:flex gap-4">
                {loginItems.map(({ buttonVariant, name, href }) => (
                  <a href={href} key={name} className="w-full">
                    <Button variant={buttonVariant}>{name}</Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>
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
                <Button variant="secondary" className=" mt-10">
                  Join Here
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
                    className=" translate-x-[334px] -translate-y-[388px] -rotate-135 "
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
            <div className="container mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl text-white font-heading font-bold text-center mb-8 py-4 "
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
                    className="p-6 bg-white text-black rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <span className="text-2xl mr-2">{feature.icon}</span>
                      {feature.title}
                    </h3>
                    <p>{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <footer className=" text-white py-8 mt-10 border-t ">
              <div className=" text-center">
                <p>&copy; 2024 DevConnect. All rights reserved.</p>
              </div>
            </footer>
          </SectionBorder>
        </div>
      </section>
    </>
  );
};

export default Landing;
