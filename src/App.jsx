import { useEffect, useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const userNameFinder = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/search/commits?q=author:${userName}&per_page=1&sort=author-date&order=desc`
    );
    const data = await response.json();
    const email = data?.items?.[0]?.commit?.author?.email || "Not Found";
    setLoading(false);
    setUserEmail(email);
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-4 text-indigo-300">
        Github User Email Finder
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          userNameFinder();
        }}
      >
        <div className="flex flex-col justify-center mt-5 mx-3 sm:mx-auto sm:w-1/2">
          <input
            type="search"
            className="border-none rounded-lg text-black p-2 font-mono font-bold "
            placeholder="Github Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 mt-2 rounded-lg w-full m-auto">
            Search Email
          </button>
        </div>
      </form>

      <div className="mt-7 ml-3 sm:m-auto sm:mt-7 sm:w-1/2 ajldfkjaslkdfjl">
        <h1 className="text-2xl font-semibold text-gray-300 mb-2">
          Github User Email:
        </h1>
        <p className="font-bold">
          User Email:{" "}
          {loading ? (
            "Loading..."
          ) : (
            <span
              className={`ml-2 ${userEmail && "bg-yellow-300"}  text-black p-1`}
            >
              {userEmail}
            </span>
          )}
        </p>
      </div>
    </>
  );
}

export default App;
