// const handleLogin = () => {
//   // Implement your login logic here
//   setIsLoggedIn(true);
// };

// const handleSignup = () => {
//   // Implement your signup logic here
//   setIsLoggedIn(true);
// };

// const handleLogout = () => {
//   // Implement your logout logic here
//   setIsLoggedIn(false);
//   <Navigate to="/" />;
// };
// <Route
//     path="/login"
//     element={
//       isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
//     }
//   />
//   <Route
//     path="/signup"
//     element={
//       isLoggedIn ? (
//         <Navigate to="/" />
//       ) : (
//         <Signup onSignup={handleSignup} />
//       )
//     }
//   />
//{
/* {!isLoggedIn && (
              <>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
                >
                  Login
                </Link>
              </>
            )} */
//}
// {
//   isLoggedIn && (
//     <>
//       <button
//         onClick={onLogout}
//         className="p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
//       >
//         <LogOut size={20} />
//       </button>
//       <div className="p-2 rounded-md text-white">
//         <User size={20} />
//       </div>
//     </>
//   );
// }
// isLoggedIn ? (
//         <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl px-6">
//           {/* Pixelated Avatar */}
//           <div className="w-32 h-32 mb-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg p-1">
//             <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
//               <User size={100} className="text-gray-400" />
//             </div>
//           </div>

//           {/* About Section */}
//           <div className="w-full">
//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
//               <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
//                 {/* {aboutContent} */}
//               </p>
//             </div>
//           </div>
//         </div>
//       )

/* 
   {/* <header>
        <h1 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400">
          About the creator
        </h1>
      </header> 
           {/* <header className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg mb-6">
        <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
          About the creator
        </h1>
      </header> 

<header>
        <h1 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400">
          Why blackbox?
        </h1>
      </header>

      <section className="mb-8">
        <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 mb-4">
          According to master chat: A black box refers to a system, device, or
          process whose internal workings are unknown or not fully understood,
          but whose inputs and outputs are visible and can be observed. In other
          words, while you can see how the system behaves and interact with it,
          you cannot see or understand the mechanisms or logic inside it.
        </p>

        <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 mb-4">
          Here, blackbox refers to the same concept as described above. I take
          systems that I find fascinating and dissect them with the aim of
          understanding their internals. I document my thought process here,
          hence the name <b>blackbox</b>.
        </p>
      </section> */
// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Sun, Moon, Home } from "lucide-react";
// const Navbar = ({ darkMode, toggleDarkMode }) => {
//   return (
//     <nav className=" bg-gray-800 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center space-x-4">
//             <NavLink
//               to="/"
//               className="text-2xl font-bold flex items-center text-white"
//             >
//               <Home size={24} className="mr-2 text-white" />
//               blackbox
//             </NavLink>
//           </div>
//           <div className="flex items-center">
//             <Link
//               to="/"
//               className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
//             >
//               Home
//             </Link>
//             <Link
//               to="/blog"
//               className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
//             >
//               Blog
//             </Link>
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full hover:bg-purple-700 transition-colors text-white"
//             >
//               {darkMode ? <Sun size={24} /> : <Moon size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;
// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import { Sun, Moon, Home } from "lucide-react";
// // const NavBar = ({ darkMode, toggleDarkMode }) => (
// //   <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
// //     <div className="container mx-auto px-6 py-3 flex justify-between items-center">
// //       <div className="flex items-center space-x-4">
// //         <NavLink to="/" className="text-2xl font-bold flex items-center">
// //           <Home size={24} className="mr-2" />
// //           blackbox
// //         </NavLink>
// //       </div>
// //       <div className="flex items-center space-x-4">
// //         <NavLink to="/" className="hover:text-purple-200 transition-colors" end>
// //           Home
// //         </NavLink>
// //         {/* <NavLink
// //           to="/about"
// //           className="hover:text-purple-200 transition-colors"
// //         >
// //           About:
// //         </NavLink> */}
// //         <NavLink to="/blog" className="hover:text-purple-200 transition-colors">
// //           Blog
// //         </NavLink>
// //         <button
// //           onClick={toggleDarkMode}
// //           className="p-2 rounded-full hover:bg-purple-700 transition-colors"
// //         >
// //           {darkMode ? <Sun size={24} /> : <Moon size={24} />}
// //         </button>
// //       </div>
// //     </div>
// //   </nav>
// // );
// // export default NavBar;
// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import { Sun, Moon } from "lucide-react";
// // const NavBar = ({ darkMode, toggleDarkMode }) => (
// //   <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
// //     <div className="container mx-auto px-6 py-3 flex justify-between items-center">
// //       <div className="flex items-center">
// //         <NavLink to="/" className="text-2xl font-bold">
// //           My Portfolio
// //         </NavLink>
// //       </div>
// //       <div className="flex items-center space-x-4">
// //         <NavLink
// //           to="/about"
// //           className="hover:text-purple-200 transition-colors"
// //           activeClassName="text-purple-200"
// //         >
// //           About
// //         </NavLink>
// //         <NavLink
// //           to="/blog"
// //           className="hover:text-purple-200 transition-colors"
// //           activeClassName="text-purple-200"
// //         >
// //           Blog
// //         </NavLink>
// //         <button
// //           onClick={toggleDarkMode}
// //           className="p-2 rounded-full hover:bg-purple-700 transition-colors"
// //         >
// //           {darkMode ? <Sun size={24} /> : <Moon size={24} />}
// //         </button>
// //       </div>
// //     </div>
// //   </nav>
// // );
// // export default NavBar;
/**
 * <ul className="list-disc list-inside mb-2 text-xs leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500">
        <h3 className="text-xs font-medium mb-2 mt-4 text-purple-600 dark:text-purple-400">
 */
