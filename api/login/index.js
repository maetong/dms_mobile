import Http from "@/common/http.js";

export const loginHttp = params =>
  Http.post("/api/sysManage/login", params, {
    isLoading: true
  });

export const editPasswordHttp = params =>
  Http.post("/api/sysManage/editPassword", params, {
    isLoading: true
  });
