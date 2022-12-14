import React, { useContext } from "react";
import { AuthContext } from "../../contex/AuthProvidor/AuthProvidor";
import { useState, useEffect } from "react";
import ReviewRow from "./ReviewRow";
import useTitle from "../../Hook/useTitle";
import Spenner from "../../Spenner/Spenner";

const Review = () => {
  const [loding, setLoding] = useState(false);
  useTitle("Review");
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoding(true);
    fetch(`https://doctor-server-two.vercel.app/reviews?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoding(false);
        setReviews(data)});
  }, [user?.email]);

  const hendelDelete = (id) => {
    const proceed = window.confirm("are you sure review delete");
    if (proceed) {
      fetch(`https://doctor-server-two.vercel.app/reviews/${id}`, {
        method: "DELETE",
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          if (data.deletedCount > 0) alert("Deleted successfully ");
          const remaining = reviews.filter((data) => data._id !== id);
          setReviews(remaining);
        })
      );
    }
  };
if (loding) {
  return <Spenner></Spenner>;
}
  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Review/Massages</th>
              <th>
                <label>
                  <button type="btn btn-xs">X</button>
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <ReviewRow
                key={review._id}
                review={review}
                hendelDelete={hendelDelete}
              ></ReviewRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Review;
