import { useRouter } from "next/router";
import { useEffect } from "react";
export default function FourOFour({}) {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return <div></div>;
}
