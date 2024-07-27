import React, { useState } from 'react';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Banner from '../../../partials/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div>
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">👋 How we can help you today?</h1>
              </div>
              <h2 className="text-gray-800 dark:text-gray-100 font-bold cbtcb cdiog">Popular Questions</h2>
            </div>
            <hr className="my-4" />

            <article className="border-gray-200 p-4 mb-4">
              <header className="flex items-center mb-2">
                <div className="mr-2">
                  <svg className="text-violet-500" width="16" height="16" viewBox="0 0 16 16">
                    <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z"></path>
                    <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z"></path>
                  </svg>
                </div>
                <h3 className="text-gray-800 dark:text-gray-100 font-bold">How can the widget to my website?</h3>
              </header>
              <div className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </div>
            </article>
            <hr className="my-4" />
            <article className="border-gray-200 p-4 mb-4">
              <header className="flex items-center mb-2">
                <div className="mr-2">
                  <svg className="text-violet-500" width="16" height="16" viewBox="0 0 16 16">
                    <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z"></path>
                    <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z"></path>
                  </svg>
                </div>
                <h3 className="text-gray-800 dark:text-gray-100 font-bold">How can the widget to my website?</h3>
              </header>
              <div className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </div>
            </article>
            <hr className="my-4" />
            <article className="border-gray-200 p-4 mb-4">
              <header className="flex items-center mb-2">
                <div className="mr-2">
                  <svg className="text-violet-500" width="16" height="16" viewBox="0 0 16 16">
                    <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z"></path>
                    <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z"></path>
                  </svg>
                </div>
                <h3 className="text-gray-800 dark:text-gray-100 font-bold">How can the widget to my website?</h3>
              </header>
              <div className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </div>
            </article>
            <hr className="my-4" />
            <article className="border-gray-200 p-4 mb-4">
              <header className="flex items-center mb-2">
                <div className="mr-2">
                  <svg className="text-violet-500" width="16" height="16" viewBox="0 0 16 16">
                    <path className="text-violet-300" d="M4 8H0v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2V8z"></path>
                    <path className="text-violet-500" d="M15 1H7c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H13c1.7 0 3-1.3 3-3V2c0-.6-.4-1-1-1z"></path>
                  </svg>
                </div>
                <h3 className="text-gray-800 dark:text-gray-100 font-bold">How can the widget to my website?</h3>
              </header>
              <div className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </div>
            </article>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
