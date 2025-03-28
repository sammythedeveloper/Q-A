import { Hexagon } from "./Hexagon";
import { Circle } from "./Circle";
import torusKnot from "../../asset/torus-knot.png";
import cube from "../../asset/cube.png";
import Header from "./Header";

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
      <Header />
      <section className=" py-24 md:py-52 overflow-x-clip ">
        <div className=" container">
          <p className=" uppercase font-extrabold text-center text-zinc-500 tracking-wider">
            Introducing Flowture
          </p>
          <h1 className=" font-heading font-black text-5xl md:text-6xl lg:text-7xl text-center mt-4 max-w-3xl mx-auto ">
            Where Time Meets Efficiency
          </h1>
          <p className=" text-center text-xl md:text-2xl mt-6 text-zinc-400 max-w-xl mx-auto ">
            Flowture is your smart planner that helps you organize,prioritize
            and achieve moree with less effort day by day.
          </p>
          <div className=" flex justify-center mt-24">
            <div className=" inline-flex relative z-0 ">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Hexagon className="size-[1800px]" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Hexagon className="size-[1100px]" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Hexagon className="size-[500px]" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Circle className=" absolute left-[400px] -top-[170px] ">
                  <img
                    src={torusKnot}
                    alt="3D torus knot shape"
                    className="size-[140px]"
                  />
                </Circle>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Circle className=" absolute -left-[600px] -top-[80px] ">
                  <img
                    src={cube}
                    alt="3D cube shape"
                    className="size-[140px]"
                  />
                </Circle>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
