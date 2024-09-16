import axios from "axios";
const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default async function post_data(
  token: string,
  endpoint: string,
  method: string,
  data: any = null,
  isForm?: boolean
) {
  let contentType = "application/json";
  if (isForm) {
    contentType = "multipart/form-data";
  }
  try {
    const response = await axios({
      method,
      url: `${baseAPIUrl}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": contentType,
      },
      data: data,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message ? error.response.data : error;
  }
}
