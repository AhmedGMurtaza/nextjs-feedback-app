import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function Home() {
  // fetch feedbacks
  const response = await fetch("http://localhost:3000/api/feedbacks", {
    cache: "no-cache",
  });
  const feedbacks = await response.json();

  const submitFeedback = async function (formData) {
    "use server";
    const feedbackInput = formData.get("feedbackInput");
    const ratingInput = formData.get("ratingInput");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase
      .from("feedback")
      .insert({ feedback: feedbackInput, rating: ratingInput })
      .select();
  };

  return (
    <div className="w-full  flex items-center  flex-col">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Your Feedback Matterssss</h2>
          <form action={submitFeedback}>
            <div className="block m-4 flex justify-center wrap">
              <div className="rating rating-lg">
                <input
                  type="radio"
                  name="ratingInput"
                  className="mask mask-star-2 bg-green-500"
                  value="1"
                />
                <input
                  type="radio"
                  name="ratingInput"
                  className="mask mask-star-2 bg-green-500"
                  value="2"
                />
                <input
                  type="radio"
                  name="ratingInput"
                  className="mask mask-star-2 bg-green-500"
                  value="3"
                />
                <input
                  type="radio"
                  name="ratingInput"
                  className="mask mask-star-2 bg-green-500"
                  value="4"
                />
                <input
                  type="radio"
                  name="ratingInput"
                  className="mask mask-star-2 bg-green-500"
                  value="5"
                />
              </div>
            </div>

            <div className="block m-4">
              Feedback:
              <textarea
                name="feedbackInput"
                class="textarea-md w-full max-w-xs textarea-primary"
                placeholder="Type here"
              ></textarea>
            </div>
            <button type="submit" className="btn-block  btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        <h3>All Feedbacks</h3>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.feedback}</td>
                <td>{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
