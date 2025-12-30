import type {
  OrganizationSchema,
  LocalBusinessSchema,
  WebSiteSchema,
  BreadcrumbListSchema,
  ContactPageSchema,
} from '@/lib/structuredData'

type StructuredDataSchema =
  | OrganizationSchema
  | LocalBusinessSchema
  | WebSiteSchema
  | BreadcrumbListSchema
  | ContactPageSchema
  | Record<string, unknown>

interface StructuredDataProps {
  /**
   * Single schema object or array of schema objects to inject as JSON-LD
   */
  data: StructuredDataSchema | StructuredDataSchema[]
}

/**
 * Server component that injects JSON-LD structured data into the page.
 * This helps search engines understand the content and enables rich results.
 *
 * @example
 * ```tsx
 * <StructuredData data={generateOrganizationSchema()} />
 * <StructuredData data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
 * ```
 */
export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  )
}

