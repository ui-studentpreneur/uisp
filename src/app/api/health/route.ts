import { clientEnv } from "@/config";

/** Liveness probe. Route Handlers are uncached by default in Next 16. */
export async function GET() {
  return Response.json({
    status: "ok",
    environment: clientEnv.nodeEnv,
    timestamp: new Date().toISOString(),
  });
}
