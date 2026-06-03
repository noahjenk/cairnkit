import type { HTMLAttributes, ReactNode } from 'react';

type PanelProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  summary?: string;
  children: ReactNode;
};

export function Panel({ children, className = '', summary, title, ...props }: PanelProps) {
  return (
    <section className={`ui-panel ${className}`.trim()} {...props}>
      {(title || summary) && (
        <div className="ui-panel__header">
          {title && <h2 className="ui-panel__title">{title}</h2>}
          {summary && <p className="ui-panel__summary">{summary}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
