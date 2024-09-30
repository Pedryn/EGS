import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Esconde a TabBar na tela index
          tabBarButton: () => null, // Remove o index da TabBar
        }} 
      />
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "Inicio", 
          tabBarIcon: ({ color, size}) => {      
            return <FontAwesome name="home" color={color} size={size} />
        }
        }} 
      />
      <Tabs.Screen 
        name="carrinho" 
        options={{ 
          title: "Carrinho" ,
          tabBarIcon: ({ color, size}) => {      
            return <FontAwesome name="shopping-cart" color={color} size={size} />
        }
        }} 
      />
      <Tabs.Screen 
        name="forms/formsAnuncie" 
        options={{ 
          title: "Anuncie" ,
          tabBarIcon: ({ color, size}) => {      
            return <FontAwesome name="plus" color={color} size={size} />
        }
        }} 
      />
      <Tabs.Screen 
        name="conta" 
        options={{ 
          title: "Conta",
          tabBarIcon: ({ color, size}) => {      
            return <FontAwesome name="user" color={color} size={size} />
        }
        }} 
      />
      <Tabs.Screen 
        name="menu" 
        options={{ 
          title: "Menu",
          tabBarIcon: ({ color, size}) => {      
            return <FontAwesome name="bars" color={color} size={size} />
        }
        }} 
      />
      <Tabs.Screen 
        name="forms/formsCadastro" 
        options={{ 
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Esconde a TabBar na tela index
            tabBarButton: () => null, // Remove o index da TabBar 
        }} 
      />
      <Tabs.Screen 
        name="forms/formsEndereco" 
        options={{ 
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Esconde a TabBar na tela index
            tabBarButton: () => null, // Remove o index da TabBar 
        }} 
      />
      <Tabs.Screen 
        name="forms/formsStyle" 
        options={{ 
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Esconde a TabBar na tela index
            tabBarButton: () => null, // Remove o index da TabBar 
        }} 
      />

      <Tabs.Screen 
        name="homeStyle" 
        options={{ 
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Esconde a TabBar na tela index
            tabBarButton: () => null, // Remove o index da TabBar 
        }} 
      />

      <Tabs.Screen 
        name="produto" 
        options={{ 
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Esconde a TabBar na tela index
            tabBarButton: () => null, // Remove o index da TabBar 
        }} 
      />
    
    </Tabs>
    
  );
}
