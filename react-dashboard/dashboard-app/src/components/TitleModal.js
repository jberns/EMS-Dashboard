import React from "react";
import { Modal, Input } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { listDashboardItems } from "../graphql/queries";
import {
  createDashboardItem,
  updateDashboardItem
} from "../graphql/mutations";

import gql from "graphql-tag";

const TitleModal = ({
  history,
  itemId,
  titleModalVisible,
  setTitleModalVisible,
  setAddingToDashboard,
  finalVizState,
  setTitle,
  finalTitle
}) => {
  const [addItem] = useMutation(gql(createDashboardItem), {
    refetchQueries: [
      {
        query: gql(listDashboardItems)
      }
    ]
  });
  const [updateItem] = useMutation(gql(updateDashboardItem), {
    refetchQueries: [
      {
        query: gql(listDashboardItems)
      }
    ]
  });
  return (
    <Modal
      key="modal"
      title="Save Chart"
      visible={titleModalVisible}
      onOk={async () => {
        setTitleModalVisible(false);
        setAddingToDashboard(true);

        try {
          await (itemId ? updateItem : addItem)({
            variables: {
              input: {
                id: itemId,
                vizState: JSON.stringify(finalVizState),
                name: finalTitle
              }
            }
          });
          history.push("/");
        } finally {
          setAddingToDashboard(false);
        }
      }}
      onCancel={() => setTitleModalVisible(false)}
    >
      <Input
        placeholder="Dashboard Item Name"
        value={finalTitle}
        onChange={e => setTitle(e.target.value)}
      />
    </Modal>
  );
};

export default TitleModal;
