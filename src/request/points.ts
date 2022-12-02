import { ultraFetch } from "./init";
import type * as RequestParam from "@/request/type/RequestParam";
import type * as RequestReturn from "@/request/type/RequestReturn";

export const getPointsList = (params: RequestParam.GetPointsList): RequestReturn.GetPointsList => {
  return ultraFetch.post({
    URL: "/manager/points/page",
    body: JSON.stringify(params),
  });
};

export const deletePoints = (params: { pointsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/points/delete",
    body: JSON.stringify(params),
  });
};

export const updatePointsAudit = (params: { auditNote?: string; pointsState: number; pointsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/points/audit",
    body: JSON.stringify(params),
  });
};

export const updatePointsState = (params: { auditNote?: string; pointsState: number; pointsId: string }) => {
  return ultraFetch.post({
    URL: "/manager/points/state",
    body: JSON.stringify(params),
  });
};
