export const Footer = () => {
  return (
    <>
      <footer className=" text-white py-8 mt-10 border-t border-gray-300 bg-gradient-to-br from-transparent to-gray-800 ">
        <div className=" text-center">
          <p className="text-sm">
            {" "}
            © {new Date().getFullYear()} Developed by Sammythedeveloper. All
            rights reserved.
          </p>
          <p className="text-sm mt-2">
            Built with <span className="text-blue-500">love</span> and
            creativity.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
