import { LazyLoadImage } from "react-lazy-load-image-component";
import { imageUrl } from "../../data/Provider";
import { removeDuplicates } from "../../utils/helpers";

const Providers = ({ results }) => {
  const getProviders = () => {
    const providersArray = [];
    const countries = Object.keys(results).slice(0, 5);
    countries?.map((country) => {
      const keys = Object.keys(results[country]).slice(1);
      keys.map((key) => {
        results[country][key].map((item) => {
          providersArray.push(item);
        });
      });
    });
    return removeDuplicates(providersArray);
  };
  const providers = getProviders();
  if (Object.keys(results) < 1) return;
  return (
    <div>
      <h1 className="mb-14 mt-14 text-center text-[26px] font-medium">
        Providers
      </h1>
      <div className="flex-center mb-32 flex-wrap gap-10">
        {providers &&
          providers.map((provider) => (
            <LazyLoadImage
              src={imageUrl + "/w154" + provider.logo_path}
              width={70}
              height={70}
              alt={provider.provider_name}
              key={provider.provider_name}
              effect="blur"
              className="rounded-2xl border-2 border-gray-300"
            />
          ))}
        {!providers && <h1>No Providers to show...</h1>}
      </div>
    </div>
  );
};

export default Providers;
