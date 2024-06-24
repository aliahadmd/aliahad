import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { format } from "date-fns";

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
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            {post.title}
          </h1>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 mb-8">
            <p>
              Published: {format(new Date(post.createdAt), "MMMM dd, yyyy")}
            </p>
            <span>•</span>
            <p>
              Last Updated: {format(new Date(post.updatedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                code({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: CodeProps) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={`${className} text-pink-600 bg-gray-100 rounded px-1`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">
                    {children}
                  </h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-base font-semibold mb-1 text-gray-700">
                    {children}
                  </h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-sm font-semibold mb-1 text-gray-700">
                    {children}
                  </h6>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 text-gray-700">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="mb-2">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4 bg-blue-50 py-2 text-gray-700">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-gray-200">{children}</tbody>
                ),
                tr: ({ children }) => <tr>{children}</tr>,
                th: ({ children }) => (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {children}
                  </td>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }: ImageProps) => (
                  <Image
                    src={src}
                    alt={alt}
                    className="mx-auto my-4 rounded-lg shadow-md"
                  />
                ),
                hr: () => <hr className="my-8 border-t border-gray-200" />,
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
}
