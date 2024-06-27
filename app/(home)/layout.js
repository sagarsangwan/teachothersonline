import { Inter } from "next/font/google";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "../globals.css";
import Navbar from "@/components/ui/navbar";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/providers";
import Script from 'next/script'
import ClientProvider from "@/components/providers/ClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Teach others online",
  description: "Get taught or teach",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>

      <body className={inter.className} >
        <SessionProvider>
          <Providers>
            <ClientProvider>
              <main className="container">
                <Navbar />
                {children}
              </main>
              {process.env.NODE_ENV === 'production' &&

                <Script id="clarity"
                  dangerouslySetInnerHTML={{
                    __html: `
        (function(c,l,a,r,i,t,y){
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t=l.createElement(r);
            t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`,
                  }}
                >
                </Script>

              }
            </ClientProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
