type Props = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
};

export default function Float({
  children,
  delay = 0,
  distance = 8,
  duration = 4,
  className = "",
}: Props) {
  return (
    <div
      className={className}
      style={
        {
          "--float-distance": `${distance}px`,
          animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

