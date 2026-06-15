type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="flex flex-1 flex-col">
      {children}
    </main>
  );
}
