import { style } from "@vanilla-extract/css";

export const form = style({
  maxWidth: "600px",
  margin: "0 auto",
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "8px 0",
});

export const horizontal = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  gap: "24px",
});

export const label = style({
  fontSize: "14px",
});

export const textfield = style({
  border: "1px solid var(--color-border)",
  padding: "8px",
  borderRadius: "4px",
  lineHeight: "1.5",
  width: "100%",
});

export const textarea = style({
  border: "1px solid var(--color-border)",
  padding: "8px",
  borderRadius: "4px",
  lineHeight: "1.5",
  width: "100%",
});

export const actions = style({
  textAlign: "center",
  marginTop: "40px",
});

export const button = style({
  border: "none",
  backgroundColor: "var(--color-button-primary)",
  padding: "16px 40px",
  fontSize: "16px",
  borderRadius: "4px",
  color: "var(--color-text-unpainted)",
  cursor: "pointer",
});

export const success = style({
  backgroundColor: "var(--color-bg-sub)",
  textAlign: "center",
  padding: "40px",
  borderRadius: "var(--border-radius)",
  "@media": {
    "(max-width: 640px)": {
      textAlign: "left",
    },
  },
});

export const error = style({
  color: "var(--color-text-error)",
  fontSize: "14px",
  marginBottom: "8px",
});
