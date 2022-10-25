import Link from "next/link";

export default function MyLink({ location, text }) {
  return (
    <div>
      <div className="text-2xl text-blue-400 underline ">
        <Link href={location}>{text}</Link>
      </div>
    </div>
  );
}
