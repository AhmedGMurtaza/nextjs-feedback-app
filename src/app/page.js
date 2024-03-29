import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: feedbacks, error } = await supabase.from("feedback").select();
  if (error) {
    console.error("Error fetching feedbacks:", error.message);
  }

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
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Submit Feedback</h2>
        <form action={submitFeedback}>
          <div className="">
            Feedback:
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              name="feedbackInput"
            />
            Ratings:
            <input
              type="text"
              placeholder="Ratings here"
              className="input input-bordered w-full max-w-xs"
              name="ratingInput"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto">
        <h3>All Feedbacks</h3>
        <table className="table">
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
