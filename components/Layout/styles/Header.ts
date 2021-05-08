import styled from "styled-components";

const DashHeader = styled.div`
  .ant-layout-header {
    background-image: ${(props) => props.theme.headerBackground};
    position: relative;
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    min-height: 4.286rem;
    z-index: 11;
    padding: 0 1rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
    height: 0;
  }

  .trigger {
    margin-right: 1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
  }

  .right-header-item {
    line-height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 12px;
    height: 40px;

    .username {
      color: white;
    }

    :hover {
      background-color: ${(props) => props.theme.hoverHeaderItem};

      .username {
        color: black;
      }
    }
  }
`;

export default DashHeader;
