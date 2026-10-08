import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatMarkdown({text}: {text: string}) {
  return <div className="chat-markdown">
    <Markdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      allowedElements={['p','strong','em','ul','ol','li','h1','h2','h3','h4','code','pre','blockquote','a','hr','table','thead','tbody','tr','th','td','br','del']}
      components={{
        a: ({children,href}) => href ? <a href={href} target={href.startsWith('mailto:')?undefined:'_blank'} rel="noopener noreferrer">{children}</a> : <span>{children}</span>,
        h1: ({children}) => <h3>{children}</h3>,
        h2: ({children}) => <h3>{children}</h3>,
        table: ({children}) => <div className="chat-table-scroll"><table>{children}</table></div>,
      }}
    >{text}</Markdown>
  </div>;
}
