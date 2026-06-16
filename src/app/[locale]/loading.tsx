export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center" role="status" aria-label="Loading">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
      </div>
    </main>
  );
}
