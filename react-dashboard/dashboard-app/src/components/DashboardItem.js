import React from "react";
import { Card, Menu, Button, Dropdown, Modal } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { listDashboardItems } from "../graphql/queries";
import { deleteDashboardItem } from "../graphql/mutations";
import gql from "graphql-tag";

const DashboardItemDropdown = ({ itemId }) => {
  const [removeDashboardItem] = useMutation(gql(deleteDashboardItem), {
    refetchQueries: [
      {
        query: gql(listDashboardItems)
      }
    ]
  });
  const dashboardItemDropdownMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`/explore?itemId=${itemId}`}>Edit</Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          return Modal.confirm({
            title: "Are you sure you want to delete this item?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",

            onOk() {
              removeDashboardItem({
                variables: {
                  input: { id: itemId }
                }
              });
            }
          });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={dashboardItemDropdownMenu}
      placement='bottomLeft'
      trigger={["click"]}
    >
      <Button shape='circle' icon='menu' />
    </Dropdown>
  );
};

const DashboardItem = ({ itemId, children, title }) => (
  <Card
    title={title}
    style={{
      height: "100%",
      width: "100%"
    }}
    extra={<DashboardItemDropdown itemId={itemId} />}
  >
    {children}
  </Card>
);

export default DashboardItem;
