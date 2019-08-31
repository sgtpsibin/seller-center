import React from 'react';
import {Modal,Card} from '@shopify/polaris';
import EditShipInfoForm from './Forms/EditShipInfo';

type Props = {
  name?:string,
  address1?:string,
  first_name:string,
  last_name:string,
  address2?:string,
  zip?:string,
  phone?:string,
  province?:string,
  city?:string,
  company?:string,
}

class ShippingAddressSection extends React.Component<Props,{active:boolean}> {
  state = {
    active: false,
  };
  

  render() {
    const {active} = this.state;
    const { name,address1,address2,first_name,last_name,zip,province,city,phone,company} = this.props;
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
            <EditShipInfoForm
              address1={address1}
              city={city}
              province={province}
              zip={zip}
              first_name={first_name}
              last_name={last_name} 
              phone={phone}  
              company={company}
              // onSubmit={(shipInfo)=>this.submitChange(shipInfo)}
                     
            />
          </Modal.Section>
        </Modal>
      </div>
    );
    const shipInfo = (
      <div className="text-muted">
        <p className="my-0">{name}</p>
        <p className="my-0">{first_name+' '+last_name}</p>
        <p className="my-0">{city+' '+province+' '+zip}</p>
        <p className="my-0">{address1}</p>
        <p className="my-0">{phone}</p>
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
