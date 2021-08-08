import styled from "styled-components";

const test = () => {
  return (
    <div>
      青になる？
      <p>only this paragraph will get the style :)</p>
      <style jsx>
        {`
          p {
            color: blue;
          }
        `}
      </style>
    </div>
  );
};

const TestStyle = styled.div`
  color: blue;
`;
export default test;

// styled-jsxは諦めた
/* <style jsx>
        {`
          li {
            list-style-type: none;
          }
        `}
      </style> */
