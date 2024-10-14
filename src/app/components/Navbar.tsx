import Link from "next/link";
import { getServerSession } from "next-auth";

async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="bg-white font-bold text-2xl text-stone-950 overflow-hidden">
      <div className="container mx-auto flex justify-between">
        <Link href="/dashboard/store">
          <h1 className=" text-start">VogueVerse</h1>
        </Link>

        <ul className="flex gap-x-4">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1 text-stone-900">
                <Link href="/about">About</Link>
              </li>
              <li className="bg-white px-3 py-1">
                <Link href="/">Login</Link>
              </li>
              <li className="bg-white px-3 py-1">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
