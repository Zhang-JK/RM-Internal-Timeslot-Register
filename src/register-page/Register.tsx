import React from 'react';
import {Button, Form, Select, Space, Switch} from 'antd';
import {requestPost} from "../server/request";
import {CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined} from '@ant-design/icons';

interface Prop {
    data: any[]
    loading: boolean
    availableDays: string[]
    availableRooms: string[]
    personId: number
    group: number
    reload: Function
}

interface State {
    groupNum: number
    selectedDate: string
    selectedRoom: string
    // 0: input, 1: loading, 2: success, 3: error
    state: number
    errorMessage: string
}

const { Option } = Select;

export default class Register extends React.Component<Prop, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            groupNum: -1,
            selectedDate: "",
            selectedRoom: "",
            state: 0,
            errorMessage: "",
        }
    }

    submit = (value: any) => {
        this.setState({state: 1})
        let timeslot = this.props.data.filter((item: any) => item.id === value.id)[0]
        if (timeslot === undefined)
            this.setState({state: 3, errorMessage: "Wrong Input"})
        else if (timeslot.maxJoin === timeslot.totalJoin)
            this.setState({state: 3, errorMessage: "This timeslot is full"})
        else if (value.exclusive && timeslot.totalJoin>0)
            this.setState({state: 3, errorMessage: "This timeslot is already occupied by at least one person"})
        else if (value.exclusive && timeslot.allowExclusive === 0)
            this.setState({state: 3, errorMessage: "This room is not allowed to be exclusive"})
        else
            requestPost("register", {
                timeId: value.id,
                numJoin: value.exclusive?timeslot.maxJoin:1,
                groupNum: this.props.group,
                regId: this.props.personId
            }).then(res => {
                if (res.errorCode === undefined)
                    this.setState({state: 3, errorMessage: "Network Error"})
                else if (res.errorCode === "0000")
                    this.setState({state: 2})
                else if (res.errorCode === "0201")
                    this.setState({state: 3, errorMessage: "Fail to connect to database"})
                else if (res.errorCode === "0202")
                    this.setState({state: 3, errorMessage: "Timeslot do not exist"})
                else if (res.errorCode === "0203")
                    this.setState({state: 3, errorMessage: "You have already registered for this timeslot"})
                else if (res.errorCode === "0204")
                    this.setState({state: 3, errorMessage: "This timeslot is not available"})
                else if (res.errorCode === "0205")
                    this.setState({state: 3, errorMessage: "Your team have registered for 9 places in 4223 and Dream Lab, there's no available seats for you"})
                else if (res.errorCode === "0206")
                    this.setState({state: 3, errorMessage: "Your team have booked too many classroom time today"})
            })
    }

    dateChange = (value: string) => {
        this.setState({selectedDate: value})
    }

    roomChange = (value: string) => {
        this.setState({selectedRoom: value})
    }

    render() {
        return (
            <div className='m-2 d-flex flex-column'>
                <h3 className="m-auto" style={{marginBottom: 20}}>Register</h3>
                {!this.props.loading && this.state.state === 0 &&
                <Form onFinish={this.submit}>
                    <Space className="m-3 d-flex flex-column">
                        <Form.Item name="date" label="Date">
                            <Select className="m-auto" placeholder="select date first" style={{width: 250}} onChange={this.dateChange}>
                                {this.props.availableDays.map(item => <Option value={item}> {item} </Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="room" label="Room">
                            <Select className="m-auto" placeholder="then select room" style={{width: 250}} onChange={this.roomChange}>
                                {this.props.availableRooms.map(item => <Option value={item}> {item} </Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id" label="Time and Room">
                            <Select placeholder={'select time and room'} style={{ width: 250 }} >
                                {this.props.data.filter((item: any) => item.date === this.state.selectedDate && item.location===this.state.selectedRoom).map((item: any) =>
                                    <Option value={item.id}>{`From ${item.startTime.substring(0, item.startTime.length-3)} To ${item.endTime.substring(0, item.startTime.length-3)}`}</Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item name="exclusive" label="Make this register EXCLUSIVE">
                            <Switch defaultChecked={false} />
                        </Form.Item>
                        <Button className="m-3" htmlType="submit" type='primary'>Submit</Button>
                    </Space>
                </Form>
                }
                {!this.props.loading && this.state.state === 1 &&
                    <div className="m-auto">
                        <h3 className="m-5"><LoadingOutlined /> Uploading...</h3>
                    </div>
                }
                {!this.props.loading && this.state.state === 2 &&
                    <div className="m-auto">
                        <h3 className="m-5"><CheckCircleTwoTone twoToneColor="#52c41a" />Success!</h3>
                        <Button style={{marginLeft: "60%"}} onClick={() => {
                            this.setState({state: 0})
                            this.props.reload()
                        }}>Reload</Button>
                    </div>
                }
                {!this.props.loading && this.state.state === 3 &&
                    <div className="m-auto">
                        <h3 className="m-5"> <CloseCircleTwoTone twoToneColor="#eb2f96" /> Error!</h3>
                        <h5 className="m-3">Error Msg: {this.state.errorMessage}</h5>
                        <Button style={{marginLeft: "60%"}} onClick={() => this.setState({state: 0, errorMessage: ""})}>Go Back</Button>
                    </div>
                }
            </div>
        )
    }
}