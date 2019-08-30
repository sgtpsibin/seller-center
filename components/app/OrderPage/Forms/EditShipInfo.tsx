import React from 'react';
import { Form, FormLayout,TextField } from '@shopify/polaris';

type Props = {
    last_name?:string,
    first_name?:string,
    phone?:string,
    province?:string,
    city?:string,
    address1?:string,
    zip?:string,
    company:string
}

class EditShipInfoForm extends React.PureComponent<Props>{
    state= {
        last_name:'',
        first_name:'',
        phone:'',
        province:'',
        city:'',
        address1:'',
        zip:'',
        company:''
    }
    componentDidMount() {
        const {last_name,first_name,phone,province,city,address1,zip,company} = this.props
        this.setState({
            last_name,
            first_name,
            phone,
            province,
            city,
            address1,
            zip,
            company
        });
    }
    handleChange = feild => value =>{
        this.setState({
            [feild]:value
        });
    }
    render() {
        const {last_name,first_name,phone,province,city,address1,zip,company} = this.state;
        return(
            <Form onSubmit={()=>{}}>
                <FormLayout>
                    <FormLayout.Group>
                        <TextField name="last_name"  value={last_name} label="Họ" onChange={this.handleChange('last_name')} />
                        <TextField name="first_name" type="text" value={first_name} label="Tên" onChange={this.handleChange('first_name')} />
                    </FormLayout.Group>
                    <FormLayout.Group>
                        <TextField  type="text" value={company} label="Công ty" onChange={this.handleChange('company')}/>
                        <TextField name="phone" type="text" value={phone} label="Số điện thoại" onChange={this.handleChange('phone')} />
                    </FormLayout.Group>
                    <FormLayout.Group>
                        <TextField name="province" type="text" value={province} label="Tỉnh" onChange={this.handleChange('province')} />
                        <TextField name="zip" type="text" value={zip} label="Zip/Postal code" onChange={this.handleChange('zip')} />
                    </FormLayout.Group>
                    <FormLayout.Group>
                        <TextField name="city" type="text" value={city} label="Thành phố" onChange={this.handleChange('city')} />
                        <TextField name="address1" type="text" value={address1} label="Địa chỉ giao hàng" onChange={this.handleChange('address1')} />
                    </FormLayout.Group>
                    
                </FormLayout>
            </Form>
        );
    }

}
export default EditShipInfoForm;