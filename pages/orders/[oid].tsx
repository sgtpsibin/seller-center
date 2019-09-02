import React from 'react';

import ShippingAddressSection from '../../components/app/OrderPage/shippingInformation';
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
                first_name:null,
                last_name:null,
                zip:'',
                province:'',
                city:'',
                phone:'',
                company:''
            }
        },
        loading:true
        
    }
    
    componentDidMount() {
        const altId = window.location.pathname.match(/\d+/g).map(Number).toString();
        const id = this.props.query.id || altId;
        fetchOrderById(id).then(order=>{
            this.props.addOrder(order)
            this.setState({order,loading:false});
            console.log(order);
        });        
    }

    render() {
        
        const {id,name,created_at,financial_status,fulfillment_status,shipping_address} = this.state.order;
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
                        <Card.Section title="contact information" actions={[{content:"Edit"}]}>
                            <p>No contact information</p>
                            <p>No phone number</p>
                        </Card.Section>
                       
                        <ShippingAddressSection
                            name={shipping_address.name||''}
                            address1={shipping_address.address1||''}
                            address2={shipping_address.address2||''}
                            zip={shipping_address.zip||''}
                            first_name={shipping_address.first_name}
                            last_name={shipping_address.last_name}
                            province={shipping_address.province||''}
                            city={shipping_address.city||''}
                            phone={shipping_address.phone}
                            company={shipping_address.company}
                        />                       

                        <Card.Section title="billing address" actions={[{content:"Edit"}]}>
                            <p>No billing address</p>
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