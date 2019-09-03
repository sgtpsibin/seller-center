import React from 'react';
import {Modal, TextContainer,Card,TextField} from '@shopify/polaris';

import { connect } from 'react-redux';
import EditContactInfoForm from './Forms/EditContactInfo';

class ContactInformationSection extends React.PureComponent<any,any> {
  state = {
    active: false,
    phone:'',
    email:''
  }; 

  static getDerivedStateFromProps(props,state) {
      const {email,phone} = props.order;
      return {
          ...state,
          email,
          phone
      }
  }

  
  render() {
    const {active,email,phone} = this.state;
    const modal = (
        <div>
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Sửa thông tin liên hệ"
          primaryAction={{
            content: 'Save',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <EditContactInfoForm email={email} phone={phone}/>            
          </Modal.Section>
        </Modal>
      </div>
    
      );
    const  contactInfo = (
        
            <div className="text-muted">
                <p className="my-0">{email||'No email address'}</p>
                <p className="my-0">{phone||'No phone number'}</p>
            </div>
        
      );

    return (
        <>
        <Card.Section title="contact information" subdued actions={[{content:"Edit",onAction:this.handleChange}]}>
            {contactInfo}
            {modal}
        </Card.Section>
        </>
      
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
}

const mapStateToProps = state => {
    return {
        order: state.orders.order
    }
}

export default connect(mapStateToProps)(ContactInformationSection);
