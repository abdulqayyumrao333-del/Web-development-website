import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Abdul Qayyum";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0B0F1A 0%, #12172A 100%)",
          color: "#F5F6FA",
        }}
      >
        <div style={{ fontSize: 28, color: "#9AA1B9", fontFamily: "sans-serif" }}>Abdul Qayyum</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 16, fontFamily: "sans-serif" }}>{title}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
