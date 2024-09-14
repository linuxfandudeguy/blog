"use client";  // Add this directive at the top to indicate this is a client component

import React, { useEffect } from 'react';
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";

const Page = () => {
  useEffect(() => {
    // Load Prism.js and its CSS from CDN
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js';
    script.async = true;
    script.onload = () => {
      // Once loaded, highlight the code blocks
      (window as any).Prism.highlightAll();
    };
    document.body.appendChild(script);

    // Clean up the link and script on component unmount
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <header>
          <div className="flex items-center justify-between">
            <ModeToggle />
            <nav className="ml-auto text-sm font-medium space-x-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main>
          <h1 className="text-2xl font-bold mb-4">Example Code Block</h1>
          <pre>
            <code className="language-javascript">
              {`
                const greet = () => {
                  console.log("Hello, World!");
                };
              `}
            </code>
          </pre>
        </main>
        {/* CuterCounter Code */}
        <div className="flex justify-center mt-10">
          <a href="https://www.cutercounter.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.cutercounter.com/hits.php?id=hexqdxco&nd=9&style=80" alt="counter for blog" style={{ border: '0' }} />
          </a>
        </div>
        {/* End of CuterCounter Code */}
        <Analytics />
      </div>
    </ThemeProvider>
  );
};

export default Page;
