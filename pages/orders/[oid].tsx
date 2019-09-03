import React from 'react';

import ShippingAddressSection from '../../components/app/OrderPage/shippingInformation';
import ContactInformationSection from '../../components/app/OrderPage/contactInformtion';

import {connect} from 'react-redux';

import {
    Page,
    Card,
    Layout,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    TextContainer
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
            }
        },
        loading:true        
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

    render() {
        
        const {id,name,created_at,financial_status,fulfillment_status,shipping_address,billing_address} = this.state.order;
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
            >
                <Layout>
                <Layout.Section>
                    <Card title="Fulfillment Status" sectioned>
                    <p>View a summary of your order.</p>
                    </Card>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card title="Note" sectioned>
                        <p>No notes from customer</p>
                    </Card>
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
        const loadingMarkup = (
                <SkeletonPage primaryAction secondaryActions={2}>
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>
                            <SkeletonBodyText />
                            </Card>
                            <Card sectioned>
                            <TextContainer>
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText />
                            </TextContainer>
                            </Card>
                            <Card sectioned>
                            <TextContainer>
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText />
                            </TextContainer>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card>
                            <Card.Section>
                                <TextContainer>
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2} />
                                </TextContainer>
                            </Card.Section>
                            <Card.Section>
                                <SkeletonBodyText lines={1} />
                            </Card.Section>
                            </Card>
                        </Layout.Section>
                    </Layout>
                </SkeletonPage>
        );
        
        const renderPage = loading ? loadingMarkup : pageMarkup;
        return(
            <AppLayout title={`${name||'__'} - Order Detail`}>
                {renderPage}
            </AppLayout>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addOrder: (orderObject) => {dispatch(addOrder(orderObject))}
    }
}
export default connect(null,mapDispatchToProps)(OrderPage);