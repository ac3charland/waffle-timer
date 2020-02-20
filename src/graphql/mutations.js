/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTimer = `mutation CreateTimer(
  $input: CreateTimerInput!
  $condition: ModelTimerConditionInput
) {
  createTimer(input: $input, condition: $condition) {
    id
    name
    startISOString
    endISOString
  }
}
`;
export const updateTimer = `mutation UpdateTimer(
  $input: UpdateTimerInput!
  $condition: ModelTimerConditionInput
) {
  updateTimer(input: $input, condition: $condition) {
    id
    name
    startISOString
    endISOString
  }
}
`;
export const deleteTimer = `mutation DeleteTimer(
  $input: DeleteTimerInput!
  $condition: ModelTimerConditionInput
) {
  deleteTimer(input: $input, condition: $condition) {
    id
    name
    startISOString
    endISOString
  }
}
`;
