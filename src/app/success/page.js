import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Success!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your request has been processed successfully.
        </p>
        <Link
          className="bg-[red] text-white py-2 px-4 rounded inline-block"
          href="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
