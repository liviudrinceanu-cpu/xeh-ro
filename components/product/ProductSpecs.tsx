import type { ProductSpecification } from '@/types/database'

interface ProductSpecsProps {
  specifications: ProductSpecification[]
}

// Fallback Romanian labels for common spec keys (used if label_ro is not set)
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
  voltage: 'Tensiune',
  gas_power: 'Putere gaz',
  capacity: 'Capacitate',
  temperature_range: 'Interval temperatură',
  steam_type: 'Tip abur',
  control_type: 'Tip control',
  number_of_gn: 'Număr GN / EN',
  gn_size: 'Dimensiune GN / EN',
  cooking_zones: 'Zone de gătit',
  burners: 'Arzătoare',
  tank_capacity: 'Capacitate rezervor',
  basket_capacity: 'Capacitate coș',
  door_type: 'Tip ușă',
  door_opening: 'Deschidere ușă',
  cooling_type: 'Tip răcire',
  refrigerant: 'Agent frigorific',
  noise_level: 'Nivel zgomot',
  energy_class: 'Clasă energetică',
  energy_consumption: 'Consum energie',
  protection_class: 'Clasă protecție',
  cooking_chamber_volume: 'Volum cameră de gătit',
  number_of_racks: 'Număr rafturi',
  rack_spacing: 'Distanță între rafturi',
  internal_lighting: 'Iluminare internă',
  core_probe: 'Sondă miez',
  steam_generation: 'Generare abur',
  humidity_control: 'Control umiditate',
  advanced_moisture_adjustment: 'Reglare avansată umiditate',
  water_connection: 'Conexiune apă',
  drain_connection: 'Conexiune scurgere',
  ambient_temperature: 'Temperatură ambientală',
  frequency: 'Frecvență',
  connection: 'Conexiune',
  gas_consumption: 'Consum gaz',
  gas_connection: 'Conexiune gaz',
  production_capacity: 'Capacitate producție',
}

// Get Romanian label with fallback hierarchy: label_ro -> specLabels -> original label
function getSpecLabel(spec: ProductSpecification): string {
  // First, try label_ro from database
  if (spec.label_ro) return spec.label_ro
  // Then try our fallback mapping by spec_key
  if (specLabels[spec.spec_key]) return specLabels[spec.spec_key]
  // Finally, return original label
  return spec.label
}

// Get Romanian value with fallback
function getSpecValue(spec: ProductSpecification): string {
  return spec.value_ro || spec.value
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
              {getSpecLabel(spec)}
            </span>
            <span className="flex-1 text-sm font-medium text-gray-600">
              {getSpecValue(spec)}
              {spec.unit && ` ${spec.unit}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
