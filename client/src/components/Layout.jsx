import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="d-flex">

        {/* Desktop Sidebar */}

        <div
          className="d-none d-lg-block"
          style={{
            width: "260px",
            flexShrink: 0,
          }}
        >
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Mobile Sidebar */}

        {sidebarOpen && (
          <>
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{
                background: "rgba(0,0,0,0.5)",
                zIndex: 1040,
              }}
              onClick={() => setSidebarOpen(false)}
            ></div>

            <div
              className="position-fixed top-0 start-0 bg-dark"
              style={{
                width: "260px",
                height: "100vh",
                zIndex: 1050,
              }}
            >
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </div>
          </>
        )}

        {/* Main Content */}

        <div
          className="flex-grow-1"
          style={{
            minHeight: "100vh",
            overflowX: "hidden",
          }}
        >
          {children}
        </div>

      </div>
    </>
  );
}

export default Layout;