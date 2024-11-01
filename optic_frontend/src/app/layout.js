import Front from "./main/Front";
import "./globals.css";

// Correcting the metadata object
export const metadata = {
  title: "Optic Scan",
  icons: {
    icon: '/favicon.ico',  // Corrected the path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Correcting the link tag for favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" /> 
        <title>Optic Scan</title>
      </head>
           
      <body>
      <Front /> 
        {children}
      </body>
      
    </html>
  );
}
