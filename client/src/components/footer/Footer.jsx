import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex-col py-2.5 px-7">
      <p className="text-xs font-normal opacity-50 text-center">created by:</p>
      <div className="flex justify-center">
        <Link to="https://github.com/michelletrn" target="__blank">
          <p className="text-xs font-normal opacity-60 hover:text-[#004392] transition duration-150 ease-in px-2">
            Michelle
          </p>
        </Link>
        <p className="text-xs font-normal opacity-60">&</p>
        <Link to="https://github.com/Val-gee" target="__blank">
          <p className="text-xs font-normal opacity-60 hover:text-[#004392] transition duration-150 ease-in px-2">
            Valentina
          </p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
