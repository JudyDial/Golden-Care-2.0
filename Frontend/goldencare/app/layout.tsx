import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { AlertProvider } from "@/context/alertContext";
import { AppointmentsProvider } from "@/context/appointmentsContext";
import { SensorDataProvider } from "@/context/SensorDataContext";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Silver Watch",
  description: "Digitalized Health Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <AlertProvider>
          <AppointmentsProvider>
            <SensorDataProvider>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                {children}
              </body>
            </SensorDataProvider>
          </AppointmentsProvider>
        </AlertProvider>
      </AuthProvider>
    </html>
  );
}
