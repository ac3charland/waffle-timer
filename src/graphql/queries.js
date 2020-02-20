/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTimer = `query GetTimer($id: ID!) {
  getTimer(id: $id) {
    id
    name
    startISOString
    endISOString
  }
}
`;
export const listTimers = `query ListTimers(
  $filter: ModelTimerFilterInput
  $limit: Int
  $nextToken: String
) {
  listTimers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      startISOString
      endISOString
    }
    nextToken
  }
}
`;
