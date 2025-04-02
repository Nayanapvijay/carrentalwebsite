

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "lucide-react"

function DateRangePicker() {
  const [dateRange, setDateRange] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 5))])
  const [startDate, endDate] = dateRange

  return (
    <div className="relative">
      <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update)
            }}
            isClearable={false}
            className="w-full border-0 p-0 focus:outline-none focus:ring-0"
            dateFormat="MMM dd, yyyy"
          />
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker

