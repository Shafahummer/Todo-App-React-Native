import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isCross: false,
            winMessage: ""
        }
    }
    componentDidMount() {
        console.log("component mounted")
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    console.log(this.isCross);
                    this.setState({ isCross: true })
                    setTimeout(() => console.log(this.isCross), 1000)
                }}>
                    <Text>Home screen</Text>

                </TouchableOpacity>
            </View>
        )
    }

}
