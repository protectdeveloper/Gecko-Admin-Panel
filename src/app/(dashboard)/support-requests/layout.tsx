export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 h-[calc(100vh-105px)]">{children}</div>;
}
