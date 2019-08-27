import {ResourceList,TextStyle,Avatar,Badge} from '@shopify/polaris';
import { FunctionComponent } from "react";


type Props = {
    id: string,
    name: string,
    orders?: any,
    email:any,
    created_at:string,
    customer:any,
    financial_status:string
}

const OrderItem:FunctionComponent<Props> = (props) => {
    const {id, name, email,created_at,customer,financial_status} = props;
    // const media = <Avatar customer size="medium" name={name} />;
    const fullDate = new Date(created_at).toDateString();
    const orderDate = fullDate.replace(/GMT.*/, '');
    const paymentStatusBadge = () => {
      if(financial_status===null) {
        return <Badge progress="complete">Paid</Badge>
      }
    };
    return (
      <ResourceList.Item
        id={id}
        url={'/'}
        // media={media}
        accessibilityLabel={`View details for ${name}`}
        persistActions
      >
        <div className="row">
          <h3 className="mr-3">
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          {orderDate} 
          {customer.last_name.concat(' '+ customer.first_name)}
          {paymentStatusBadge()}
        </div>
        
      </ResourceList.Item>
    );
}
export default OrderItem;