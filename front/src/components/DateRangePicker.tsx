import { useState } from 'react'
import { DateRange, RangeKeyDict } from 'react-date-range'
import { format } from 'date-fns'

// Import required default styles for react-date-range
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export interface DateRangeSelection {
  startDate: Date
  endDate: Date
  isLiveForecast: boolean
}

interface DateRangePickerProps {
  onRangeChange: (selection: DateRangeSelection) => void
}

export default function DateRangePicker({ onRangeChange }: DateRangePickerProps) {
  const today = new Date()
  const [isOpen, setIsOpen] = useState(false)

  // Internal state for the selected date range
  const [range, setRange] = useState([
    {
      startDate: today,
      endDate: today,
      key: 'selection',
    },
  ])

  // Helper to determine if selected range is today (Live Forecast mode)
  const isTodaySelected = (start: Date, end: Date) => {
    const todayStr = format(today, 'yyyy-MM-dd')
    return format(start, 'yyyy-MM-dd') === todayStr && format(end, 'yyyy-MM-dd') === todayStr
  }

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection
    const startDate = selection.startDate || today
    const endDate = selection.endDate || today

    setRange([
      {
        startDate,
        endDate,
        key: 'selection',
      },
    ])

    // Emit selection up to parent component
    onRangeChange({
      startDate,
      endDate,
      isLiveForecast: isTodaySelected(startDate, endDate),
    })
  }

  const handleResetToToday = () => {
    setRange([
      {
        startDate: today,
        endDate: today,
        key: 'selection',
      },
    ])
    onRangeChange({
      startDate: today,
      endDate: today,
      isLiveForecast: true,
    })
    setIsOpen(false)
  }

  const startDateStr = format(range[0].startDate, 'MMM dd, yyyy')
  const endDateStr = format(range[0].endDate, 'MMM dd, yyyy')
  const isSingleDay = startDateStr === endDateStr

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Button */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
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
          }}
        >
          📅 {isSingleDay ? startDateStr : `${startDateStr} — ${endDateStr}`}
        </button>

        {/* Quick button to jump back to current weather */}
        <button
          type="button"
          onClick={handleResetToToday}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: 'none',
            background: isTodaySelected(range[0].startDate, range[0].endDate) ? '#dbeafe' : '#f1f5f9',
            color: isTodaySelected(range[0].startDate, range[0].endDate) ? '#1d4ed8' : '#475569',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Live Weather
        </button>
      </div>

      {/* Popover Calendar */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            zIndex: 50,
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            padding: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <DateRange
            ranges={range}
            onChange={handleSelect}
            maxDate={today} // Prevents selecting future dates for historical archives
            months={1}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
          />
          <div style={{ padding: '8px', textAlign: 'right', borderTop: '1px solid #f1f5f9' }}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                padding: '6px 16px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}