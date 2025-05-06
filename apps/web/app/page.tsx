import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/option";
import Link from "next/link";

export default async function Home() {
  const sesson = await getServerSession(authOption);
  return (
    <div>
      {
        sesson?.user ? (
          <div>
            {JSON.stringify(sesson)}
            <h1>Welcome {sesson.user.name}</h1>
            <Link href="/api/auth/signout">
              <button>Sign out</button>
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <button>Sign in</button>
          </Link>
        )
      }
    </div>
  );
}
