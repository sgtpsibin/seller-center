import React from 'react';

import ShippingAddressSection from '../../components/app/OrderPage/shippingInformation';
import ContactInformationSection from '../../components/app/OrderPage/contactInformtion';
import FulfillmentStatusSection from '../../components/app/OrderPage/fulfillmentStatus';
import NoteSection from '../../components/app/OrderPage/noteSection';
import loadingMarkup from '../../components/app/OrderPage/loadingMarkup';

import {
    PrintMinor
  } from '@shopify/polaris-icons';

import {connect} from 'react-redux';

import {
    Page,
    Card,
    Layout
  } from "@shopify/polaris";

import { fetchOrderById } from '../../utils/api/orders';
import { TitleMetadata } from '../../components/app/OrderPage/titleMetadata';

import AppLayout from '../../components/library/layout';
import { addOrder } from '../../redux/actions/orders.action';

import Router from 'next/router'

type Props = {
    query:any,
    url:any,
    addOrder:any
}
type State = {
    order:any,
    loading:boolean,
    hasError:boolean

}
class OrderPage extends React.PureComponent<Props,State> {

    static async getInitialProps({query}) {
        return {query}
    }
    
    state = {
        order: {
            id:null,
            name:null,
            created_at:null,
            financial_status:null,
            fulfillment_status:null,
            shipping_address:{
                address1:'',
                address2:null,
                name:null,
                first_name:'',
                last_name:'',
                zip:'',
                province:'',
                city:'',
                phone:'',
                company:''
            },
            billing_address:{
                address1: "",
                address2: '',
                city: "",
                company: '',
                country: "",
                country_code: null,
                created_at: "",
                first_name: "",
                id: null,
                last_name: "",
                latitude: '',
                longitude: '',
                name: '',
                order_id: null,
                phone: "",
                province: "",
                province_code: null,
                shop_id: "",
                updated_at: "",
                zip: ""
            },
            note:null
        },
        loading:true,
        hasError: false     
    }
    
    componentDidMount() {
        const altId = window.location.pathname.match(/\d+/g).map(Number).toString();
        // console.log(Router.pathname);
        const id = this.props.query.id || altId;
        fetchOrderById(id).then(order=>{
            this.props.addOrder(order)
            this.setState({order,loading:false});
            console.log(order);
        });        
    }

    componentDidCatch() {
        this.setState({hasError:true})
    }

    render() {
        
        const {id,name,created_at,financial_status,fulfillment_status,shipping_address,billing_address,note} = this.state.order;
        const { loading } = this.state;
        const pageMarkup = (
            <Page 
                title={name}
                breadcrumbs={[{content:'Orders',url:'/orders'}]}
                titleMetadata= {<TitleMetadata
                                    created_at={created_at}
                                    financial_status={financial_status}
                                    fulfillment_status={fulfillment_status}
                                />} 
                actionGroups={[{actions:[{content:'In',icon:PrintMinor,onAction:()=>window.print()}],title:'Hành động'}]}
            >
                <Layout>

                    <FulfillmentStatusSection fulfillment_status={fulfillment_status}/>

                    <Layout.Section secondary>

                        {/*Notes Section*/ }
                       <NoteSection note={note}/>

                        <Card title="Customer">
                            <Card.Section>
                                <p>No customer</p>
                            </Card.Section>

                            {/* contact infor section */}
                            <ContactInformationSection/>
                        
                            {/* shipping address section */}
                            <ShippingAddressSection />               
                                    
                            <Card.Section title="billing address">
                                <div className="text-muted">
                                    <p className="my-0">{billing_address.first_name+' '+billing_address.last_name}</p>
                                    <p className="my-0">{billing_address.address1||''}</p>
                                    <p className="my-0">{(billing_address.province||'')+' '+(billing_address.zip||'')}</p>
                                </div>
                            </Card.Section>                        
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>

        );
        // console.log(this.state.shipping_address.city);
        
        
        const renderPage = loading ? loadingMarkup : pageMarkup;
        if (this.state.hasError===false) {
            return(               
                    <AppLayout title={`${name||'__'} - Order Detail`}>
                        {renderPage}
                    </AppLayout>                 
            )
        }
        return <h1>Error,we're finxing this problem</h1>
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addOrder: (orderObject) => {dispatch(addOrder(orderObject))}
    }
}
export default connect(null,mapDispatchToProps)(OrderPage);