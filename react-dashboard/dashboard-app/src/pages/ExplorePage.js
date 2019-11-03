import React, { useState } from "react";
import { Alert, Button, Spin } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import ExploreQueryBuilder from "../components/QueryBuilder/ExploreQueryBuilder";
import { listDashboardItems, getDashboardItem } from "../graphql/queries";
import TitleModal from "../components/TitleModal.js";

import { isQueryPresent } from "@cubejs-client/react";
import PageHeader from "../components/PageHeader";
import ExploreTitle from "../components/ExploreTitle";

import gql from "graphql-tag";

const ExplorePage = withRouter(({ history, location }) => {
  const [addingToDashboard, setAddingToDashboard] = useState(false);
  const params = new URLSearchParams(location.search);
  const itemId = params.get("itemId");
  console.log(itemId);

  const { loading, error, data } = useQuery(gql(getDashboardItem), {
    variables: {
      id: itemId
    }
  });

  const [vizState, setVizState] = useState(null);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [title, setTitle] = useState(null);

  const finalVizState =
    vizState ||
    (itemId &&
      !loading &&
      data &&
      JSON.parse(data.getDashboardItem.vizState)) ||
    {};

  const finalTitle =
    title != null
      ? title
      : (itemId && !loading && data && data.getDashboardItem.name) ||
        "New Chart";

  if (loading) {
    return <Spin />;
  }

  if (itemId && error) {
    return <Alert type='error' message={error.toString()} />;
  }

  return (
    <div>
      <TitleModal
        history={history}
        itemId={itemId}
        titleModalVisible={titleModalVisible}
        setTitleModalVisible={setTitleModalVisible}
        setAddingToDashboard={setAddingToDashboard}
        finalVizState={finalVizState}
        setTitle={setTitle}
        finalTitle={finalTitle}
      />
      <PageHeader
        title={<ExploreTitle itemTitle={finalTitle} />}
        button={
          <Button
            key='button'
            type='primary'
            loading={addingToDashboard}
            disabled={!isQueryPresent(finalVizState.query || {})}
            onClick={() => setTitleModalVisible(true)}
          >
            {itemId ? "Update" : "Add to Dashboard"}
          </Button>
        }
      />
      <ExploreQueryBuilder vizState={finalVizState} setVizState={setVizState} />
    </div>
  );
});
export default ExplorePage;
