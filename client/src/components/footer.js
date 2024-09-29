import React from "react";

const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 mt-auto z-50">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} blackbox. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
