import Api from "./Api";
import { apiUrl } from "@/constants/config";

export async function getAllReviews() {
  const res = await Api({
    method: "GET",
    url: `${apiUrl}/api/review/getAllReviews`,
  });
  return res.data;
}

export async function createReview(data) {
  const res = await Api({
    method: "POST",
    url: `${apiUrl}/api/review/createReview`,
    data,
  });
  return res.data;
}
