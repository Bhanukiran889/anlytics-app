import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {startDate && endDate
            ? `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`
            : "Pick a date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col gap-2 p-2">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
          />
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
