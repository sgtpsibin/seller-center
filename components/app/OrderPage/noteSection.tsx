import { FunctionComponent } from "react";
import { Card, Button } from "@shopify/polaris";

const NoteSection: FunctionComponent<any> = props => {
  return (
    <Card title="Note" sectioned>
      <p>{props.note || "No notes from customer"}</p>
    </Card>
  );
};
export default NoteSection;
