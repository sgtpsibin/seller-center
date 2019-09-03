import { TextField, Form, FormLayout} from '@shopify/polaris';
import { FunctionComponent,useState, useEffect } from 'react';

const EditContactInfoForm:FunctionComponent<any> = (props) => {

    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    
    useEffect(()=>{
        setEmail(props.email);
        setPhone(props.phone);
    },[props.email,props.phone]);

    return(
        <Form onSubmit={()=>{}}>
            <FormLayout>
                <TextField label="Email" type="email" value={email} onChange={value=>setEmail(value)} />
                <TextField label="Phone Number" type="text" value={phone} onChange={value=>setPhone(value)} />
            </FormLayout>
        </Form>
    );

}

export default EditContactInfoForm;