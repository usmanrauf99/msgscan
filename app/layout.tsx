import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NavigationBar } from "@/components/navigation-bar";
import { Footer } from "@/components/footer";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Msgscan",
  description: "The Telegraph Network Explorer",
  openGraph: {
    title: "Msgscan",
    description: "The Telegraph Network Explorer",
    url: "https://msgscan.com",
    siteName: "Msgscan",
    images: [
      {
        url: "https://msgscan.com/SEO-Image.jpg",
        width: 1200,
        height: 630,
        alt: "Msgscan preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Msgscan",
    description: "The Telegraph Network Explorer",
    images: ["https://msgscan.com/SEO-Image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          <Toaster richColors />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavigationBar />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
