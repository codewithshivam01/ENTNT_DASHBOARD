// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar'; // assume you have this

// export default function Layout() {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Header from './Header';

// export default function Layout() {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// src/components/Layout/Layout.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import NavBar from './NavBar';
// import Sidebar from './Sidebar';

// export default function Layout() {
//   return (
//     <div className="flex flex-col h-screen">
//        <NavBar /> 

//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// src/components/Layout/Layout.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import NavBar from './NavBar';
// import Sidebar from './Sidebar';

// export default function Layout() {
//   return (
//     <div className="flex flex-col h-screen">
//       <NavBar />

//       <div className="flex flex-1 overflow-hidden">
//         {/* <Sidebar /> */}
//         {/* Add pt-16 because navbar height is 4rem (= h-16) */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-6 pt-20">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// src/components/Layout/Layout.jsx
// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}




