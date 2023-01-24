import React from "react";
import { Star } from "@styled-icons/bootstrap/Star";
import { StarFill } from "@styled-icons/bootstrap/StarFill";

export default function Rating({ star }) {
  const FilledStar = ({ star }) => {
    return [...Array(star)].map((e, i) => (
      <>
        <StarFill size={15} color={"#FFA41C"} />
      </>
    ));
  };
  const UnfilledStar = ({ star }) => {
    return [...Array(5 - star)].map((e, i) => (
      <>
        <Star size={15} color={"#FFA41C"} />
      </>
    ));
  };
  return (
    <>
      {star && (
        <>
          <FilledStar star={star} />
          <UnfilledStar star={star} />
        </>
      )}
    </>
  );
}
