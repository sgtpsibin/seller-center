import React from "react";
import { Modal, Card } from "@shopify/polaris";
import EditShipInfoForm from "./Forms/EditShipInfo";

import { connect } from "react-redux";

class ShippingAddressSection extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
  }
  state = {
    active: false,
    address1: "",
    address2: "",
    city: "",
    company: "",
    country: "",
    country_code: "",
    created_at: "",
    first_name: "",
    id: null,
    last_name: "",
    latitude: "",
    longitude: "",
    name: "",
    order_id: null,
    phone: "",
    province: "",
    province_code: "",
    shop_id: "",
    updated_at: "",
    zip: ""
  };

  static getDerivedStateFromProps(props, state) {
    const { shipping_address } = props.order;
    return { ...state, ...shipping_address };
  }

  render() {
    const { active } = this.state;
    const {
      name,
      address1,
      first_name,
      last_name,
      zip,
      province,
      city,
      phone,
      company
    } = this.state;
    const modal = (
      <div>
        {/* <Button onClick={this.handleChange}>Open</Button> */}
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Sửa địa chỉ giao hàng"
          primaryAction={{
            content: "Lưu",
            onAction: this.handleChange
          }}
          secondaryActions={[
            {
              content: "Hủy",
              onAction: this.handleChange
            }
          ]}
        >
          <Modal.Section>
            <EditShipInfoForm
              address1={address1}
              city={city}
              province={province}
              zip={zip}
              first_name={first_name}
              last_name={last_name}
              phone={phone}
              company={company}
              // onSubmit={(shipInfo)=>this.submitChange(shipInfo)
            />
          </Modal.Section>
        </Modal>
      </div>
    );
    const shipInfo = (
      <div className="text-muted">
        <p className="my-0">{name}</p>
        <p className="my-0">{first_name + " " + last_name}</p>
        <p className="my-0">{city + " " + province + " " + zip}</p>
        <p className="my-0">{address1}</p>
        <p className="my-0">{phone}</p>
      </div>
    );

    return (
      <Card.Section
        subdued
        title="shipping address"
        actions={[{ content: "Edit", onAction: this.handleChange }]}
      >
        {/* <p>No shipping address</p> */}
        {shipInfo}
        {modal}
      </Card.Section>
    );
  }

  handleChange = () => {
    this.setState(({ active }) => ({ active: !active }));
  };
}
const mapStateToProps = state => {
  return {
    order: state.orders.order
  };
};
export default connect(mapStateToProps)(ShippingAddressSection);
