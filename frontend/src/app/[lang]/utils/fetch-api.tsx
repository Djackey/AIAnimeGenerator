import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Log the request URL and options
    // console.log(`Request URL: ${requestUrl}`);
    // console.log(`Request Options: ${JSON.stringify(mergedOptions)}`);

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Log the response status
    // console.log(`Response Status: ${response.status}`);

    // Parse the response data
    const data = await response.json();

    // Log the response data
    // console.log(`Response Data: ${JSON.stringify(data)}`);

    return data;

  } catch (error) {
    // Ensure error is of type Error
    // if (error instanceof Error) {
    //   console.error(`Error in fetchAPI: ${error.message}`);
    // } else {
    //   console.error(`Error in fetchAPI: ${String(error)}`);
    // }
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
