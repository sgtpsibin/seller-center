import {ResourceList,TextStyle,Avatar} from '@shopify/polaris';
import { FunctionComponent } from "react";

type Props = {
    id: string,
    url: string,
    name: string,
    location: string,
    latestOrderUrl: any
}

const OrderItem:FunctionComponent<Props> = (props) => {
    const {id, url, name, location, latestOrderUrl} = props;
    const media = <Avatar customer size="medium" name={name} />;
    const shortcutActions = latestOrderUrl
      ? [{content: 'View latest order', url: latestOrderUrl}]
      : null;
    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
}

export default OrderItem;