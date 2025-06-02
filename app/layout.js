import "./globals.css";


export const metadata = {
  title: "Wallpapers Empire",
  description: "Explore a world of beautiful visuals—from nature to digital art—refreshed every time you scroll. Unique, high-quality wallpapers that inspire and transform your screen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='p-0 m-0'>
        {children}
      </body>
    </html>
  );
}
