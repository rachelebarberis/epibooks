import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhOWVmNTk3ZTI5ZjAwMTVjMmU2OWMiLCJpYXQiOjE3MzY3NzQ4NzksImV4cCI6MTczNzk4NDQ3OX0.4kD4PjijrCGJggPxjkThpqhDO33NvMQ7Zo4uzeA9M7s",
            },
          }
        );

        if (response.ok) {
          let Comments = await response.json();
          setComments(Comments);
          setIsError(false);
          setIsLoading(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };

    fetchComments();
  }, [asin]);
  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
