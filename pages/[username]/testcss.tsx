import styled from "styled-components";

const test = () => {
  return (
    <TestStyle>
      青になる？
      <p>only this paragraph will get the style :)</p>
    </TestStyle>
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
