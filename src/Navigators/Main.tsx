import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexHomeContainer, IndexWTDContainer, IndexWTEContainer, IndexWTSContainer, IndexDetailsContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

const homeStack = createStackNavigator();
function homeStackSource() {
    return (
        <homeStack.Navigator headerMode="none" initialRouteName="Inicio" >
            <homeStack.Screen name="Inicio" component={IndexHomeContainer} />
            <homeStack.Screen name="homeDetail" component={IndexDetailsContainer} />
        </homeStack.Navigator>
    );
}

const wtdStack = createStackNavigator();
function wtdStackSource() {
    return (
        <wtdStack.Navigator headerMode="none" initialRouteName="home" >
            <homeStack.Screen name="home" component={IndexWTDContainer} />
            <homeStack.Screen name="wtdDetail" component={IndexDetailsContainer} />
        </wtdStack.Navigator>
    );
}

const wteStack = createStackNavigator();
function wteStackSource() {
    return (
        <wteStack.Navigator headerMode="none" initialRouteName="home" >
            <homeStack.Screen name="home" component={IndexWTEContainer} />
            <homeStack.Screen name="wteDetail" component={IndexDetailsContainer} />
        </wteStack.Navigator>
    );
}

const wtsStack = createStackNavigator();
function wtsStackSource() {
    return (
        <wtsStack.Navigator headerMode="none" initialRouteName="home" >
            <homeStack.Screen name="home" component={IndexWTSContainer} />
            <homeStack.Screen name="wtsDetail" component={IndexDetailsContainer} />
        </wtsStack.Navigator>
    );
}

// @refresh reset
const MainNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#D9444D",
                inactiveTintColor: "#F9E104",
                style: {
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderTopColor: "#000",
                    borderTopWidth: 0.5,
                    backgroundColor: "#000",
                    shadowColor: "rgba(0, 0, 0, 0.19)",
                    shadowOffset: {
                        width: 0,
                        height: 6
                    },
                    shadowRadius: 30,
                    elevation: 5,
                    shadowOpacity: 1,
                    height: 0,
                    bottom: -100
                },
                tabStyle: {
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 4,
                    backgroundColor: "#000",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                },
                labelStyle: {
                    fontSize: 15,
                    margin: 0,
                    padding: 0,
                },
            }}
        >
            <Tab.Screen name="Inicio" component={homeStackSource} />
            <Tab.Screen name="Hacer" component={wtdStackSource} />
            <Tab.Screen name="Ver" component={wtsStackSource} />
            <Tab.Screen name="Comer" component={wteStackSource} />
        </Tab.Navigator>
    )
}

export default MainNavigator
