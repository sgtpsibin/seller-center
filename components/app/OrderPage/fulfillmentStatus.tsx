import { FunctionComponent } from "react";
import { Layout, Card, Avatar } from "@shopify/polaris";
import { connect } from "react-redux";
import { pure } from "recompose";

type Props = {
  fulfillment_status: string;
  line_items: any;
  order: any;
};

const FulfillmentStatusSection: FunctionComponent<Props> = props => {
  const { line_items } = props.order;

  const titleNode = (
    <div className="d-flex align-items-center">
      <Avatar
        source="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/alert-circle-orange-512.png"
        size="small"
      />
      <h3 className="ml-3">Hàng chưa gửi</h3>
    </div>
  );

  const UnfulfillItem = props => <p>{props.title}</p>;

  const renderUnfulfillItem = () =>
    line_items.map(items => {
      if (items.fulfillable_quantity !== 0) {
        return <UnfulfillItem title={items.title} key={items.id} />;
      }
      return "";
    });

  return (
    <Layout.Section>
      <Card title={titleNode} sectioned>
        {renderUnfulfillItem()}
      </Card>
    </Layout.Section>
  );
};

const mapStateToProps = state => {
  return {
    order: state.orders.order
  };
};

export default connect(mapStateToProps)(pure(FulfillmentStatusSection));
