import { useForm } from "@felte/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const navigate = useNavigate();
  const { form } = useForm({
    onSubmit: (values) => {
      const search =
        values?.titleSearch !== ` ` ? values?.titleSearch : `Memes`;

      if (values?.titleSearch) {
        navigate(`Page/${search}`);
      } else {
        navigate(`Page/Lols`);
      }

      console.log(search);
    },
  });

  return (
    <>
      <form ref={form} action="/">
        <input
          name="titleSearch"
          className="p-3 w-full text-body-alt bg-searchbar-color rounded-lg focus:outline-primary-red outline-none"
          type="text"
          placeholder="Search.."
        />
        <input type="submit" hidden />
      </form>
      <div className="-mt-8 ml-[100%]">
        <FaSearch className="-ml-9 text-body-alt" />
      </div>
    </>
  );
}
