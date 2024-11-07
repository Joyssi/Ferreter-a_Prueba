import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native";

import formProduct from "../screens/formProduct"
import productList from "../screens/productList";
import productManagement from "../screens/productManagement";

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Lista de productos' component={productList}/>
            <Tab.Screen name='Registrar Productos' component={formProduct}/>
            <Tab.Screen name='Gestión de productos' component={productManagement}/>
        </Tab.Navigator>
    )
};

export default function Navigation (){
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
};