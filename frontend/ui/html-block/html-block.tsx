import { FC } from 'react';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

interface IProps {
  className?: string;
  content: string;
}
const REHYPE_PLUGINS = [rehypeRaw];

export const HTMLBlock: FC<IProps> = ({ className = '', content }) => {
  if (className) {
    return (
      <div className={className}>
        <ReactMarkdown rehypePlugins={REHYPE_PLUGINS}>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <ReactMarkdown rehypePlugins={REHYPE_PLUGINS}>{content}</ReactMarkdown>
  );
};
