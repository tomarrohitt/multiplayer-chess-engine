const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;
const API_URL = `${process.env.INTERNAL_API_URL}/api`;
type SmartBody = BodyInit | Record<string, unknown> | null | undefined;

type NextFetchOptions = Omit<RequestInit, "body"> & {
  body?: SmartBody;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  cache?: RequestCache;
};

function normalizeBody(
  body: SmartBody,
  headers: HeadersInit | undefined,
): { body?: BodyInit; headers: Headers } {
  const finalHeaders = new Headers(headers);

  if (
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer)
  ) {
    if (!finalHeaders.has("Content-Type")) {
      finalHeaders.set("Content-Type", "application/json");
    }
    return {
      body: JSON.stringify(body),
      headers: finalHeaders,
    };
  }

  return { body: body as BodyInit | undefined, headers: finalHeaders };
}
export async function baseApi(
  endpoint: string,
  options: NextFetchOptions = {},
) {
  const { body, headers, ...rest } = options;

  const { body: finalBody, headers: finalHeaders } = normalizeBody(
    body,
    headers,
  );
  finalHeaders.set("Origin", ORIGIN_URL!);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    credentials: "omit",
    body: finalBody,
    headers: finalHeaders,
  });

  return res;
}
