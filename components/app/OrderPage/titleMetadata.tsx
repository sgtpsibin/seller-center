import React from 'react';
import { paymentStatusBadge,fulfillmentStatusBadge } from '../../library/generateBadge';

export const TitleMetadata = (props) => {
    const fullDate = new Date(props.created_at);
    const orderDate = fullDate.toLocaleString('vi-VN',{weekday:'long',day:'numeric',month:'numeric',year:'numeric',hour:'numeric',minute:'numeric'});
    return(
        <>
            {orderDate}
            {paymentStatusBadge(props.financial_status)}
            {fulfillmentStatusBadge(props.fulfillment_status)}

        </>
    );
}