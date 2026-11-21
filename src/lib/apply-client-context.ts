type EthereumProvider = { isMetaMask?: boolean };

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

function detectOs(userAgent: string): string {
  if (/Windows NT 10/i.test(userAgent)) return "Windows";
  if (/Windows/i.test(userAgent)) return "Windows";
  if (/Mac OS X/i.test(userAgent)) return "macOS";
  if (/Android/i.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
  if (/Linux/i.test(userAgent)) return "Linux";
  return "Unknown";
}

export type ApplyClientMeta = {
  walletInstalled: boolean;
  clientOs: string;
  clientLocation: string;
  clientIp: string | null;
};

/** Browser-side signals collected when a candidate submits an application. */
export async function collectApplyClientMeta(): Promise<ApplyClientMeta> {
  const walletInstalled = typeof window !== "undefined" && Boolean(window.ethereum);
  const clientOs = typeof navigator !== "undefined" ? detectOs(navigator.userAgent) : "Unknown";

  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";
  const locale = typeof navigator !== "undefined" ? navigator.language : "";
  let clientLocation = [tz, locale].filter(Boolean).join(" · ") || "Unknown";
  let clientIp: string | null = null;

  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const geo = (await res.json()) as {
        ip?: string;
        city?: string;
        region?: string;
        country_name?: string;
      };
      if (geo.ip) clientIp = geo.ip;
      const place = [geo.city, geo.region, geo.country_name].filter(Boolean).join(", ");
      if (place) clientLocation = place;
    }
  } catch {
    // Geo lookup is best-effort; timezone/locale still stored.
  }

  return { walletInstalled, clientOs, clientLocation, clientIp };
}