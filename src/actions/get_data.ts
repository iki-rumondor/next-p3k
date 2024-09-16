import axios from "axios";
import { redirect } from "next/navigation";
const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default async function get_data(token: string, endpoint: string) {
  try {
    const response = await axios({
      method: "GET",
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status == 401) {
      window.location.href = "/auth/login";
    }
    throw error.response?.data?.message ? error.response.data : error;
  }
}
