type OrderStatusBadgeProps = {
  label: string;
};

export default function OrderStatusBadge({ label }: OrderStatusBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#7A6248]/28 bg-[#7A6248]/10 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#5C4A38]">
      {label}
    </span>
  );
}
