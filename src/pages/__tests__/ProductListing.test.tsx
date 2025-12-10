import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import ProductListing from '../ProductListing'
import { useProducts } from '../../hooks/useProducts'
import { useSearchParams } from 'react-router'

// Mock the hooks and components
vi.mock('../../hooks/useProducts')
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useSearchParams: vi.fn(),
  }
})
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))
vi.mock('../../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}))

const mockUseSearchParams = useSearchParams as ReturnType<typeof vi.fn>

const mockUseProducts = useProducts as ReturnType<typeof vi.fn>

const mockProducts = {
  products: [
    {
      id: '1',
      name: 'Test Product 1',
      category: 'Shoes',
      price: 99.99,
      description: 'Test description',
      rating: 4.5,
      reviewCount: 10,
      style: 'Test Style',
      badge: 'Best Seller',
      isHighlyRated: true,
      images: [{ id: '1', url: 'test.jpg', isPrimary: true }],
      colors: [{ id: '1', name: 'Black', hexCode: '#000', imageUrl: 'black.jpg' }],
    },
    {
      id: '2',
      name: 'Test Product 2',
      category: 'Shoes',
      price: 149.99,
      description: 'Test description 2',
      rating: 4.0,
      reviewCount: 5,
      style: 'Test Style 2',
      isHighlyRated: false,
      images: [{ id: '2', url: 'test2.jpg', isPrimary: true }],
    },
  ],
  total: 2,
  skip: 0,
  take: 100,
}

describe('ProductListing', () => {
  const mockSetSearchParams = vi.fn()
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseSearchParams.mockReturnValue([mockSearchParams, mockSetSearchParams])
  })

  it('renders loading state initially', () => {
    mockUseProducts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('renders products when data is loaded', async () => {
    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    })
  })

  it('renders error state when there is an error', () => {
    mockUseProducts.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: true,
    })

    render(<ProductListing />)
    expect(screen.getByText('Error loading products')).toBeInTheDocument()
  })

  it('displays product count in header', () => {
    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    expect(screen.getByText(/New \(2\)/)).toBeInTheDocument()
  })

  it('shows no results message when products array is empty', () => {
    mockUseProducts.mockReturnValue({
      data: { products: [], total: 0, skip: 0, take: 100 },
      isLoading: false,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('toggles filter visibility when show/hide filters button is clicked', async () => {
    const user = userEvent.setup()
    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    
    // Filters should be visible by default
    const hideButton = screen.getByText('Hide Filters')
    expect(hideButton).toBeInTheDocument()
    
    await user.click(hideButton)
    
    // After clicking, should show "Show Filters"
    expect(screen.getByText('Show Filters')).toBeInTheDocument()
  })

  it('shows loading overlay when fetching with existing data', () => {
    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isFetching: true,
      isError: false,
    })

    render(<ProductListing />)
    expect(screen.getByText('Updating products...')).toBeInTheDocument()
  })

  it('displays product prices correctly', () => {
    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()
  })

  it('displays product categories', () => {
    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isFetching: false,
      isError: false,
    })

    render(<ProductListing />)
    const categories = screen.getAllByText('Shoes')
    expect(categories.length).toBeGreaterThan(0)
  })
})

