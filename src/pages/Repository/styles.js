import styled, { keyframes, css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesFilter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  h3 {
    margin-right: 10px;
  }

  select {
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const FilterButton = styled.button`
  width: 85px;
  background: #7159c1;
  border: 0;
  color: #FFF;
  font-weight: bold;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 4px;
  transition: all 300ms ease;
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const PaginationPrev = styled.button.attrs(props => ({
  disabled: props.firstPage
}))`
  width: 85px;
  background: #7159c1;
  border: 0;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 4px;
  transition: all 300ms ease;

  span {
    color: #fff;
    font-weight: 700;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.updating &&
    css`
      cursor: not-allowed;
      opacity: 0.7;

      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const PaginationNext = styled.button.attrs(props => ({
  disabled: props.lastPage
}))`
  width: 85px;
  background: #7159c1;
  border: 0;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 4px;
  transition: all 300ms ease;

  span {
    color: #fff;
    font-weight: 700;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.updating &&
    css`
      cursor: not-allowed;
      opacity: 0.7;

      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
