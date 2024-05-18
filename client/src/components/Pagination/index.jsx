const Pagination = (props) => {
  console.log("props in pagination = ", props);

  // current page, how many pages, get data here while click
  return (
    <ul>
      <li>
        <a style={{ cursor: "pointer" }}>_1_</a>
      </li>
      <li>
        <a style={{ cursor: "pointer" }}>_2_</a>
      </li>
      <li>
        <a style={{ cursor: "pointer" }}>_3_</a>
      </li>
    </ul>
  );
};

export default Pagination;
