import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Nested Comments Demo",
  description: "nested comments project by TJ Klimoski",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
