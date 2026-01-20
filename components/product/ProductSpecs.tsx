import type { ProductSpecification } from '@/types/database'

interface ProductSpecsProps {
  specifications: ProductSpecification[]
}

// Human-readable labels for common spec keys
const specLabels: Record<string, string> = {
  sap_code: 'Cod SAP',
  net_width: 'Lățime netă',
  net_depth: 'Adâncime netă',
  net_height: 'Înălțime netă',
  net_weight: 'Greutate netă',
  gross_width: 'Lățime brută',
  gross_depth: 'Adâncime brută',
  gross_height: 'Înălțime brută',
  gross_weight: 'Greutate brută',
  device_type: 'Tip dispozitiv',
  material: 'Material',
  electric_power: 'Putere electrică',
  voltage: 'Alimentare',
  gas_power: 'Putere gaz',
  capacity: 'Capacitate',
  temperature_range: 'Interval temperatură',
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (specifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nu există specificații disponibile.
      </div>
    )
  }

  const sortedSpecs = [...specifications].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="bg-gray-100 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
        {sortedSpecs.map((spec) => (
          <div key={spec.id} className="flex bg-white p-4">
            <span className="flex-1 text-sm text-gray-500">
              {specLabels[spec.spec_key] || spec.label}
            </span>
            <span className="flex-1 text-sm font-medium text-gray-600">
              {spec.value}
              {spec.unit && ` ${spec.unit}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
