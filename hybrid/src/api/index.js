import Http from "@/common/http/index.js";

export const AjaxTestData = (params) =>
  Http.get("/", params, {
    isLoading: true,
  });
