import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import FilterSidebar from '../FilterSidebar'
import type { ProductFilters } from '../../types'

describe('FilterSidebar', () => {
  const mockOnFilterChange = vi.fn()
  const defaultFilters: ProductFilters = {}

  it('renders all filter sections', () => {
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    expect(screen.getByText('Gender')).toBeInTheDocument()
    expect(screen.getByText('Kids')).toBeInTheDocument()
    expect(screen.getByText('Shop By Price')).toBeInTheDocument()
    expect(screen.getByText('Sports')).toBeInTheDocument()
  })

  it('renders quick filters', () => {
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    expect(screen.getByText('Low Top')).toBeInTheDocument()
    expect(screen.getByText('High Top')).toBeInTheDocument()
    expect(screen.getByText('Skateboarding')).toBeInTheDocument()
    expect(screen.getByText('Nike By You')).toBeInTheDocument()
  })

  it('calls onFilterChange when quick filter is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    await user.click(screen.getByText('Low Top'))
    expect(mockOnFilterChange).toHaveBeenCalledWith('shoeHeight', 'Low Top')
    
    await user.click(screen.getByText('Skateboarding'))
    expect(mockOnFilterChange).toHaveBeenCalledWith('sport', 'Skateboarding')
    
    await user.click(screen.getByText('Nike By You'))
    expect(mockOnFilterChange).toHaveBeenCalledWith('category', 'Nike By You')
  })

  it('toggles section visibility when section header is clicked', async () => {
    const user = userEvent.setup()
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    // Gender section should be visible by default
    expect(screen.getByLabelText('Men')).toBeInTheDocument()
    
    // Click to collapse
    const genderButton = screen.getByText('Gender').closest('button')
    if (genderButton) {
      await user.click(genderButton)
      expect(screen.queryByLabelText('Men')).not.toBeInTheDocument()
    }
  })

  it('displays checked state for gender filter', () => {
    const filters: ProductFilters = { gender: 'Men' }
    render(<FilterSidebar filters={filters} onFilterChange={mockOnFilterChange} />)
    
    const menCheckbox = screen.getByLabelText('Men') as HTMLInputElement
    expect(menCheckbox.checked).toBe(true)
    
    const womenCheckbox = screen.getByLabelText('Women') as HTMLInputElement
    expect(womenCheckbox.checked).toBe(false)
  })

  it('calls onFilterChange when gender checkbox is checked', async () => {
    const user = userEvent.setup()
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    const menCheckbox = screen.getByLabelText('Men')
    await user.click(menCheckbox)
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('gender', 'Men')
  })

  it('calls onFilterChange with undefined when gender checkbox is unchecked', async () => {
    const user = userEvent.setup()
    const filters: ProductFilters = { gender: 'Men' }
    render(<FilterSidebar filters={filters} onFilterChange={mockOnFilterChange} />)
    
    const menCheckbox = screen.getByLabelText('Men')
    await user.click(menCheckbox)
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('gender', undefined)
  })

  it('displays checked state for price range filter', () => {
    const filters: ProductFilters = { minPrice: 25, maxPrice: 50 }
    render(<FilterSidebar filters={filters} onFilterChange={mockOnFilterChange} />)
    
    const priceCheckbox = screen.getByLabelText('$25 - $50') as HTMLInputElement
    expect(priceCheckbox.checked).toBe(true)
  })

  it('calls onFilterChange with price range when price checkbox is checked', async () => {
    const user = userEvent.setup()
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    const priceCheckbox = screen.getByLabelText('$25 - $50')
    await user.click(priceCheckbox)
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('minPrice', 25)
    expect(mockOnFilterChange).toHaveBeenCalledWith('maxPrice', 50)
  })

  it('displays checked state for sport filter', () => {
    const filters: ProductFilters = { sport: 'Lifestyle' }
    render(<FilterSidebar filters={filters} onFilterChange={mockOnFilterChange} />)
    
    const lifestyleCheckbox = screen.getByLabelText('Lifestyle') as HTMLInputElement
    expect(lifestyleCheckbox.checked).toBe(true)
  })

  it('calls onFilterChange when sport checkbox is checked', async () => {
    const user = userEvent.setup()
    render(<FilterSidebar filters={defaultFilters} onFilterChange={mockOnFilterChange} />)
    
    const lifestyleCheckbox = screen.getByLabelText('Lifestyle')
    await user.click(lifestyleCheckbox)
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('sport', 'Lifestyle')
  })
})

