import { ImageResponse } from "next/og";

export const alt =
  "Science Lab Tools — accurate calculators and practical science resources";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "76px 82px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f0fdfa 54%, #ccfbf1 100%)",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(15, 118, 110, 0.10)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 70,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 710,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: 30,
                color: "#115e59",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Practical science made clear
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: -3,
              }}
            >
              Science Lab Tools
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                color: "#475569",
                fontSize: 32,
                lineHeight: 1.35,
              }}
            >
              Accurate calculators, laboratory templates, worksheets,
              and step-by-step learning resources.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 38,
                color: "#0f766e",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Physics • Chemistry • Laboratory
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 280,
              height: 280,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 64,
              background: "#0f766e",
              boxShadow: "0 30px 70px rgba(15, 23, 42, 0.18)",
            }}
          >
            <svg
              width="208"
              height="208"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                d="M190 96h132M222 96v112L125 377c-12 21 3 47 27 47h208c24 0 39-26 27-47l-97-169V96"
                fill="none"
                stroke="#ffffff"
                strokeWidth="32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M166 330h180"
                fill="none"
                stroke="#ffffff"
                strokeWidth="30"
                strokeLinecap="round"
              />
              <circle cx="218" cy="277" r="20" fill="#f59e0b" />
              <circle cx="297" cy="366" r="20" fill="#f59e0b" />
            </svg>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
