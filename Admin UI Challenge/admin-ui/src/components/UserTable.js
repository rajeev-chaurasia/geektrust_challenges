import React from "react";
import { Input, Table, Space, Popconfirm, Typography, Button } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import "antd/dist/antd.css";

class UserTable extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filteredUsers: [],
      editingKey: "",
      name: "",
      email: "",
      role: "",
      selectedRowKeys: [],
    };
  }

  columns = [
    {
      title: "Name",
      key: "name",
      editable: true,
      render: (usr) => {
        return this.isEditing(usr) ? (
          <Input
            placeholder={usr.name}
            value={this.state.name}
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
        ) : (
          <p>{usr.name}</p>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      editable: true,
      render: (usr) => {
        return this.isEditing(usr) ? (
          <Input
            placeholder={usr.email}
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
        ) : (
          <p>{usr.email}</p>
        );
      },
    },
    {
      title: "Role",
      key: "role",
      editable: true,
      render: (usr) => {
        return this.isEditing(usr) ? (
          <Input
            placeholder={usr.role}
            value={this.state.role}
            onChange={(e) => {
              this.setState({ role: e.target.value });
            }}
          />
        ) : (
          <p>{usr.role}</p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (usr) => {
        const editable = this.isEditing(usr);
        return (
          <Space size="middle">
            {editable ? (
              <span>
                <a
                  onClick={() => this.saveEdit(usr)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </a>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.setState({ editingKey: "" })}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Space size="middle">
                <Typography.Link disabled={this.state.editingKey !== ""}>
                  <FaEdit
                    size={20}
                    onClick={() => {
                      this.setState({
                        editingKey: usr.key,
                        name: usr.name,
                        email: usr.email,
                        role: usr.role,
                      });
                    }}
                  />
                </Typography.Link>
                <FaTrash
                  size={18}
                  style={{ color: "red" }}
                  onClick={() => this.deleteRow(usr)}
                />
              </Space>
            )}
          </Space>
        );
      },
    },
  ];

  deleteMany = () => {
    let arr1 = this.state.users.filter((ele) => {
      return this.state.selectedRowKeys.indexOf(ele.key) !== -1 ? null : ele;
    });

    this.setState({ users: [...arr1] });

    let arr2 = this.state.filteredUsers.filter((ele) => {
      return this.state.selectedRowKeys.indexOf(ele.key) !== -1 ? null : ele;
    });

    this.setState({ filteredUsers: [...arr2] });
    this.setState({ selectedRowKeys: [] });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  saveEdit = (usr) => {
    this.state.users.forEach((ele) => {
      if (ele === usr) {
        ele.name = this.state.name;
        ele.email = this.state.email;
        ele.role = this.state.role;
      }
    });
    this.state.filteredUsers.forEach((ele) => {
      if (ele === usr) {
        ele.name = this.state.name;
        ele.email = this.state.email;
        ele.role = this.state.role;
      }
    });
    this.setState({ editingKey: "", name: "", email: "", role: "" });
  };

  isEditing = (usr) => {
    if (usr.key === this.state.editingKey) {
      return true;
    }
  };

  editRow = (usr) => {
    this.setState({ editingKey: usr.key });
  };

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  deleteRow = (usr) => {
    let arr1 = this.state.users.filter((ele) => {
      return ele !== usr;
    });

    this.setState({ users: [...arr1] });

    let arr2 = this.state.filteredUsers.filter((ele) => {
      return ele !== usr;
    });

    this.setState({ filteredUsers: [...arr2] });
  };

  async componentDidMount() {
    let res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    res = await res.json();
    res = res.map((item) => {
      return {
        key: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
      };
    });
    console.log(res);
    this.setState({ users: res });
    this.setState({ filteredUsers: res });
  }

  search = (text) => {
    let arr = this.state.users.filter((usr) => {
      return (
        usr.name.toLowerCase().includes(text.toLowerCase()) ||
        usr.email.toLowerCase().includes(text.toLowerCase()) ||
        usr.role.toLowerCase().includes(text.toLowerCase())
      );
    });
    this.setState({ filteredUsers: [...arr] });
  };

  debounceSearch = (event) => {
    let txt = event.target.value;
    if (this.debounceTimeout) clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.search(txt);
    }, 300);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <Input.Search
          placeholder="Search by name, email or role"
          onSearch={this.search}
          onChange={this.debounceSearch}
        />
        <Table
          rowSelection={rowSelection}
          dataSource={this.state.filteredUsers}
          columns={this.columns}
          pagination={{ position: ["bottomCenter"] }}
        />
        <Button
          style={{ marginLeft: 10, marginBottom: 10, borderRadius: 10 }}
          onClick={() => {
            this.deleteMany();
          }}
          type="primary"
          danger
        >
          Delete Selected
        </Button>
      </div>
    );
  }
}

export default UserTable;
