"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card } from "../../components/ui/Card"
import { Checkbox } from "../../components/ui/Checkbox"
import { Slider } from "../../components/ui/Slider"
import { Select } from "../../components/ui/Select"
import CarList from "../../components/cars/CarList"
import DateRangePicker from "../../components/DateRangePicker"
import { useCars } from "../../hooks/useCars"
import { CAR_CATEGORIES, FUEL_TYPES } from "../../utils/constants"

const CarsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [localFilters, setLocalFilters] = useState({
    category: "",
    priceRange: [0, 300],
    fuelType: [],
    seats: "",
  })

  const { cars, loading, error,  updateFilters, resetFilters } = useCars()

  // Apply filters when search button is clicked
  const applyFilters = () => {
    updateFilters({
      search: searchTerm,
      category: localFilters.category,
      minPrice: localFilters.priceRange[0],
      maxPrice: localFilters.priceRange[1],
      fuelType: localFilters.fuelType.length > 0 ? localFilters.fuelType.join(",") : undefined,
      seats: localFilters.seats,
    })
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("")
    setLocalFilters({
      category: "",
      priceRange: [0, 300],
      fuelType: [],
      seats: "",
    })
    resetFilters()
  }

  // Handle fuel type checkbox changes
  const handleFuelTypeChange = (type) => {
    setLocalFilters((prev) => {
      const newFuelTypes = prev.fuelType.includes(type)
        ? prev.fuelType.filter((t) => t !== type)
        : [...prev.fuelType, type]

      return {
        ...prev,
        fuelType: newFuelTypes,
      }
    })
  }

  return (
   
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Available Cars</h1>
          <p className="text-muted-foreground mt-2">Find your perfect rental from our selection</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                Reset
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Pickup & Return</h4>
              <DateRangePicker className="w-full" />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Price Range</h4>
              <div className="space-y-2">
                <Slider
                  value={localFilters.priceRange}
                  min={0}
                  max={300}
                  step={10}
                  onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, priceRange: value }))}
                />
                <div className="flex justify-between text-sm">
                  <span>${localFilters.priceRange[0]}</span>
                  <span>${localFilters.priceRange[1]}+</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Car Type</h4>
              <Select
                value={localFilters.category}
                onChange={(value) => setLocalFilters((prev) => ({ ...prev, category: value }))}
                options={CAR_CATEGORIES.map((category) => ({ value: category.toLowerCase(), label: category }))}
                placeholder="All Categories"
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Fuel Type</h4>
              <div className="space-y-2">
                {FUEL_TYPES.map((fuel) => (
                  <div key={fuel} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuel-${fuel}`}
                      checked={localFilters.fuelType.includes(fuel.toLowerCase())}
                      onCheckedChange={() => handleFuelTypeChange(fuel.toLowerCase())}
                    />
                    <label
                      htmlFor={`fuel-${fuel}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {fuel}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Passenger Capacity</h4>
              <Select
                value={localFilters.seats}
                onChange={(value) => setLocalFilters((prev) => ({ ...prev, seats: value }))}
                options={[
                  { value: "", label: "Any" },
                  { value: "2", label: "2+ passengers" },
                  { value: "4", label: "4+ passengers" },
                  { value: "5", label: "5+ passengers" },
                  { value: "7", label: "7+ passengers" },
                ]}
                placeholder="Any"
              />
            </div>

            <Button className="w-full" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>

          {/* Car Listings */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  placeholder="Search cars..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <Select
                  className="w-[180px]"
                  options={[
                    { value: "featured", label: "Featured" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "rating", label: "Highest Rated" },
                  ]}
                  placeholder="Sort by: Featured"
                  onChange={(value) => updateFilters({ sort: value })}
                />
              </div>
            </div>

            {/* Mobile Filters */}
            {filterOpen && (
              <Card className="lg:hidden p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setFilterOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Pickup & Return</h4>
                    <DateRangePicker className="w-full" />
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="space-y-2">
                      <Slider
                        value={localFilters.priceRange}
                        min={0}
                        max={300}
                        step={10}
                        onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, priceRange: value }))}
                      />
                      <div className="flex justify-between text-sm">
                        <span>${localFilters.priceRange[0]}</span>
                        <span>${localFilters.priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Car Type</h4>
                    <Select
                      value={localFilters.category}
                      onChange={(value) => setLocalFilters((prev) => ({ ...prev, category: value }))}
                      options={CAR_CATEGORIES.map((category) => ({ value: category.toLowerCase(), label: category }))}
                      placeholder="All Categories"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Fuel Type</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {FUEL_TYPES.map((fuel) => (
                        <div key={fuel} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-fuel-${fuel}`}
                            checked={localFilters.fuelType.includes(fuel.toLowerCase())}
                            onCheckedChange={() => handleFuelTypeChange(fuel.toLowerCase())}
                          />
                          <label htmlFor={`mobile-fuel-${fuel}`} className="text-sm font-medium leading-none">
                            {fuel}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Passenger Capacity</h4>
                    <Select
                      value={localFilters.seats}
                      onChange={(value) => setLocalFilters((prev) => ({ ...prev, seats: value }))}
                      options={[
                        { value: "", label: "Any" },
                        { value: "2", label: "2+ passengers" },
                        { value: "4", label: "4+ passengers" },
                        { value: "5", label: "5+ passengers" },
                        { value: "7", label: "7+ passengers" },
                      ]}
                      placeholder="Any"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" className="flex-1" onClick={handleResetFilters}>
                      Reset
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        applyFilters()
                        setFilterOpen(false)
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Car List */}
            <CarList cars={cars} loading={loading} error={error} />
          </div>
        </div>
      </div>
  
  )
}

export default CarsPage

