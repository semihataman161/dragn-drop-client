import Api from "./Api";
import { apiUrl } from "@/constants/config";

export async function getPagesByWebsiteId(websiteId) {
    const res = await Api({
        method: "GET",
        url: `${apiUrl}/api/page/getPagesByWebsiteId/${websiteId}`,
    });
    return res.data;
}

export async function createPage(data) {
    const res = await Api({
        method: "POST",
        url: `${apiUrl}/api/page/createPage`,
        data
    });
    return res.data;
}

export async function deletePage(pageId) {
    const res = await Api({
        method: "DELETE",
        url: `${apiUrl}/api/page/deletePage/${pageId}`,
    });
    return res.data;
}


