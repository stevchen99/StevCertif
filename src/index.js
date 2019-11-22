import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import testData from "./test_data";
import Modal from "react-awesome-modal";

function getData() {
  const data = testData.map(item => {
    // using chancejs to generate guid
    // shortid is probably better but seems to have performance issues
    // on codesandbox.io
    return {
      ...item
    };
  });
  return data;
}

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
    if (key !== "_id" && key !== "Cert") {
      columns.push({
        accessor: key,
        Header: key
      });
    } else if (key === "Cert") {
      columns.push({
        accessor: key,
        Header: key,
        Cell: ({ row }) => (
          <button onClick={e => this.handleButtonClick(e, row)}>
            Click Me
          </button>
        )
      });
    }
  });
  return columns;
}

class App extends React.Component {
  constructor() {
    super();
    const data = getData();
    const columns = getColumns(data);
    this.state = {
      data,
      columns,
      visible: false
    };
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  handleButtonClick = (e, row) => {
    this.setState({ visible: true, LinkName: row.original.Cert });
  };

  render() {
    const { data, columns } = this.state;

    return (
      <div>
        <ReactTable
          data={data}
          //columns={columns}
          columns={[
            {
              Header: "HARD-SOFT",
              accessor: "HARD-SOFT",
              width: 150
            },
            {
              Header: "TECHNO",
              accessor: "TECHNO",
              width: 100
            },
            {
              Header: "LANG",
              accessor: "LANG",
              width: 100
            },
            {
              Header: "ORG",
              accessor: "ORG",
              width: 100
            },
            {
              Header: "LIBELLE",
              accessor: "LIBELLE",
              width: 300
            },
            {
              Header: "",
              id: "Cert",
              accessor: "Cert",
              Cell: rowInfo => (
                <button onClick={e => this.handleButtonClick(e, rowInfo)}>
                  click Moi
                </button>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable="true"
        />
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <img src={"/img/" + this.state.LinkName} alt="Houston We have pb" />

            <a href="javascript:void(0);" onClick={() => this.closeModal()}>
              Close
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
