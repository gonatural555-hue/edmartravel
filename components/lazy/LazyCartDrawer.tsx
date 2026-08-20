"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
  loading: () => null,
});

export default CartDrawer;
