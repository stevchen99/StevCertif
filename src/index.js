import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import testData from "./test_data";
import Modal from "react-awesome-modal";

function getData() {
  const data = testData.map(item => {
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
  state = {
    todos: []
  }  
  constructor() {
    super();   
  
    const data = getData() ;
    const columns = getColumns(data);
    this.state = {
      data,
      columns,
      visible: false
    };
   
  }

  componentDidMount() {
    fetch('https://cwe1j.sse.codesandbox.io/difuse')
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data })
      console.log(this.state.todos)
    })  
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  handleButtonClick = (e, row) => {
    var bild = new Image();
    bild.src = "/img/" + row.original.Cert;
    bild.onload = () =>
      this.setState({
        visible: true,
        LinkName: row.original.Cert,
        BildW: bild.width,
        BildH: bild.height,
        ThePos: bild.width > bild.height ? "Land" : "Port"
      });
  };

  render() {
    console.log({ state: this.state });
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          //columns={columns}
          columns={[
            {
              Header: "HARDSOFT",
              accessor: "HARDSOFT",
              width: 150
            },
            {
              Header: "TECHNO",
              accessor: "TECHNO",
              width: 100
            },
            {
              Header: "TYPE",
              accessor: "TYPE",
              width: 100
            },
            {
              Header: "LANG",
              accessor: "LANG",
              width: 100
            },
            {
              Header: "QUAND",
              accessor: "QUAND",
              width: 70
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
              Header: "DESCRIPTION",
              accessor: "DESCRIPTION",
              width: 500
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
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <img
              src={"/img/" + this.state.LinkName}
              width={this.state.BildW}
              height={this.state.BildH}
              alt="Houston We have pb"
            />

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
