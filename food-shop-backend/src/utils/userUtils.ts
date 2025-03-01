import geoip from "geoip-lite";
import { Request } from "express"

/**
 * Extracts device information from request headers.
 * @param req Express request object
 * @returns Device info object
 */
export const getDeviceInfo = (req:Request) => {
    const userAgent = req.headers["user-agent"] || "";
    return {
        userAgent,
        isMobile: /mobile/i.test(userAgent),
        isTablet: /tablet/i.test(userAgent),
        isDesktop: !/mobile|tablet/i.test(userAgent),
        browser: userAgent.includes("Chrome") ? "Chrome" : "Other",
        platform: userAgent.includes("Windows") ? "Windows" : "Other",
        screenResolution: req.body.screenResolution || "Unknown",
      };
    
}

/**
 * Extracts user's IP address from the request.
 * @param req Express request object
 * @returns IP address string
 */
export const getIpAddress = (req:Request): string => {
    return (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "Unknown";
  };


/**
 * Gets location data from an IP address using geoip-lite.
 * @param ipAddress IP address string
 * @returns Location object
 */
export const getLocationFromIp = (ipAddress: string) => {
    const geo = geoip.lookup(ipAddress) || { city: "", region: "", country: "", postal: "" };
    return {
      city: geo.city || "Unknown",
      region: geo.region || "Unknown",
      country: geo.country || "Unknown",
      postal: "Unknown",
    };
  };