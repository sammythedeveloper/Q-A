import { ReactComponent as ReactLogo } from "../../asset/react.svg";
import { ReactComponent as Javascript } from "../../asset/JavaScript.svg";
import { ReactComponent as Typescript } from "../../asset/TypeScript.svg";
import { ReactComponent as Mango } from "../../asset/MongoDB.svg";
import { ReactComponent as Node } from "../../asset/Node.js.svg";
import { ReactComponent as Mysql } from "../../asset/MySQL.svg";
import { ReactComponent as Tailwind } from "../../asset/Tailwind CSS.svg";
import { ReactComponent as HTML } from "../../asset/HTML5.svg";
import { ReactComponent as CSS } from "../../asset/CSS3.svg";

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

export const Companies = () => {
  return (
    <section className="py-0">
      <div className="container mx-auto">
        <div className="flex items-center justify-center pt-12 w-full">
          <Button className="">Are you Ready to learn and share your thoughts?</Button>
        </div>
        <h2 className="text-3xl text-center font-semibold mb-8">
          Empowering users to ask, answer, and collaborate on tackling complex challenges.
        </h2>
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {companies.map(({ logo: Logo, name }) => (
            <div key={name} className="w-16 h-16 flex justify-center items-center">
              {/* Use the React component version of the logo */}
              <Logo className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

