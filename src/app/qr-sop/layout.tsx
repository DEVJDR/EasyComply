import "../(site)/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";

export default function QrSopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Only wrap Navbar with ThemeProvider */}
        <ThemeProvider attribute="class">
          <Navbar />
        </ThemeProvider>

        {/* QR-SOP Page Content */}
        <main className="bg-white text-black dark:bg-white dark:text-black">
          {children}
        </main>
      </body>
    </html>
  );
}
