import { ResourceList, TextStyle, Badge } from "@shopify/polaris";
import { FunctionComponent } from "react";
import { pure } from "recompose";
import {
  paymentStatusBadge,
  fulfillmentStatusBadge
} from "../../../library/generateBadge";

type Props = {
  id: number;
  name: string;
  orders?: any;
  email: any;
  created_at: string;
  customer: any;
  financial_status: string;
  fulfillment_status: any;
  total_price: string;
  currency: string;
};

const OrderItem: FunctionComponent<Props> = props => {
  const {
    id,
    name,
    email,
    created_at,
    customer,
    financial_status,
    fulfillment_status,
    total_price,
    currency
  } = props;
  // const media = <Avatar customer size="medium" name={name} />;
  const fullDate = new Date(created_at).toLocaleString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
  // const orderDate = fullDate.replace(/GMT.*/, '');

  const paymentStatus = paymentStatusBadge(financial_status);

  const fulfillmentStatus = fulfillmentStatusBadge(fulfillment_status);

  const totalColunm = () => {
    let totalPrice = Number.parseFloat(total_price).toLocaleString();
    switch (currency) {
      case "VND":
        return `${totalPrice}đ`;

      default:
        return totalPrice;
    }
  };
  return (
    <ResourceList.Item
      id={id.toString()}
      // media={media}
      url={`/orders/${id}`}
      accessibilityLabel={`View details for ${name}`}
      persistActions
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mr-3">
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        {fullDate}
        <div>{customer.last_name.concat(" " + customer.first_name)}</div>
        {paymentStatus}
        {fulfillmentStatus}
        {totalColunm()}
      </div>
    </ResourceList.Item>
  );
};
export default pure(OrderItem);
