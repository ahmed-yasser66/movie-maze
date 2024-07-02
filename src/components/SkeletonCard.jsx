const SkeletonCard = () => {
  return (
    <div className="movie w-full [padding:20px_20px_0_0] md:w-1/3 lg:[padding:1%_1%_0_0] xl:w-1/4 [@media(min-width:426px)_and_(max-width:767px)]:w-1/2">
      <article className="aspect-[2/3]  w-full animate-pulse rounded-xl bg-[#222] "></article>
    </div>
  );
};

export default SkeletonCard;
