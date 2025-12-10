import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProducts, useProduct, useRecommendations } from '../useProducts'
import api from '../../lib/api'
import type { ProductFilters } from '../../types'
import type { ReactNode } from 'react'

// Mock the API
vi.mock('../../lib/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockApi = api as unknown as { get: ReturnType<typeof vi.fn> }

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches products with no filters', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        take: 100,
      },
    }

    mockApi.get.mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useProducts({}), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockApi.get).toHaveBeenCalledWith('/products?')
    expect(result.current.data).toEqual(mockResponse.data)
  })

  it('fetches products with filters', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        take: 100,
      },
    }

    mockApi.get.mockResolvedValue(mockResponse)

    const filters: ProductFilters = {
      category: 'Shoes',
      gender: 'Men',
      minPrice: 50,
      maxPrice: 100,
    }

    const { result } = renderHook(() => useProducts(filters), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockApi.get).toHaveBeenCalledWith(
      '/products?category=Shoes&gender=Men&minPrice=50&maxPrice=100'
    )
  })

  it('handles API errors', async () => {
    mockApi.get.mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useProducts({}), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
  })

  it('excludes undefined and empty values from query params', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        take: 100,
      },
    }

    mockApi.get.mockResolvedValue(mockResponse)

    const filters: ProductFilters = {
      category: 'Shoes',
      gender: undefined,
      minPrice: undefined,
    }

    const { result } = renderHook(() => useProducts(filters), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockApi.get).toHaveBeenCalledWith('/products?category=Shoes')
  })
})

describe('useProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches a single product by id', async () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      category: 'Shoes',
      price: 99.99,
      description: 'Test',
      rating: 4.5,
      reviewCount: 10,
      style: 'Test Style',
      isHighlyRated: true,
      images: [],
    }

    mockApi.get.mockResolvedValue({ data: mockProduct })

    const { result } = renderHook(() => useProduct('1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockApi.get).toHaveBeenCalledWith('/products/1')
    expect(result.current.data).toEqual(mockProduct)
  })

  it('does not fetch when id is undefined', () => {
    const { result } = renderHook(() => useProduct(undefined), {
      wrapper: createWrapper(),
    })

    expect(result.current.isFetching).toBe(false)
    expect(mockApi.get).not.toHaveBeenCalled()
  })
})

describe('useRecommendations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches product recommendations', async () => {
    const mockRecommendations = [
      {
        id: '2',
        name: 'Recommended Product',
        category: 'Shoes',
        price: 129.99,
        description: 'Test',
        rating: 4.0,
        reviewCount: 5,
        style: 'Test Style',
        isHighlyRated: false,
        images: [],
      },
    ]

    mockApi.get.mockResolvedValue({ data: mockRecommendations })

    const { result } = renderHook(() => useRecommendations('1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockApi.get).toHaveBeenCalledWith('/products/1/recommendations')
    expect(result.current.data).toEqual(mockRecommendations)
  })

  it('does not fetch when id is undefined', () => {
    const { result } = renderHook(() => useRecommendations(undefined), {
      wrapper: createWrapper(),
    })

    expect(result.current.isFetching).toBe(false)
    expect(mockApi.get).not.toHaveBeenCalled()
  })
})

