import React from 'react'

export const RichText: React.FC<{ content: any; className?: string }> = ({
  content,
  className,
}) => {
  if (!content) return null

  // Simple renderer for Lexical JSON
  // If it's the root, we start rendering children
  const renderNodes = (nodes: any[]) => {
    return nodes.map((node, index) => {
      switch (node.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 last:mb-0">
              {renderNodes(node.children || [])}
            </p>
          )
        case 'text':
          let text: React.ReactNode = node.text
          if (node.format & 1) text = <strong key={index}>{text}</strong>
          if (node.format & 2) text = <em key={index}>{text}</em>
          if (node.format & 4) text = <u key={index}>{text}</u>
          if (node.format & 8) text = <del key={index}>{text}</del>
          return text
        case 'quote':
          return (
            <blockquote
              key={index}
              className="border-l-4 border-primary pl-4 italic my-6 text-secondary/60"
            >
              {renderNodes(node.children || [])}
            </blockquote>
          )
        case 'list':
          const Tag = node.tag === 'ol' ? 'ol' : 'ul'
          return (
            <Tag
              key={index}
              className={node.tag === 'ol' ? 'list-decimal ml-6 mb-4' : 'list-disc ml-6 mb-4'}
            >
              {renderNodes(node.children || [])}
            </Tag>
          )
        case 'listitem':
          return <li key={index}>{renderNodes(node.children || [])}</li>
        case 'heading':
          const H = node.tag
          return (
            <H key={index} className="font-bold mb-4 mt-8 first:mt-0">
              {renderNodes(node.children || [])}
            </H>
          )
        case 'link':
          return (
            <a
              key={index}
              href={node.fields?.url || '#'}
              className="text-primary underline hover:text-secondary transition-colors"
              target={node.fields?.newTab ? '_blank' : undefined}
              rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
            >
              {renderNodes(node.children || [])}
            </a>
          )
        default:
          return null
      }
    })
  }

  const rootNodes = content.root?.children || []

  return <div className={className}>{renderNodes(rootNodes)}</div>
}
