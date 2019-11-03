import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useMutation } from "@apollo/react-hooks";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { listDashboardItems } from "../graphql/queries";
import { updateDashboardItem } from "../graphql/mutations";
import gql from "graphql-tag";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard = ({ children, dashboardItems }) => {
  const [updateItem] = useMutation(gql(updateDashboardItem), {
    refetchQueries: [
      {
        query: gql(listDashboardItems)
      }
    ]
  });

  const onLayoutChange = newLayout => {
    newLayout.forEach(l => {
      const item = dashboardItems.find(i => i.id.toString() === l.i);
      const toUpdate = JSON.stringify({
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h
      });

      if (item && toUpdate !== item.layout) {
        updateItem({
          variables: {
            input: {
              id: item.id,
              layout: toUpdate
            }
          }
        });
      }
    });
  };

  return (
    <ReactGridLayout cols={12} rowHeight={50} onLayoutChange={onLayoutChange}>
      {children}
    </ReactGridLayout>
  );
};

export default Dashboard;
