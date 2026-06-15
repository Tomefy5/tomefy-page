type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Prose({ children, className = "" }: ProseProps) {
  return (
    <div
      className={`space-y-4 text-body text-text-secondary [&_p]:text-body [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-accent/30 [&_a]:transition-colors [&_a]:hover:decoration-accent [&_strong]:text-text-primary [&_strong]:font-medium [&_h2]:heading-section [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:heading-card [&_h3]:text-text-primary [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-text-tertiary [&_code]:rounded [&_code]:bg-bg-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:caption [&_code]:font-mono [&_code]:text-accent [&_pre]:rounded-xl [&_pre]:bg-bg-elevated [&_pre]:p-4 [&_pre]:overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
}
