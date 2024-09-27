
import React, { useState } from "react";
import Search from "@svg/search";
import { useRouter } from "next/router";

const SearchForm = (props) => {
  const { toggleSearchForm } = props;
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleSearchForm()
    if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
    } else {
      setSearchText("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={`header__search-input-13 d-inline-block d-xxl-block`} >
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          autoFocus={true}
        />
        <button type="submit" className="position-absolute">
          <Search />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
