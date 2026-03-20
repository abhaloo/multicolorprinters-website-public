import { PortableText } from "@portabletext/react"
import { urlFor } from "@/lib/sanity"

interface PostBodyProps {
  body: any[]
}

const components = {
  types: {
    image: ({ value }: { value: any }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          className="w-full rounded-xl"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-[family-name:var(--font-heading)] mt-10 mb-4 text-3xl font-bold">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-[family-name:var(--font-heading)] mt-8 mb-3 text-2xl font-bold">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-[family-name:var(--font-heading)] mt-6 mb-2 text-xl font-bold">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-[family-name:var(--font-heading)] mt-4 mb-2 text-lg font-bold">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.href?.startsWith("http") ? "_blank" : undefined}
        rel={value.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-muted-foreground">
        {children}
      </ol>
    ),
  },
}

export function PostBody({ body }: PostBodyProps) {
  return (
    <div className="prose-custom mx-auto max-w-3xl">
      <PortableText value={body} components={components} />
    </div>
  )
}
