import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";


interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: any;
  node?: any;
  style?: any;
}
interface ImageProps extends React.HTMLAttributes<HTMLElement> {
  src?: any; 
  alt?: any;
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <div className="max-w-[700px] mx-auto text-left">
        <ReactMarkdown
          className="prose prose-lg"
          components={{
            code({ node, inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} text-red-600`} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold mb-4 text-blue-600">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold mb-3 text-purple-600">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-bold mb-2 text-green-600">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-xl font-bold mb-2 text-yellow-600">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-lg font-bold mb-1 text-orange-600">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-base font-bold mb-1 text-red-600">
                {children}
              </h6>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-gray-800">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-4">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-2">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 bg-gray-100 py-2">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <table className="table-auto border-collapse mb-4">
                {children}
              </table>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-200">{children}</thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => (
              <th className="border px-4 py-2 text-left">{children}</th>
            ),
            td: ({ children }) => (
              <td className="border px-4 py-2">{children}</td>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-blue-600 underline">
                {children}
              </a>
            ),
            img: ({ src, alt }: ImageProps) => (
              <Image src={src} alt={alt} className="mx-auto my-4" />
            ),
            hr: () => <hr className="my-8 border-t border-gray-300" />,
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
    </main>
  );
}
