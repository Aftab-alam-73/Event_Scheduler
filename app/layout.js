import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./provider";
import CreateEventDrawer from "@/components/create-event";
const inter = Inter({ subsets: ["latin"] })

export const metaData = {
  title: "My Schedulerr",
  description: "Event Scheduling App"

}
export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={`${inter ? inter.className : sans} antialiased`}
      >

        <Providers>

          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

            {children}
          </main>
          <footer className="p-12 bg-blue-100">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>&copy;2024. All rights reserved.</p>
            </div>
          </footer>
          <CreateEventDrawer/>
        </Providers>
      </body>
    </html>

  );
}
