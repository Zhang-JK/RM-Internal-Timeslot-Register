import React from 'react';
import {Select, Table} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";

const {Option} = Select;

interface Prop {
    data: []
    loading: boolean
    availableDays: string[]
}

interface State {
    selectedDate: string
}

const columns = [
    {
        title: 'From',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: 'To',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: 'Room',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
];

export default class RegisterInfo extends React.Component<Prop, State> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            selectedDate: ""
        }
    }

    handleChange = (value: string) => {
        this.setState({selectedDate: value})
    }

    render() {
        return (
            <div className='m-2 d-flex flex-column'>
                <h3 className="m-auto">Timetable</h3>
                {this.props.loading && <div><LoadingOutlined/> Loading... </div>}
                {!this.props.loading &&
                <div className="d-flex flex-column m-1">
                    <Select className="m-auto" placeholder="Select Date Here" style={{width: 150}} onChange={this.handleChange}>
                        {this.props.availableDays.map(item => <Option value={item}> {item} </Option>)}
                    </Select>
                    <Table style={{width: "100%", marginTop: 20}}
                        dataSource={this.props.data.filter((item: any) => item.date === this.state.selectedDate).map((item: any) => {
                            return {
                                startTime: item.startTime.substring(0, item.startTime.length-3),
                                endTime: item.endTime.substring(0, item.startTime.length-3),
                                location: item.location,
                                state: `${item.totalJoin} / ${item.maxJoin}`,
                            }
                        })}
                        columns={columns}/>;
                </div>
                }
            </div>
        )
    }
}