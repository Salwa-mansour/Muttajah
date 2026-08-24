import React, { useState, useEffect } from 'react'
import { Country, City, ICountry, ICity } from 'country-state-city'
import { set, unset, FormField } from 'sanity'

export function LocationSelector(props: any) {
  const { value, onChange, schemaType } = props

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')
  const [countries] = useState<ICountry[]>(Country.getAllCountries())
  const [cities, setCities] = useState<ICity[]>([])

  // On component load, set initial cities if a country code is already stored
  useEffect(() => {
    if (value?.countryCode) {
      setSelectedCountryCode(value.countryCode)
      setCities(City.getCitiesOfCountry(value.countryCode) || [])
    }
  }, [value?.countryCode])

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value
    setSelectedCountryCode(code)
    
    if (code) {
      const countryCities = City.getCitiesOfCountry(code) || []
      setCities(countryCities)
    } else {
      setCities([])
      onChange(unset())
    }
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value
    if (!cityName) return

    const cityData = cities.find((c) => c.name === cityName)
    const countryData = countries.find((c) => c.isoCode === selectedCountryCode)

    if (cityData && countryData) {
     const latVal = parseFloat(cityData.latitude ?? '0')
      const lngVal = parseFloat(cityData.longitude ?? '0')
      // Writes object directly to Sanity document state
      onChange(
        set({
          countryName: countryData.name,
          countryCode: selectedCountryCode,
          cityName: cityData.name,
          lat: latVal,
          lng: lngVal,
        })
      )
    }
  }

  return (
    <FormField
      title={schemaType.title}
      description={schemaType.description}
      path={props.path}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
        {/* Country Dropdown */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
            Country
          </label>
          <select
            value={selectedCountryCode}
            onChange={handleCountryChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select a country...</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        {selectedCountryCode && (
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
              City
            </label>
            <select
              value={value?.cityName || ''}
              onChange={handleCityChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select a city...</option>
              {cities.map((c, index) => (
                <option key={`${c.name}-${index}`} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Stored Location Readout */}
        {value?.lat && (
          <div style={{ fontSize: '12px', color: '#666', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            Saved Coords: {value.cityName}, {value.countryName} ({value.lat}, {value.lng})
          </div>
        )}
      </div>
    </FormField>
  )
}