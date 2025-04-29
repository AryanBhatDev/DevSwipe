import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/option";
import Link from "next/link";

export default async function Home() {
  const sesson = await getServerSession(authOption);
  return (
    <div>
      {JSON.stringify(sesson)}
      <Link href="/api/auth/signin">
      <button>Auth</button>
      </Link>
    </div>
  );
}
