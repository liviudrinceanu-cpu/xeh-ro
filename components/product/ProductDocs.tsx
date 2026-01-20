import { FileText, Download } from 'lucide-react'
import type { ProductDocument } from '@/types/database'

interface ProductDocsProps {
  documents: ProductDocument[]
}

const docTypeLabels: Record<string, string> = {
  manual: 'Manual instrucțiuni',
  datasheet: 'Fișă tehnică',
  declaration: 'Declarație conformitate',
  drawing: 'Desen tehnic',
  brochure: 'Broșură',
  certificate: 'Certificat',
}

const languageLabels: Record<string, string> = {
  ro: 'Română',
  en: 'Engleză',
  de: 'Germană',
  cs: 'Cehă',
}

export default function ProductDocs({ documents }: ProductDocsProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nu există documente disponibile.
      </div>
    )
  }

  // Group documents by type
  const groupedDocs = documents.reduce((acc, doc) => {
    const type = doc.doc_type
    if (!acc[type]) acc[type] = []
    acc[type].push(doc)
    return acc
  }, {} as Record<string, ProductDocument[]>)

  return (
    <div className="space-y-6">
      {Object.entries(groupedDocs).map(([type, docs]) => (
        <div key={type}>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {docTypeLabels[type] || type}
          </h4>
          <div className="space-y-2">
            {docs.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-crimson transition-colors">
                      {doc.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {languageLabels[doc.language] || doc.language}
                    </p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-crimson transition-colors" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
