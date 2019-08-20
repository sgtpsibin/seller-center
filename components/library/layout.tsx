import React, {Component} from 'react';
import Head from 'next/head';
import {Frame} from '@shopify/polaris';

import TopBarMenu from '../app/topbar';
import NavigationBar from '../app/navigation';

import '../../static/style/main.scss';

interface LayoutProps {
    title: string

}

class Layout extends Component<LayoutProps> {
    render() {
        return(
            <>
                <Head>
                    <title>{this.props.title||'TTS SELLER CENTER'}</title>                    
                </Head>           
                <Frame>
                <TopBarMenu/>
                <NavigationBar/>                 
                {this.props.children}
                </Frame> 
                
            </>
        );

    }
}
export default Layout;