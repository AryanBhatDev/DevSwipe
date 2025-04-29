"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div>
      <h1>Sign In</h1>

      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Continue with Google
      </button>

      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Continue with GitHub
      </button>

      <p>
        By signing in, you agree to our{" "}
        <Link href="#">Terms of Service</Link> &{" "}
        <Link href="#">Privacy Policy</Link>
      </p>

      <footer>
        <p>© 2025 devSwipe. All rights reserved.</p>
      </footer>
    </div>
  );
}