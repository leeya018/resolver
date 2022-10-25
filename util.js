const basicUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_REMOTE_URL;

export { basicUrl };
