export const Newsletter = () => {
  return (
    <div
      className="w-full border border-white bg-aqua"
      style={{
        background:
          "linear-gradient(66deg, rgba(53, 252, 255, 0.36) 4.86%, rgba(81, 58, 145, 0.36) 84.35%)",
      }}
    >
      <img
        src="/testimonial-bg.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none "
        aria-hidden="true"
      />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">Newsletter Signup</div>
      </div>
    </div>
  );
};
