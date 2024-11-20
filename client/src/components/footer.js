import React from "react";

const Footer = () => (
  // <footer className="fixed bottom-0 left-0 right-0 text-m bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 mt-auto z-50">
  //   <div className="container mx-auto text-center">
  //     <p>&copy; {new Date().getFullYear()} blackbox. All rights reserved.</p>
  //   </div>
  // </footer>
  <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-3 sm:p-4 z-50">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <p className="text-xs sm:text-sm text-center">
          &copy; {new Date().getFullYear()} Blackbox. All rights reserved.
        </p>
        {/* Optional: Add social links or additional footer content */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* You can add social icons or additional links here */}
          {/* <a href="/privacy" className="text-xs sm:text-sm hover:underline">Privacy Policy</a>
          <a href="/terms" className="text-xs sm:text-sm hover:underline">Terms of Service</a> */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
