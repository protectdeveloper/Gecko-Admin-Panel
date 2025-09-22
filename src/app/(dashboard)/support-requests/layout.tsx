export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-1 h-[calc(100vh-105px)]">{children}</div>;
}
