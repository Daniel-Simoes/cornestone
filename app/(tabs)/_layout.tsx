import Header from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

// Tipagem para aceitar apenas ícones válidos do Ionicons
type IoniconName = keyof typeof Ionicons.glyphMap;

type TabItem = {
  name: string;
  icon: IoniconName;
};

export default function TabLayout() {
  const tabs: TabItem[] = [
    { name: "index", icon: "home-outline" },
    { name: "camera", icon: "qr-code" },
    { name: "notifications", icon: "notifications-outline" },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            header: (props) => <Header {...props} />,
            tabBarIcon: ({ focused }) => {
              if (tab.name === "camera") {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      top: -25,
                      backgroundColor: "#007bff",
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 3,
                      elevation: 5,
                    }}
                  >
                    <Ionicons name={tab.icon} size={28} color="#fff" />
                  </TouchableOpacity>
                );
              }
              return (
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={focused ? "#007bff" : "#999"}
                />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
