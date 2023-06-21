import Api from "./Api";
import { apiUrl } from "@/constants/config";

export async function getWebsitesByUserId(userId) {
  const res = await Api({
    method: "GET",
    url: `${apiUrl}/api/website/getWebsitesByUserId/${userId}`,
  });
  return res.data;
}

export async function createWebsite(data) {
  const res = await Api({
    method: "POST",
    url: `${apiUrl}/api/website/createWebsite`,
    data,
  });
  return res.data;
}
