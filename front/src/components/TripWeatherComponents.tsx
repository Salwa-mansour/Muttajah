import React from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { UseTripWeatherReturn, getWeatherDetails, calculateDailySummary } from '../hooks/useTripWeather'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface SubComponentProps {
  weather: UseTripWeatherReturn
}

// 1. Date Picker Control Bar
export function WeatherDatePicker({ weather }: SubComponentProps) {
  const startDateStr = format(weather.range[0].startDate, 'MMM dd, yyyy')
  const endDateStr = format(weather.range[0].endDate, 'MMM dd, yyyy')
  const isSingleDay = startDateStr === endDateStr

  return (
    <div style={styles.pickerContainer}>
      <div style={styles.controlsGroup}>
        <button type="button" onClick={() => weather.setIsOpen(!weather.isOpen)} style={styles.triggerBtn}>
          📅 {isSingleDay ? startDateStr : `${startDateStr} — ${endDateStr}`}
        </button>

        <button
          type="button"
          onClick={weather.handleResetToToday}
          style={{
            ...styles.liveBtn,
            background: weather.isLive ? '#dbeafe' : '#f1f5f9',
            color: weather.isLive ? '#1d4ed8' : '#475569',
          }}
        >
          Live Weather
        </button>
      </div>

      {weather.isOpen && (
        <div style={styles.popover}>
          <DateRange
            ranges={weather.range}
            onChange={weather.handleSelect}
            minDate={weather.today}
            maxDate={weather.oneYearFromNow}
            showMonthAndYearPickers={false}
            months={2}
            direction="horizontal"
            preventSnapRefocus={true}
          />
          <div style={styles.popoverFooter}>
            <button type="button" onClick={() => weather.setIsOpen(false)} style={styles.doneBtn}>
              Done
            </button>
          </div>
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
    <div style={styles.card}>
      <h4 style={styles.cardTitle}>Weather Overview</h4>
      {weatherData.current_weather ? (
        <div style={styles.currentReading}>
          <span style={{ fontSize: '2.5rem' }}>
            {getWeatherDetails(weatherData.current_weather.weathercode).icon}
          </span>
          <div>
            <span style={styles.temp}>{weatherData.current_weather.temperature}°C</span>
            <p style={{ margin: 0, color: '#475569', fontWeight: 500 }}>
              {getWeatherDetails(weatherData.current_weather.weathercode).label}
            </p>
          </div>
        </div>
      ) : weatherData.daily ? (
        (() => {
          const summary = calculateDailySummary(weatherData.daily)
          if (!summary) return null

          return (
            <div style={styles.currentReading}>
              <span style={{ fontSize: '2.5rem' }}>{summary.dominantWeather.icon}</span>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span style={styles.temp}>
                    {summary.avgMaxTemp}°C
                    <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 400 }}> (Avg High)</span>
                  </span>
                  <span style={{ fontSize: '1.1rem', color: '#64748b' }}>
                    {summary.avgMinTemp}°C <span style={{ fontSize: '0.85rem' }}>(Avg Low)</span>
                  </span>
                </div>
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569', fontWeight: 500 }}>
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
    <div style={{ ...styles.dailyGrid, marginTop: '1rem' }}>
      {weather.weatherData.daily.time.map((dateStr: string, index: number) => {
        const code = weather.weatherData?.daily?.weathercode?.[index] ?? -1
        const weatherDetails = getWeatherDetails(code)

        return (
          <div key={dateStr} style={styles.dailyRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>{weatherDetails.icon}</span>
              <div>
                <span style={{ fontWeight: 500, display: 'block' }}>{dateStr}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{weatherDetails.label}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span>
                High: <strong>{weather.weatherData?.daily?.temperature_2m_max[index]}°C</strong>
              </span>
              <span style={{ color: '#64748b', marginLeft: '8px' }}>
                Low: <strong>{weather.weatherData?.daily?.temperature_2m_min[index]}°C</strong>
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Combined Styles Object
const styles: Record<string, React.CSSProperties> = {
  pickerContainer: { position: 'relative', display: 'inline-block' },
  controlsGroup: { display: 'flex', gap: '8px', alignItems: 'center' },
  triggerBtn: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  liveBtn: { padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' },
  popover: {
    position: 'absolute',
    top: '110%',
    left: 0,
    zIndex: 50,
    background: '#ffffff',
    borderRadius: '12px',
    padding: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
    maxWidth: '90vw',
  },
  popoverFooter: { padding: '8px', textAlign: 'right', borderTop: '1px solid #f1f5f9' },
  doneBtn: { padding: '6px 16px', background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 },
  card: { marginTop: '1rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' },
  cardTitle: { margin: '0 0 1rem 0', color: '#1e293b' },
  currentReading: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  temp: { fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' },
  dailyGrid: { display: 'grid', gap: '0.75rem' },
  dailyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0.75rem',
    background: '#ffffff',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
  },
  mutedText: { color: '#64748b', fontSize: '0.9rem' },
  errorText: { color: '#ef4444' },
}