import React from 'react';
import {Button, Modal, TextContainer,Card} from '@shopify/polaris';

type Props = {
  name?:string,
  fullname?:string,
  address1?:string,
  address2?:string,
  zip?:string,
  phone?:string
}

class ShippingAddressSection extends React.Component<Props,{active:boolean}> {
  state = {
    active: false,
  };
  

  render() {
    const {active} = this.state;
    const { name,address1,address2,fullname } = this.props;
    console.log(active);
    const modal = (
        <div>
        {/* <Button onClick={this.handleChange}>Open</Button> */}
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Sửa địa chỉ giao hàng"
          primaryAction={{
            content: 'Lưu',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Hủy',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
    const shipInfo = (
      <div className="text-muted">
        <p className="my-0">{name}</p>
        <p className="my-0">{fullname}</p>
        <p className="my-0">{address1}</p>
        <p className="my-0">{address2}</p>
      </div>
    )

    return (
        <Card.Section title="shipping address" actions={[{content:"Edit",onAction:this.handleChange}]}>
            {/* <p>No shipping address</p> */}
            {shipInfo}
            {modal}
        </Card.Section>      
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
  
}

export default ShippingAddressSection;
