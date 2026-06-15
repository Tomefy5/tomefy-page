type ContainerProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer";
  className?: string;
};

export default function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
