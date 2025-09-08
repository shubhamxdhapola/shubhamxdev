import { Ovo } from "next/font/google";
import "./globals.css";

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "Shubham Dhapola's Portfolio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white font-Ovo`}
      >
        {children}
      </body>
    </html>
  );
}
