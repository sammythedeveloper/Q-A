import { Link } from "react-router-dom";
import { Button } from "./Button";
import logoImage from "../../asset/sphereal-logo.svg";

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
  
export const Header = ({user}) => {
  const loginItems = user
  ? [
      {
        buttonVariant: "primary",
        name: "SignOut",
        href: "/", // Your sign-out route
      },
    ]
  : [
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
    return (
      <>
        <section className="overflow-x-hidden">
          <header className=" relative z-40 ">
            <div className=" h-20 flex justify-between items-center -z-10">
              <div className=" flex gap-4 items-center">
                <Link to={'/'} >
                <div
                  className=" size-10 bg-gray-200 bg-[conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))]"
                  style={{
                    maskImage: `url(${logoImage})`,
                    maskSize: "contain",
                  }}
                  ></div>
                  </Link>
                <div className="front-extrabold text-2xl">Q&A</div>
              </div>
              <div className="h-full  hidden lg:block ">
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
              <div className=" hidden sm:block lg:flex gap-4">
                {loginItems.map(({ buttonVariant, name, href }) => (
                  <Link to={href} key={name} className="w-full">
                    <Button variant={buttonVariant}>{name}</Button>
                  </Link>
                ))}
              </div>
            </div>
          </header>
        </section>
      </>
    );
  };
  
  export default Header;