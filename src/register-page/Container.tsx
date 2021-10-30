import {Card, PageHeader, Typography} from 'antd';
import React from 'react';
import Register from "./Register";
import logo from "../assets/logo.png"
import RegisterInfo from "./RegisterInfo";
import Login from "./Login";

interface State {
    isLogin: boolean
    id: number
    username: string
    // 0 for member, 1 for internal
    role: number
    // for internal only
    team: number
}

export default class Container extends React.Component<{}, State> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props)
        this.state = {
            isLogin: false,
            id: 0,
            username: "",
            role: 0,
            team: 0
        }
    }

    callback = (username: string, id: number, role: undefined|number, team: undefined|number) => {
        this.setState({id: id, username: username, isLogin: true, role: role===undefined?0:role, team: team===undefined?0:team})
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
                                {this.state.isLogin && <h5 className="m-1">{"Login with: "+this.state.username}</h5> }
                                {this.state.isLogin && <h5 className="m-1">{"Team "+this.state.team}</h5> }
                            </div>
                        </Typography.Title>
                    </Card>
                </PageHeader>

                {this.state.isLogin &&
                <Card className="m-3">
                    <RegisterInfo />
                </Card>
                }
                {this.state.isLogin &&
                <Card className="m-3">
                    <Register/>
                </Card>
                }

                {!this.state.isLogin &&
                <Card className="m-3">
                    <Login successCallback={this.callback} />
                </Card>
                }
            </div>
        )
    }
}