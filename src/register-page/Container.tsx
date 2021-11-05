import {Card, PageHeader, Typography} from 'antd';
import React from 'react';
import Register from "./Register";
import logo from "../assets/logo.png"
import RegisterInfo from "./RegisterInfo";
import Login from "./Login";
import {requestGet} from "../server/request";
import MyRegisterInfo from "./MyRegisterInfo";

interface State {
    isLogin: boolean
    id: number
    username: string
    name: string
    role: string
    // for internal only
    team: number
    data: any
    loading: boolean
    availableDays: string[]
    availableRooms: string[]
    updateInfo: boolean
}

export default class Container extends React.Component<{}, State> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props)
        this.state = {
            isLogin: false,
            id: 0,
            username: "",
            name: "",
            role: "",
            team: 0,
            data: undefined,
            loading: true,
            availableDays: [],
            availableRooms: [],
            updateInfo: false
        }
    }

    finishUpdate = () => {
        this.setState({updateInfo: false})
    }

    reload = () => {
        this.setState({loading: true})
        requestGet("regState")
            .then((res: any) => {
                // console.log(res)
                // @ts-ignore
                this.setState({
                    data: res.data,
                    loading: false,
                    updateInfo: true,
                    availableDays: Array.from(new Set(res.data.map((item:any) => item.date))),
                    availableRooms: Array.from(new Set(res.data.map((item:any) => item.location)))
                })
            })
    }

    callback = (username: string, id: number, role: undefined|string, team: undefined|number, name: undefined|string) => {
        this.setState({id: id, username: username, isLogin: true, role: role===undefined?"":role, team: team===undefined?0:team, name: name===undefined?"":name})
        this.reload()
    }

    render() {
        return (
            <div className="p-2" style={{background: '#66BAB7'}}>
                <PageHeader>
                    <Card>
                        <Typography.Title level={2} style={{textAlign: 'center'}}>
                            <div className="d-flex flex-column justify-content-center">
                                <img className="m-auto" src={logo} width={189} height={141} alt="logo"/>
                                <h2>HKUST RoboMaster Team</h2>
                                {this.state.isLogin && <h5 className="m-1">{"Login with: "+this.state.name}</h5> }
                                {this.state.isLogin && <h5 className="m-1">{"Team: "+this.state.team+", Role: "+this.state.role}</h5> }
                            </div>
                        </Typography.Title>
                    </Card>
                </PageHeader>

                {this.state.isLogin &&
                <Card hoverable={true} style={{marginTop: 30, marginBottom: 25, marginLeft: 8, marginRight: 8, padding: 5}}>
                    <RegisterInfo data={this.state.data} availableDays={this.state.availableDays} availableRooms={this.state.availableRooms} loading={this.state.loading} />
                </Card>
                }
                {this.state.isLogin &&
                <Card hoverable={true} className="m-1">
                    <Register data={this.state.data} availableDays={this.state.availableDays} loading={this.state.loading} personId={this.state.id} group={this.state.team} reload={this.reload} availableRooms={this.state.availableRooms} />
                </Card>
                }
                {this.state.isLogin &&
                <Card hoverable={true} style={{marginTop: 30, marginBottom: 25, marginLeft: 8, marginRight: 8, padding: 5}}>
                    <MyRegisterInfo finishUpdate={this.finishUpdate} updateInfo={this.state.updateInfo} availableDays={this.state.availableDays} regId={this.state.id} reload={this.reload} />
                </Card>
                }

                {!this.state.isLogin &&
                <Card className="m-3">
                    <Login successCallback={this.callback} />
                </Card>
                }

                {!this.state.isLogin &&
                <div className="d-flex justify-content-end">
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href="https://beian.miit.gov.cn/" style={{color: 'rgba(227,227,227,0.8)'}} target="_blank">---
                        冀ICP备2020020860号 ---</a>
                </div>
                }
            </div>
        )
    }
}