import { Sora, Space_Grotesk } from "next/font/google";

// Initialize the fonts
const soraFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora-variable",
  weight: "variable",
});
const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk-variable",
  weight: "variable",
});

// Metadata object
export const metadata = {
  title: "Q&A Hub",
  description: "Created by sammythedeveloper",
};

// RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${soraFont.variable} ${spaceGroteskFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
