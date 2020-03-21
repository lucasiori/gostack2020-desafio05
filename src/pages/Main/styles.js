import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;

  div {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: ${props => props.submitError ? '1px solid #f44c4c' : '1px solid #eee'};
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ErrorLabel = styled.small`
    display: block;
    color: #f44c4c;
    font-size: 12px;
    margin-top: 5px;
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
