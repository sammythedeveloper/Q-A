import ReactLogo from "../../asset/react.svg";
import Javascript from "../../asset/JavaScript.svg";
import Typescript from "../../asset/TypeScript.svg";
import Mango from "../../asset/MongoDB.svg";
import Node from "../../asset/Node.js.svg";
import Mysql from "../../asset/MySQL.svg";
import Tailwind from "../../asset/Tailwind CSS.svg";
import HTML from "../../asset/HTML5.svg";
import CSS from "../../asset/CSS3.svg";
import { Button } from "./Button";

export const companies = [
  {
    name: "HTML",
    logo: HTML,
  },
  {
    name: "CSS",
    logo: CSS,
  },
  {
    name: "Javascript",
    logo: Javascript,
  },
  {
    name: "Mango",
    logo: Mango,
  },
  {
    name: "Node",
    logo: Node,
  },
  {
    name: "Mysql",
    logo: Mysql,
  },
  {
    name: "Typescript",
    logo: Typescript,
  },
  {
    name: "Tailwind",
    logo: Tailwind,
  },
  {
    name: "React",
    logo: ReactLogo,
  },
];

export const Collection = () => {
  return (
    <section className="py-0">
      <div className="container mx-auto">
        <div className=" flex items-center justify-center pt-12 w-full ">
          <Button className="   ">
            Are you Ready to learn and share your thoughts?
          </Button>
        </div>
        <h2 className="text-3xl text-center font-semibold mb-8">
          Empowering users to ask, answer, and collaborate on tackling complex
          challenges.
        </h2>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {companies.map(({ logo: Logo, name }) => (
            <div
              key={name}
              className="w-16 h-16 flex justify-center items-center"
            >
              <Logo className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
