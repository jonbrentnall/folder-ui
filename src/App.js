import React from "react";
import "./App.css";

const items = [
    {
        type: "pdf",
        name: "Employee Handbook",
        added: "2017-01-06",
    },
    {
        type: "pdf",
        name: "Public Holiday policy",
        added: "2016-12-06",
    },
    {
        type: "folder",
        name: "Expenses",
        files: [
            {
                type: "doc",
                name: "Expenses claim form",
                added: "2017-05-02",
            },
            {
                type: "doc",
                name: "Fuel allowances",
                added: "2017-05-03",
            },
        ],
    },
    {
        type: "csv",
        name: "Cost centres",
        added: "2016-08-12",
    },
    {
        type: "folder",
        name: "Misc",
        files: [
            {
                type: "doc",
                name: "Christmas party",
                added: "2017-12-01",
            },
            {
                type: "mov",
                name: "Welcome to the company!",
                added: "2015-04-24",
            },
        ],
    },
];

function search(term) {
    // Return the search term in input
    return function (x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: items,
            term: "",
            hidden: true, // sets the subfiles to be hidden on load
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.showFiles = this.showFiles.bind(this);
    }

    searchHandler = (e) => {
        // set the term to the value of the input
        this.setState({ term: e.target.value });
    };

    // Sorts the files depending on given value
    sortBy = (sortedField) => {
        // create a new array
        let sortedFiles = items;
        // if a value is passed, compare it and return 1 or -1 - otherwise do nothing
        if (sortedField !== null) {
            // BUG - currently doesn't sort by date quite right. Might have to change the format it's passed in
            sortedFiles.sort((a, b) =>
                a[sortedField] > b[sortedField] ? 1 : -1
            );
        }
        // console.log(sortedField);
        // console.log(sortedFiles);
        this.setState({ items: sortedFiles });
    };

    showFiles() {
        // toggles hidden class on sub files
        // BUG - shows all sub files at the moment on click, ran out of time to specalise this
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        const { term, items } = this.state;

        // If hidden = true, add hidden classname
        let fileName = this.state.hidden ? "hidden" : "";

        return (
            <div className="App">
                <h1>Folder UI</h1>
                <form>
                    <input
                        type="text"
                        id="search"
                        onChange={this.searchHandler}
                        value={term}
                        required
                    />
                    <label htmlFor="search">Filter</label>
                </form>

                <div className="grid">
                    <div>
                        <p>
                            <button
                                className="sort"
                                onClick={() => this.sortBy("name")}
                            >
                                <strong>File Name</strong>
                            </button>
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>File Type</strong>
                        </p>
                    </div>
                    <div>
                        <p>
                            <button
                                className="sort"
                                onClick={() => this.sortBy("added")}
                            >
                                <strong>Date Added</strong>
                            </button>
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Files</strong>
                        </p>
                    </div>
                </div>
                {/* if array has items, show them - otherwise show 'files not found' */}
                {items.length ? (
                    items.filter(search(term)).map((item, i) => (
                        <div className="grid" key={i}>
                            <div>
                                <p>
                                    {/* make the item name clickable if the current item has the files field */}
                                    {item.files ? (
                                        <button onClick={this.showFiles}>
                                            {item.name}
                                        </button>
                                    ) : (
                                        item.name
                                    )}
                                </p>
                            </div>
                            <div>
                                <p>{item.type}</p>
                            </div>
                            <div>
                                {/* if array item has 'added' field show it. If not show nothing */}
                                {item.added !== undefined ? (
                                    <p>{item.added}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div>
                                {/* if array item has 'files' field show it. If not show nothing */}
                                {item.files !== undefined
                                    ? item.files.map((item, i) => (
                                          <div
                                              className={`grid grid__three ${fileName}`}
                                              key={i}
                                          >
                                              <div>
                                                  <p>
                                                      <strong>File Name</strong>
                                                  </p>
                                                  <p>{item.name}</p>
                                              </div>
                                              <div>
                                                  <p>
                                                      <strong>File Type</strong>
                                                  </p>
                                                  <p>{item.type}</p>
                                              </div>
                                              <div>
                                                  <p>
                                                      <strong>
                                                          Date Added
                                                      </strong>
                                                  </p>
                                                  <p>{item.added}</p>
                                              </div>
                                          </div>
                                      ))
                                    : ""}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Files not found</p>
                )}
            </div>
        );
    }
}

export default App;
