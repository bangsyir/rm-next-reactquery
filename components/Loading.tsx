export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}

const LoadingCard = () => {
  return (
    <div className="bg-neutral-800 shadow rounded-md px-4 py-12 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-neutral-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-neutral-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-neutral-700 rounded col-span-2"></div>
              <div className="h-2 bg-neutral-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
