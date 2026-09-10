import React from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { UseTripWeatherReturn, getWeatherDetails, calculateDailySummary } from '../hooks/useTripWeather'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface SubComponentProps {
  weather: UseTripWeatherReturn
}

export function WeatherDatePicker({ weather }: SubComponentProps) {
 const startDateStr = format(weather.range[0].startDate, 'MMM dd')
  const endDateStr = format(weather.range[0].endDate, 'MMM dd')
  const isSingleDay = startDateStr === endDateStr
// Check if a valid, distinct range is selected
  const haseRangeSet = startDateStr &&  startDateStr && !isSingleDay;
 
  const handleDateSelect = (ranges: any) => {
    weather.handleSelect(ranges)
    const selection = ranges.selection || Object.values(ranges)[0]

    if (selection) {
      const { startDate, endDate } = selection
      if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
        weather.setIsOpen(false)
      }
    }
  }

  return (
    <div className='weather-box'>
      {/* 1. Label */}
     
      {/* 2. Text field / Input Trigger */}
          {/* <label className='date-label'  >
              <span>Search the weather in spisific period</span> 
          </label> */}
          <div 
            className='date-text '
            id='date-toggler'
            onClick={() => weather.setIsOpen(!weather.isOpen)}
            role="button"
            tabIndex={0}
          > 
            
            <span  className='inputText' >
              {haseRangeSet ?  `${startDateStr} - ${endDateStr}`
                :"Search the weather in spisific period"}
            </span>
       <div role='icon' className='search-icon'> 
       <svg viewBox="5 0 100 100" width="230" height="200"  className="icon-path cloud-search-path">
          <g strokeLinecap="round" strokeLinejoin="round">
          
                  <path 
                    d="M 22,68 A 18,18 0 0,1 22,32 A 24,24 0 0,1 67,20 A 21,21 0 0,1 88,68 Z" 
                    fill="#BAE6FD" 
                    stroke="#38BDF8" 
                    strokeWidth="4"
                  />

                
                  <g stroke="#0284C7" strokeWidth="4">
        
                  <circle cx="68" cy="64" r="13" fill="#FFFFFF" />
                
                  <line x1="77" y1="73" x2="90" y2="86" />
                </g>
              </g>
            </svg>
      </div>
          </div>
   
      {/* 3. Calendar Popover */}
      {weather.isOpen && (
        <div className='date-popover'>
        <DateRange
            ranges={weather.range}
            onChange={handleDateSelect}
            // minDate={weather.today}
            // maxDate={weather.oneYearFromNow}
            showDateDisplay={false} /* 1. Hides top start & end date display bar */
            showMonthAndYearPickers={true}
            months={1}
            direction="vertical"
            preventSnapRefocus={true}
            // rangeColors={['#ffffff']}
          />
        </div>
      )}
    </div>
  )
}

// 2. Weather Overview Summary (Current Reading or Aggregate Summary)
export function WeatherSummary({ weather }: SubComponentProps) {
  if (weather.loading) return <p style={styles.mutedText}>Fetching weather data...</p>
  if (weather.error) return <p style={styles.errorText}>Error: {weather.error}</p>
  if (!weather.weatherData) return null

  const { weatherData } = weather

  return (
    <div className='weather-container'>
      <h4 >Weather Overview</h4>
      {weatherData.current_weather ? (
        <div >
          <span >
            {getWeatherDetails(weatherData.current_weather.weathercode).icon}
          </span>
          <div>
            <span >{weatherData.current_weather.temperature}°C</span>
            <p >
              {getWeatherDetails(weatherData.current_weather.weathercode).label}
            </p>
          </div>
        </div>
      ) : weatherData.daily ? (
        (() => {
          const summary = calculateDailySummary(weatherData.daily)
          if (!summary) return null

          return (
            <div className='daily-weather' >
              <span >{summary.dominantWeather.icon}</span>
              <div>
                <div >
                  <span >
                    {summary.avgMaxTemp}°C
                    <span > (Avg High)</span>
                  </span>
                  <span>
                    {summary.avgMinTemp}°C <span >(Avg Low)</span>
                  </span>
                </div>
                <p >
                  Predominantly {summary.dominantWeather.label} across {weatherData.daily.time.length} days
                </p>
              </div>
            </div>
          )
        })()
      ) : null}
    </div>
  )
}

// 3. Daily Forecast List
export function DailyCast({ weather }: SubComponentProps) {
  if (!weather.weatherData?.daily) return null

  return (
    <ul className='daily-cast-list' >
      {weather.weatherData.daily.time.map((dateStr: string, index: number) => {
        const code = weather.weatherData?.daily?.weathercode?.[index] ?? -1
        const weatherDetails = getWeatherDetails(code)

        return (
          <li key={dateStr} className="dailyRow">
            <div >
              <span >{weatherDetails.icon}</span>
              <div>
                <span >{dateStr}</span>
                <span >{weatherDetails.label}</span>
              </div>
            </div>

            <div >
              <span>
                High: <strong>{weather.weatherData?.daily?.temperature_2m_max[index]}°C</strong>
              </span>
              <span >
                Low: <strong>{weather.weatherData?.daily?.temperature_2m_min[index]}°C</strong>
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// Combined Styles Object
const styles: Record<string, React.CSSProperties> = {
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column' as const,
  //   gap: '6px',
  //   width: '240px',
  //   fontFamily: 'sans-serif',
  // },
  // label: {
  //   fontSize: '14px',
  //   fontWeight: 500,
  //   color: '#1e293b',
  // },
  // textField: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#e2e8f0',
  //   padding: '8px 12px',
  //   borderRadius: '8px',
  //   cursor: 'pointer',
  //   userSelect: 'none' as const,
  // },
  // inputText: {
  //   fontSize: '14px',
  //   fontWeight: 500,
  //   color: '#0f172a',
  // },
  // calendarIcon: {
  //   color: '#0f172a',
  // },
  // popover: {
  //   // position: 'absolute' as const,
  //   marginTop: '6px',
  //   zIndex: 100,
  //   borderRadius: '16px',
  //   overflow: 'hidden',
  //   boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
  // },
  // pickerContainer: { position: 'relative', display: 'inline-block' },
  // controlsGroup: { display: 'flex', gap: '8px', alignItems: 'center' },
  // triggerBtn: {
   
  //   padding: '10px 16px',
  //   borderRadius: '8px',
  //   border: '1px solid #cbd5e1',
  //   background: '#ffffff',
  //   cursor: 'pointer',
  //   fontWeight: 500,
  //   fontSize: '0.9rem',
  //   display: 'flex',
  //   alignItems: 'center',
  //   gap: '8px',
  //   boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  // },
  // liveBtn: { padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' },
  // popover: {
  //   position: 'absolute',
  //   top: '110%',
  //   left: 0,
  //   zIndex: 50,
  //   background: '#ffffff',
  //   borderRadius: '12px',
  //   padding: '8px',
  //   border: '1px solid #e2e8f0',
  //   boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  //   overflowX: 'auto',
  //   maxWidth: '90vw',
  // },
  // popoverFooter: { outline:'2px solid green', padding: '8px', textAlign: 'right', borderTop: '1px solid #f1f5f9' },
  // doneBtn: { padding: '6px 16px', background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 },
  // card: { marginTop: '1rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' },
  // cardTitle: { margin: '0 0 1rem 0', color: '#1e293b' },
  // currentReading: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  // temp: { fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' },
  // dailyGrid: { display: 'grid', gap: '0.75rem' },
  // dailyRow: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   padding: '0.5rem 0.75rem',
  //   background: '#ffffff',
  //   borderRadius: '6px',
  //   border: '1px solid #cbd5e1',
  //   fontSize: '0.9rem',
  // },
  // mutedText: { color: '#64748b', fontSize: '0.9rem' },
  // errorText: { color: '#ef4444' },
}