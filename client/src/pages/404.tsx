import Link from "next/link";

const notFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-10 mb-4 text-5xl text-gray-800">Page Not Found</h1>
      <Link href="/">
        <a className="px-4 py-2 green button">Home</a>
      </Link>
    </div>
  );
};

export default notFound;
