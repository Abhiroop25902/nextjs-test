import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationBar from "./navigationBar/navigationBar";
import {Providers} from "./providers";
import {ReactNode} from "react";

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
    title: "Home Page",
    description: "Index",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Providers>
            <NavigationBar/>
            {children}
        </Providers>
        </body>
        </html>
    );
}
