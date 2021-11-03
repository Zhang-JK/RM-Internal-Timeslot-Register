import React from 'react';
import {Button, Popconfirm, Select, Table} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import {requestPost} from "../server/request";

const {Option} = Select;

interface Prop {
    availableDays: string[]
    reload: Function
    regId: number
}

interface State {
    loading: boolean
    data: []
}

export default class MyRegisterInfo extends React.Component<Prop, State> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            loading: false,
            data: [],
        }
    }

    handleDelete = (id: number) => {
        this.setState({loading: true, data: []});
        console.log(id);
        requestPost('delete-register', {regId: this.props.regId, timeId: id})
            .then(() => {
                this.setState({loading: false});
                this.props.reload()
            })
    };

    columns = [
        {
            title: 'From',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Room',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Manage',
            dataIndex: 'manage',
            key: 'manage',
            render: (id: number) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(id)}>
                    <Button danger size="small">Delete</Button>
                </Popconfirm>
        },
    ];

    handleChange = (value: number) => {
        this.setState({loading: true})
        requestPost("myReg", {
            id: this.props.regId,
            date: value
        })
            .then((res: any) => {
                // @ts-ignore
                this.setState({
                    data: res.data,
                    loading: false
                })
            })
    }

    render() {
        return (
            <div className='m-2 d-flex flex-column'>
                <h3 className="m-auto">My Registrations</h3>
                {this.state.loading && <div><LoadingOutlined/> Loading... </div>}
                {!this.state.loading &&
                <div className="d-flex flex-column m-3">
                    <Select className="m-auto" placeholder="Select Date Here" style={{width: 150}}
                            onChange={this.handleChange}>
                        {this.props.availableDays.map(item => <Option value={item}> {item} </Option>)}
                    </Select>
                    {this.state.data !== undefined && this.state.data.length > 0 &&
                    < Table style={{width: "100%", marginTop: 20}}
                            dataSource={this.state.data.map((item: any) => {
                                return {
                                    startTime: item.startTime.substring(0, item.startTime.length - 3),
                                    endTime: item.endTime.substring(0, item.startTime.length - 3),
                                    location: item.location,
                                    manage: item.id
                                }
                            })}
                            columns={this.columns}/>
                    }
                    {(this.state.data === undefined || this.state.data.length === 0) &&
                        <h5 className="m-auto">No data</h5>
                    }
                </div>
                }
            </div>
        )
    }
}