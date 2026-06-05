export interface EventHomeModel {
    id: string
    title: string
    slug: string
    banner: string
    start_datetime: string
    end_datetime: string
    category: string
    excerpt: string
    mode: string
    city: string
    is_paid: boolean
    ticket_price: string
    is_live: boolean
}



export interface EventDetailsModel {
    id: string
    slug: string
    banner: string
    start_datetime: string
    end_datetime: string

}