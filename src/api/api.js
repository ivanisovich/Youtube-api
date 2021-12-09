import * as axios from "axios";

const KEY = "Your_API_key";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: KEY,
    type: "video",
  },
});

export const YouTubeAPI = {
  async getVideo(requestText, maxResults, order) {
    let response = await instance.get("/search", {
      params: {
        q: requestText,
        maxResults: maxResults,
        order: order,
      },
    });
    return response.data;
  },
};
