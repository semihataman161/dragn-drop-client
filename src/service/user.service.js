import Api from "./Api";
import { apiUrl } from "@/constants/config";

export async function register(data) {
  const res = await Api({
    method: "POST",
    url: `${apiUrl}/api/user/register`,
    data,
  });
  return res.data;
}

export async function login(data) {
  const res = await Api({
    method: "POST",
    url: `${apiUrl}/api/user/login`,
    data,
  });
  return res.data;
}


