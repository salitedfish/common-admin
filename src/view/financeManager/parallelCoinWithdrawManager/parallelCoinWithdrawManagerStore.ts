export enum ParallelCoinWithdrawState {
  APPROVIAL_ING,
  APPROVIAL_SUCCESS,
  APPROVIAL_FAILED,
}

export const parallelCoinWithdrawStates = [
  {
    label: "申请中",
    value: ParallelCoinWithdrawState.APPROVIAL_ING,
  },
  {
    label: "审核通过",
    value: ParallelCoinWithdrawState.APPROVIAL_SUCCESS,
  },
  {
    label: "审核不通过",
    value: ParallelCoinWithdrawState.APPROVIAL_FAILED,
  },
];
