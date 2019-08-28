import {Badge} from '@shopify/polaris';

export function paymentStatusBadge(status:string) {
    switch (status) {
        case 'paid':
            return <Badge progress="complete">Paid</Badge>
        case 'pending':
            return <Badge status="warning" progress="incomplete">Pending</Badge>
        case 'partially_paid':
            return <Badge status="attention" progress="partiallyComplete">Partially Paid</Badge>       
            
        default:
            return <Badge status="warning" progress="incomplete">Unpaid</Badge>
    }
}

export function fulfillmentStatusBadge(status:string) {
    switch (status) {
        case 'fulfilled':
            return <Badge progress="complete">Fulfilled</Badge>
        case 'partial':
            return <Badge status="warning" progress="partiallyComplete">Partially fulfilled</Badge>
        default:
            return <Badge status="attention" progress="incomplete">Unfulfilled</Badge>
    }
}