"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          Please sign in to view your profile.
        </p>
        <button
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300"
          onClick={() => signOut()}
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className=" p-0 flex flex-col items-center justify-center bg-gray-100 min-h-screen overflow-hidden">
      <div className="bg-blue-400 p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="font-bold text-3xl mb-6 text-center text-gray-800">
          Your Profile
        </h1>

        <div className="flex flex-col items-center mb-6">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span className="text-4xl text-gray-600">
                {session.user?.name?.[0] || "U"}
              </span>
            </div>
          )}
          <h2 className="text-2xl font-semibold text-gray-800">
            {session.user?.name || "User"}
          </h2>
          <p className="text-black-600">
            {session.user?.email || "No email provided"}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">
            Account Details
          </h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">User ID:</span>{" "}
              {session.user?.email || "Not available"}
            </li>
            <li>
              <span className="font-medium">Account Type:</span> Standard
            </li>
          </ul>
        </div>

        <button
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
