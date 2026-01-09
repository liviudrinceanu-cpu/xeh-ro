import { describe, it, expect } from 'vitest'

import { categories, getCategoryBySlug } from '@/data/categories'
import { products, getProductBySlug, getProductsByCategory } from '@/data/products'

describe('data helpers', () => {
  describe('getCategoryBySlug', () => {
    it('returns the correct category for a valid slug', () => {
      const sampleCategory = categories[0]
      const result = getCategoryBySlug(sampleCategory.slug)

      expect(result).toBeDefined()
      expect(result).toEqual(sampleCategory)
    })

    it('returns undefined for an invalid slug', () => {
      const result = getCategoryBySlug('non-existent-slug')

      expect(result).toBeUndefined()
    })
  })

  describe('getProductBySlug', () => {
    it('returns the correct product for a valid slug', () => {
      const sampleProduct = products[0]
      const result = getProductBySlug(sampleProduct.slug)

      expect(result).toBeDefined()
      expect(result).toEqual(sampleProduct)
    })

    it('returns undefined for an invalid slug', () => {
      const result = getProductBySlug('non-existent-slug')

      expect(result).toBeUndefined()
    })
  })

  describe('getProductsByCategory', () => {
    it('returns all products for the given categorySlug', () => {
      // pick a categorySlug present in the dataset
      const categorySlug = products[0].categorySlug
      const expectedProducts = products.filter(
        (product) => product.categorySlug === categorySlug,
      )

      const result = getProductsByCategory(categorySlug)

      expect(result).toEqual(expectedProducts)
    })
  })
})
