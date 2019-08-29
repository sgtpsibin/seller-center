import React from 'react';
import { withRouter } from 'next/router';

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

type Props = {
    router: any,
}
type State = {
    order:any,
    loading:boolean,

}
class OrderPage extends React.PureComponent<Props,State> {
    
    state = {
        order: {
            id:null,
            name:null,
            created_at:null,
            financial_status:null,
            fulfillment_status:null
        },
        loading:true
        
    }
    componentDidMount() {
        const {oid} = this.props.router.query;
        fetchOrderById(oid).then(order=>{
            this.setState({order,loading:false})
            console.log(order);
        });
        
    }

    render() {
        const {id,name,created_at,financial_status,fulfillment_status} = this.state.order;
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
                        <Card.Section title="shipping address" actions={[{content:"Edit"}]}>
                            <p>No shipping address</p>
                        </Card.Section>
                        <Card.Section title="billing address" actions={[{content:"Edit"}]}>
                            <p>No billing address</p>
                        </Card.Section>
                        
                    </Card>
                </Layout.Section>
                </Layout>
            </Page>

        );
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
            <AppLayout title="Order Detail">
                {renderPage}
            </AppLayout>
        );
    }
}
export default withRouter(OrderPage);