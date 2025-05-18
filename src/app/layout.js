import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./context";
import Provider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flash Card",
  description: "Learn Fast, Remember Longer!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="bg-cover bg-fixed bg-center bg-no-repeat w-full min-h-screen"
      style={{ backgroundImage: `url('/assets/background.png')` }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <Provider>{children}</Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
