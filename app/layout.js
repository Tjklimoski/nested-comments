import { Montserrat } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import Nav from "@/components/Nav/Nav";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Nested Comments Demo",
  description: "nested comments project by TJ Klimoski",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="container">
          <CookiesProvider>
            <Nav />
            {children}
          </CookiesProvider>
        </main>
      </body>
    </html>
  );
}
