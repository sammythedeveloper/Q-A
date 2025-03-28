import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import logoImage from "../../asset/sphereal-logo.svg";

export const navItems = [
  {
    name: "Dashboard",
    href: "dashboard",
  },
  {
    name: "About",
    href: "#about",
  },
  // {
  //   name: "Community",
  //   href: "#community",
  // },
  {
    name: "Resources",
    href: "#resources",
  },
];

export const Header = ({ user }) => {
  const navigate = useNavigate(); // Hook to handle redirection after logout

  // Determine login items based on whether the user is authenticated
  const loginItems = user
    ? [
        {
          buttonVariant: "primary",
          name: "SignOut",
          // SignOut button will trigger the logout logic
          onClick: () => {
            // Remove the token from localStorage
            localStorage.removeItem("token");

            // Redirect the user to the home page
            navigate("/");
          },
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
    <header className=" sticky top-0 z-40 bg-zinc-900/50 backdrop-blur-lg ">
      <div className=" container">
        <div className="flex justify-between items-center h-24 md:h-28">
          <div className="flex gap-4 items-center">
            <Link to="/dashboard">
              <div className=" font-heading text-4xl font-bold  ">
                <h2>Flowture</h2>
              </div>
            </Link>
          </div>
          <div className="h-full hidden lg:block">
            <nav className="h-full">
              {navItems.map(({ name, href }) => (
                <a
                  href={href}
                  key={href}
                  className="h-full px-10 relative font-bold text-xs tracking-widest text-white uppercase inline-flex items-center"
                >
                  {name}
                </a>
              ))}
            </nav>
          </div>
          <div className="hidden sm:block lg:flex gap-4">
            {loginItems.map(({ buttonVariant, name, href, onClick }) => (
              <Button variant={buttonVariant} onClick={onClick}>
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
