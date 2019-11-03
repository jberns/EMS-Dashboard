/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDashboardItem = `query GetDashboardItem($id: ID!) {
  getDashboardItem(id: $id) {
    id
    name
    layout
    vizState
    alarm
    owner
  }
}
`;
export const listDashboardItems = `query ListDashboardItems(
  $filter: ModelDashboardItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listDashboardItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      layout
      vizState
      alarm
      owner
    }
    nextToken
  }
}
`;
