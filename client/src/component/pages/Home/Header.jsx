import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { CutCornerButton } from "./CutCornerButton";
import SignUp from "../Sign/SignUp";
import SignIn from "../Sign/SignIn";
// import logoImage from "../../asset/sphereal-logo.svg";

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
            <Link to={"/dashboard"}>
              <div className=" font-heading text-4xl font-bold  ">
                <h2>Flowture</h2>
              </div>
            </Link>
            <div className=" hidden sm:block lg:flex gap-4">
              {loginItems.map(({ buttonVariant, name, href }) => (
                <Link to={href} key={name} className="w-full">
                  <Button variant={buttonVariant}>{name}</Button>
                </Link>
              ))}
          </div>
          <div className=" flex gap-4 items-center">
            <CutCornerButton className=" hidden md:inline-flex  ">
              <SignUp/>
              </CutCornerButton>
              <CutCornerButton className="hidden md:inline-flex">
                <SignIn />
              </CutCornerButton>
            <div className="size-10 relative">
              <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className=" w-5 h-0.5 bg-zinc-300 -translate-y-1 "></div>
              </div>
              <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className=" w-5 h-0.5 bg-zinc-300 translate-y-1 "></div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
