import React from 'react';
import { SkeletonBodyText,
         SkeletonDisplayText,
         SkeletonPage,
         TextContainer,
         Layout,
         Card } from '@shopify/polaris';

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

export default loadingMarkup;