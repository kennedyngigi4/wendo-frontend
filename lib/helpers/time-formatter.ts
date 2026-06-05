import dayjs from "dayjs"
import { CONSTANTS } from "../constants/constants"

export function formatEventDate(event: any) {
    const start = dayjs(event.start_datetime)
    const end = event.end_datetime ? dayjs(event.end_datetime) : null

    // Same day event
    if (!end || start.isSame(end, "day")) {
        return start.format("ddd, D MMM YYYY")
    }

    // Same month
    if (start.isSame(end, "month")) {
        return `${start.format("D")} - ${end.format("D MMM YYYY")}`
    }

    // Different months
    return `${start.format("D MMM")} - ${end.format("D MMM YYYY")}`
}


export function formatEventTime(event: any) {
    const start = dayjs(event.start_datetime)
    const end = event.end_datetime ? dayjs(event.end_datetime) : null

    if (!end) {
        return start.format("h:mm A")
    }

    return `${start.format("h:mm A")} - ${end.format("h:mm A")}`
}




export const formatWorkingTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};


export const getDayName = (dayId: number | string) => {
    return CONSTANTS.weekDays.find(
        (day) => Number(day.id) === Number(dayId)
    )?.name;
};


