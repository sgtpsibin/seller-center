import React from 'react';
import { paymentStatusBadge,fulfillmentStatusBadge } from '../../library/generateBadge';

export const TitleMetadata = (props) => {
    const fullDate = new Date(props.created_at);
    console.log(fullDate.toLocaleDateString());
    const orderDate = fullDate.toLocaleString();
    return(
        <>
            {orderDate}
            {paymentStatusBadge(props.financial_status)}
            {fulfillmentStatusBadge(props.fulfillment_status)}

        </>
    );
}