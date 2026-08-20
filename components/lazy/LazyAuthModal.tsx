"use client";

import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/components/AuthModal"), {
  ssr: false,
  loading: () => null,
});

export default AuthModal;
